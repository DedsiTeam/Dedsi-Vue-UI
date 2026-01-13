<template>
  <div class="dedsi-scrollbar">
    <div
      ref="wrapRef"
      class="dedsi-scrollbar__wrap"
      :class="{ 'dedsi-scrollbar__wrap--hidden-default': !native }"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <div ref="resizeRef" class="dedsi-scrollbar__view h-inherit" :style="viewStyle">
        <slot />
      </div>
    </div>
    <template v-if="!native">
      <div 
        class="dedsi-scrollbar__bar is-horizontal"
        :class="{ 'is-always': always }"
        v-show="ratioX < 1"
        @mousedown="handleBarClick($event, 'x')"
      >
        <div
          ref="thumbXRef"
          class="dedsi-scrollbar__thumb"
          :style="thumbXStyle"
          @mousedown.stop="handleThumbMouseDown($event, 'x')"
        />
      </div>
      <div 
        class="dedsi-scrollbar__bar is-vertical"
        :class="{ 'is-always': always }"
        v-show="ratioY < 1"
        @mousedown="handleBarClick($event, 'y')"
      >
        <div
          ref="thumbYRef"
          class="dedsi-scrollbar__thumb"
          :style="thumbYStyle"
          @mousedown.stop="handleThumbMouseDown($event, 'y')"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

const props = defineProps<{
  height?: string | number
  maxHeight?: string | number
  native?: boolean
  wrapStyle?: any
  viewStyle?: any
  wrapClass?: string
  viewClass?: string
  always?: boolean
  minSize?: number
}>()

const wrapRef = ref<HTMLElement>()
const resizeRef = ref<HTMLElement>()

const sizeWidth = ref('0')
const sizeHeight = ref('0')
const moveX = ref('0%')
const moveY = ref('0%')
const ratioX = ref(1)
const ratioY = ref(1)

const GAP = 4 // Scrollbar width/height

const wrapStyle = computed(() => {
  const style: any = { ...props.wrapStyle }
  if (props.height) style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  if (props.maxHeight) style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  return style
})

const thumbXStyle = computed(() => ({
  width: sizeWidth.value,
  transform: `translateX(${moveX.value})`
}))

const thumbYStyle = computed(() => ({
  height: sizeHeight.value,
  transform: `translateY(${moveY.value})`
}))

const update = () => {
  if (!wrapRef.value) return
  const wrap = wrapRef.value
  
  const offsetHeight = wrap.offsetHeight - GAP
  const offsetWidth = wrap.offsetWidth - GAP
  
  const originalHeight = offsetHeight ** 2 / wrap.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrap.scrollWidth
  
  const height = Math.max(originalHeight, props.minSize || 20)
  const width = Math.max(originalWidth, props.minSize || 20)

  ratioY.value = originalHeight / (wrap.offsetHeight - GAP) / (height / (wrap.offsetHeight - GAP))
  ratioX.value = originalWidth / (wrap.offsetWidth - GAP) / (width / (wrap.offsetWidth - GAP))

  sizeHeight.value = height + 'px'
  sizeWidth.value = width + 'px'

  // Update ratio for calculation
  ratioY.value = wrap.scrollHeight > wrap.offsetHeight ? wrap.offsetHeight / wrap.scrollHeight : 1
  ratioX.value = wrap.scrollWidth > wrap.offsetWidth ? wrap.offsetWidth / wrap.scrollWidth : 1
  
  // Re-calculate visible size percentage
  sizeHeight.value = (ratioY.value * 100) + '%'
  sizeWidth.value = (ratioX.value * 100) + '%'

  handleScroll()
}

const handleScroll = () => {
  if (!wrapRef.value) return
  const wrap = wrapRef.value
  
  moveY.value = ((wrap.scrollTop * 100) / wrap.clientHeight) + '%'
  moveX.value = ((wrap.scrollLeft * 100) / wrap.clientWidth) + '%'
}

// Drag logic
let cursorDown = false
let startX = 0
let startY = 0
let startScrollTop = 0
let startScrollLeft = 0

