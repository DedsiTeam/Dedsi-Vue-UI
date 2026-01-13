<template>
  <div class="dedsi-image" :style="containerStyle">
    <div 
      class="dedsi-image__inner" 
      @click="handlePreview"
      :class="{ 'is-previewable': preview }"
    >
      <img 
        :src="src" 
        :alt="alt" 
        :style="imageStyle"
        class="dedsi-image__img"
      />
      <div class="dedsi-image__mask" v-if="preview">
        <div class="dedsi-image__mask-info">
          <svg viewBox="0 0 1024 1024" width="20" height="20">
            <path fill="currentColor" d="M1010.3 458.5L836.4 284.6c-5.9-5.9-15.4-5.9-21.2 0L641.3 458.5c-5.9 5.9-5.9 15.4 0 21.2 5.9 5.9 15.4 5.9 21.2 0l152.9-152.9v357.7H457.7l152.9-152.9c5.9-5.9 5.9-15.4 0-21.2s-15.4-5.9-21.2 0L415.6 484.2c-5.9 5.9-5.9 15.4 0 21.2l173.9 173.9c5.9 5.9 15.4 5.9 21.2 0l173.9-173.9c5.9-5.9 5.9-15.4 0-21.2s-15.4-5.9-21.2 0L614.3 633.4V275.7h357.7L819.1 428.6c-5.9 5.9-5.9 15.4 0 21.2 5.9 5.9 15.4 5.9 21.2 0l170-170c5.9-5.9 5.9-15.4 0-21.2L819.1 84.7c-5.9-5.9-15.4-5.9-21.2 0-5.9 5.9-5.9 15.4 0 21.2l152.9 152.9H592.1v357.7l152.9-152.9c5.9-5.9 5.9-15.4 0-21.2s-15.4-5.9-21.2 0L550 616.3c-5.9 5.9-5.9 15.4 0 21.2l173.9 173.9c5.9 5.9 15.4 5.9 21.2 0l173.9-173.9c5.9-5.9 5.9-15.4 0-21.2s-15.4-5.9-21.2 0L748.9 769.4V411.7h357.7l-152.9 152.9c-5.9 5.9-5.9 15.4 0 21.2 5.9 5.9 15.4 5.9 21.2 0l170-170c6-5.9 6-15.3 0.2-21.2zM213.3 512c0-165 133.7-298.7 298.7-298.7 34.6 0 67.5 5.9 98.1 16.7 13.9 4.9 29.2-2.3 34.1-16.2 4.9-13.9-2.3-29.2-16.2-34.1-37.1-13-77-20-116-20C265.5 159.7 74.3 317.2 74.3 512c0 194.8 191.2 352.3 427.7 352.3 43 0 84.7-5.3 124.2-15.7 14.1-3.7 22.5-18.1 18.8-32.2-3.7-14.1-18.1-22.5-32.2-18.8-32.9 8.7-67.6 13.1-105.8 13.1-209 0-384-133.3-384-298.7z"/>
          </svg>
          <span>查看大图</span>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div 
        v-if="isPreviewVisible" 
        class="dedsi-image-preview-overlay"
        @click="closePreview"
      >
        <div class="dedsi-image-preview-tools" @click.stop>
          <div class="tool-btn" @click="rotateLeft">旋转 L</div>
          <div class="tool-btn" @click="rotateRight">旋转 R</div>
          <div class="tool-btn" @click="zoomIn">放大 +</div>
          <div class="tool-btn" @click="zoomOut">缩小 -</div>
          <div class="tool-btn close" @click="closePreview">关闭 ×</div>
        </div>
        
        <div class="dedsi-image-preview-content" @click.stop>
          <div 
            v-if="hasMultiple" 
            class="nav-btn prev" 
            @click="prevImage"
          > &lt; </div>
          
          <img 
            :src="currentPreviewSrc" 
            :style="previewImageStyle"
            class="preview-img"
            @mousedown="handleMouseDown"
          />
          
          <div 
            v-if="hasMultiple" 
            class="nav-btn next" 
            @click="nextImage"
          > &gt; </div>
        </div>

        <div class="dedsi-image-preview-footer" v-if="hasMultiple">
          {{ currentIndex + 1 }} / {{ previewList.length }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  preview?: boolean
  previewSrcList?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 'auto',
  fit: 'cover',
  preview: true,
  previewSrcList: () => []
})

const isPreviewVisible = ref(false)
const currentIndex = ref(0)
const rotate = ref(0)
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

const previewList = computed(() => {
  if (props.previewSrcList && props.previewSrcList.length > 0) {
    return props.previewSrcList
  }
  return [props.src]
})

const currentPreviewSrc = computed(() => previewList.value[currentIndex.value])
const hasMultiple = computed(() => previewList.value.length > 1)

const containerStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

const imageStyle = computed(() => ({
  objectFit: props.fit as any,
}))

const previewImageStyle = computed(() => ({
  transform: `scale(${scale.value}) rotate(${rotate.value}deg) translate(${translateX.value}px, ${translateY.value}px)`,
  transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
}))

const handlePreview = () => {
  if (!props.preview) return
  isPreviewVisible.value = true
  // Reset preview state
  rotate.value = 0
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
  
  // Set initial index
  const index = previewList.value.indexOf(props.src)
  currentIndex.value = index !== -1 ? index : 0
}

const closePreview = () => {
  isPreviewVisible.value = false
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = previewList.value.length - 1
  }
  resetTransform()
}

const nextImage = () => {
  if (currentIndex.value < previewList.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  resetTransform()
}

const resetTransform = () => {
  rotate.value = 0
  scale.value = 1
}

const rotateLeft = () => rotate.value -= 90
const rotateRight = () => rotate.value += 90
const zoomIn = () => scale.value += 0.2
const zoomOut = () => scale.value = Math.max(0.2, scale.value - 0.2)

// Basic Drag Support
let isDragging = false
let startX = 0
let startY = 0

const handleMouseDown = (e: MouseEvent) => {
  isDragging = true
  startX = e.clientX - translateX.value
  startY = e.clientY - translateY.value
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return
  translateX.value = e.clientX - startX
  translateY.value = e.clientY - startY
}

const handleMouseUp = () => {
  isDragging = false
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isPreviewVisible.value) return
  if (e.key === 'Escape') closePreview()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.dedsi-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 4px;
}

.dedsi-image__inner {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: default;
}

.dedsi-image__inner.is-previewable {
  cursor: pointer;
}

.dedsi-image__img {
  width: 100%;
  height: 100%;
  display: block;
}

.dedsi-image__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
}

.dedsi-image__inner:hover .dedsi-image__mask {
  opacity: 1;
}

.dedsi-image__mask-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

/* Preview Modal Style */
.dedsi-image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 5000;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.dedsi-image-preview-tools {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px 24px;
  border-radius: 24px;
  z-index: 5001;
}

.tool-btn {
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  transition: color 0.3s;
}

.tool-btn:hover {
  color: var(--dedsi-primary-color);
}

.tool-btn.close {
  margin-left: 20px;
  font-weight: bold;
}

.dedsi-image-preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.preview-img {
  max-width: 90%;
  max-height: 90%;
  cursor: grab;
}

.preview-img:active {
  cursor: grabbing;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  transition: background-color 0.3s;
  z-index: 5002;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-btn.prev { left: 40px; }
.nav-btn.next { right: 40px; }

.dedsi-image-preview-footer {
  padding: 20px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
</style>
