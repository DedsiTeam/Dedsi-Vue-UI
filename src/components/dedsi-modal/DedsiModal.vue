<template>
  <Teleport to="body">
    <div class="dedsi-modal-root">
      <Transition name="dedsi-fade">
        <div v-if="visible && mask" class="dedsi-modal-mask" @click="handleMaskClick"></div>
      </Transition>
      <div class="dedsi-modal-wrap" v-if="visible" @click.self="handleMaskClick">
        <Transition name="dedsi-modal-zoom">
          <div
            v-if="visible"
            class="dedsi-modal"
            :class="[centered && 'dedsi-modal-centered']"
            :style="modalStyle"
          >
            <div class="dedsi-modal-content">
              <button v-if="closable" class="dedsi-modal-close" @click="handleCancel">
                <CloseOutlined />
              </button>
              
              <div v-if="title || $slots.title" class="dedsi-modal-header">
                <div class="dedsi-modal-title">
                  <slot name="title">{{ title }}</slot>
                </div>
              </div>

              <div class="dedsi-modal-body">
                <slot></slot>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

interface Props {
  visible: boolean
  title?: string
  width?: number | string
  centered?: boolean
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  width: 520,
  centered: false,
  closable: true,
  mask: true,
  maskClosable: true
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'cancel'): void
}>()

const modalStyle = computed(() => {
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return {
    width
  }
})

const handleCancel = () => {
  emit('update:visible', false)
  emit('cancel')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleCancel()
  }
}

// Lock scroll
watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.dedsi-modal-root {
  position: relative;
  z-index: 1000;
}

.dedsi-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
}

.dedsi-modal-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
}

.dedsi-modal {
  position: relative;
  top: 100px;
  width: auto;
  margin: 0 auto;
  padding-bottom: 24px;
}

.dedsi-modal-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100% - 32px);
  top: 0;
  padding-bottom: 0;
}

.dedsi-modal-content {
  position: relative;
  background-color: var(--dedsi-bg-color, #fff);
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.dedsi-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--dedsi-text-secondary);
  font-size: 16px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dedsi-modal-close:hover {
  color: var(--dedsi-text-primary);
}

.dedsi-modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--dedsi-divider-color, #f0f0f0);
}

.dedsi-modal-title {
  margin: 0;
  color: var(--dedsi-text-primary);
  font-weight: 600;
  font-size: 16px;
}

.dedsi-modal-body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5715;
  color: var(--dedsi-text-primary);
}

/* Animations */
.dedsi-fade-enter-active,
.dedsi-fade-leave-active {
  transition: opacity 0.3s;
}
.dedsi-fade-enter-from,
.dedsi-fade-leave-to {
  opacity: 0;
}

.dedsi-modal-zoom-enter-active {
  animation: dedsiModalZoomIn 0.3s cubic-bezier(0.08, 0.82, 0.17, 1);
}
.dedsi-modal-zoom-leave-active {
  animation: dedsiModalZoomOut 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.34);
}

@keyframes dedsiModalZoomIn {
  0% { transform: scale(0.2); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes dedsiModalZoomOut {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.2); opacity: 0; }
}
</style>
