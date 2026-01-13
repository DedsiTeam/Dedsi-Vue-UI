<template>
  <Teleport to="body">
    <div class="dedsi-drawer-root">
      <Transition name="dedsi-fade">
        <div v-if="visible && mask" class="dedsi-drawer-mask" @click="handleMaskClick"></div>
      </Transition>
      
      <Transition :name="`dedsi-drawer-slide-${placement}`">
        <div
          v-if="visible"
          class="dedsi-drawer"
          :class="[`dedsi-drawer-${placement}`]"
          :style="drawerStyle"
        >
          <div class="dedsi-drawer-content">
            <div v-if="title || $slots.title || closable" class="dedsi-drawer-header">
              <div class="dedsi-drawer-header-title">
                <slot name="title">{{ title }}</slot>
              </div>
              <button v-if="closable" class="dedsi-drawer-close" @click="handleClose">
                <CloseOutlined />
              </button>
            </div>

            <div class="dedsi-drawer-body">
              <slot></slot>
            </div>

            <div v-if="$slots.footer" class="dedsi-drawer-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

interface Props {
  visible: boolean
  title?: string
  placement?: 'left' | 'right' | 'top' | 'bottom'
  width?: number | string
  height?: number | string
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  placement: 'right',
  width: 378,
  height: 378,
  closable: true,
  mask: true,
  maskClosable: true
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
}>()

const drawerStyle = computed(() => {
  const isHorizontal = props.placement === 'left' || props.placement === 'right'
  const sizeValue = isHorizontal ? props.width : props.height
  const size = typeof sizeValue === 'number' ? `${sizeValue}px` : sizeValue
  
  return {
    [isHorizontal ? 'width' : 'height']: size
  }
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

// Lock body scroll
watch(() => props.visible, (val) => {
  if (val && props.mask) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.dedsi-drawer-root {
  position: relative;
  z-index: 1000;
}

.dedsi-drawer-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
}

.dedsi-drawer {
  position: fixed;
  z-index: 1000;
  background-color: var(--dedsi-bg-color, #fff);
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.08), 0 16px 24px 2px rgba(0, 0, 0, 0.04), 0 6px 30px 5px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
}

.dedsi-drawer-right { top: 0; right: 0; height: 100%; }
.dedsi-drawer-left { top: 0; left: 0; height: 100%; }
.dedsi-drawer-top { top: 0; left: 0; width: 100%; }
.dedsi-drawer-bottom { bottom: 0; left: 0; width: 100%; }

.dedsi-drawer-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dedsi-drawer-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--dedsi-divider-color, #f0f0f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dedsi-drawer-header-title {
  font-weight: 600;
  font-size: 16px;
  color: var(--dedsi-text-primary);
}

.dedsi-drawer-close {
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  color: var(--dedsi-text-secondary);
  font-size: 16px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.dedsi-drawer-close:hover {
  color: var(--dedsi-text-primary);
}

.dedsi-drawer-body {
  flex: 1;
  padding: 24px;
  overflow: auto;
  font-size: 14px;
  color: var(--dedsi-text-primary);
}

.dedsi-drawer-footer {
  padding: 10px 16px;
  border-top: 1px solid var(--dedsi-divider-color, #f0f0f0);
  text-align: left;
}

/* Animations */
.dedsi-fade-enter-active,
.dedsi-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.dedsi-fade-enter-from,
.dedsi-fade-leave-to {
  opacity: 0;
}

/* Slide Right */
.dedsi-drawer-slide-right-enter-active,
.dedsi-drawer-slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.dedsi-drawer-slide-right-enter-from,
.dedsi-drawer-slide-right-leave-to {
  transform: translateX(100%);
}

/* Slide Left */
.dedsi-drawer-slide-left-enter-active,
.dedsi-drawer-slide-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.dedsi-drawer-slide-left-enter-from,
.dedsi-drawer-slide-left-leave-to {
  transform: translateX(-100%);
}

/* Slide Top */
.dedsi-drawer-slide-top-enter-active,
.dedsi-drawer-slide-top-leave-active {
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.dedsi-drawer-slide-top-enter-from,
.dedsi-drawer-slide-top-leave-to {
  transform: translateY(-100%);
}

/* Slide Bottom */
.dedsi-drawer-slide-bottom-enter-active,
.dedsi-drawer-slide-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.dedsi-drawer-slide-bottom-enter-from,
.dedsi-drawer-slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>