const handleThumbMouseDown = (e: MouseEvent, type: 'x' | 'y') => {
  e.stopImmediatePropagation()
  cursorDown = true
  document.addEventListener('mousemove', type === 'x' ? mouseMoveX : mouseMoveY)
  document.addEventListener('mouseup', mouseUp)
  document.onselectstart = () => false
  
  if (type === 'x') {
    startX = e.clientX
    startScrollLeft = wrapRef.value!.scrollLeft
  } else {
    startY = e.clientY
    startScrollTop = wrapRef.value!.scrollTop
  }
}

const mouseMoveX = (e: MouseEvent) => {
  if (!cursorDown || !wrapRef.value) return
  const offset = e.clientX - startX
  const wrap = wrapRef.value
  const bar = wrap.offsetWidth
  const thumb = parseFloat(sizeWidth.value) / 100 * bar // rough estimate if using %
  
  // More accurate: 
  // movement of thumb * (scrollHeight / clientHeight) = scrollTop
  // But we operate on percentages mostly.
  
  // Simple version:
  // wrap.scrollLeft = startScrollLeft + offset * (wrap.scrollWidth / wrap.offsetWidth)
  // This depends on the ratio of "track length" vs "scroll length"
  
  const trackWidth = wrap.clientWidth
  const thumbWidth = (ratioX.value) * trackWidth
  const scrollableWidth = wrap.scrollWidth - trackWidth
  const trackScrollableWidth = trackWidth - thumbWidth
  
  if (trackScrollableWidth <= 0) return
  
  const moveRatio = scrollableWidth / trackScrollableWidth
  wrap.scrollLeft = startScrollLeft + offset * moveRatio
}

const mouseMoveY = (e: MouseEvent) => {
  if (!cursorDown || !wrapRef.value) return
  const offset = e.clientY - startY
  const wrap = wrapRef.value
  
  const trackHeight = wrap.clientHeight
  const thumbHeight = (ratioY.value) * trackHeight
  const scrollableHeight = wrap.scrollHeight - trackHeight
  const trackScrollableHeight = trackHeight - thumbHeight
  
  if (trackScrollableHeight <= 0) return

  const moveRatio = scrollableHeight / trackScrollableHeight
  wrap.scrollTop = startScrollTop + offset * moveRatio
}

const mouseUp = () => {
  cursorDown = false
  document.removeEventListener('mousemove', mouseMoveX)
  document.removeEventListener('mousemove', mouseMoveY)
  document.removeEventListener('mouseup', mouseUp)
  document.onselectstart = null
}

const handleBarClick = (e: MouseEvent, type: 'x' | 'y') => {
  if (!wrapRef.value) return
  // Logic to jump to position
  // Simplified: do nothing or jump to pointer
}

let observer: ResizeObserver | null = null

onMounted(() => {
  if (!props.native) {
    observer = new ResizeObserver(update)
    if (resizeRef.value) observer.observe(resizeRef.value)
    if (wrapRef.value) observer.observe(wrapRef.value)
    nextTick(update)
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

defineExpose({
  wrapRef,
  update,
  scrollTo: (options: ScrollToOptions) => wrapRef.value?.scrollTo(options),
  setScrollTop: (val: number) => { if(wrapRef.value) wrapRef.value.scrollTop = val },
  setScrollLeft: (val: number) => { if(wrapRef.value) wrapRef.value.scrollLeft = val }
})
</script>

<style scoped>
.dedsi-scrollbar {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.dedsi-scrollbar__wrap {
  height: 100%;
  overflow: auto;
}

.dedsi-scrollbar__wrap--hidden-default {
  scrollbar-width: none;
}

.dedsi-scrollbar__wrap--hidden-default::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.dedsi-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 100;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 120ms ease-out;
}

.dedsi-scrollbar:hover .dedsi-scrollbar__bar,
.dedsi-scrollbar:active .dedsi-scrollbar__bar,
.dedsi-scrollbar:focus .dedsi-scrollbar__bar,
.dedsi-scrollbar__bar.is-always {
  opacity: 1;
}

.dedsi-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}

.dedsi-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}

.dedsi-scrollbar__thumb {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(144, 147, 153, 0.3);
  transition: background-color 0.3s;
}

.dedsi-scrollbar__thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}
</style>