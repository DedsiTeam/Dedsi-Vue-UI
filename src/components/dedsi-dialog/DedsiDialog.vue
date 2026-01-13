<template>
  <Teleport to="body">
    <div class="dedsi-dialog-root">
      <Transition name="dedsi-fade">
        <div v-if="visible" class="dedsi-dialog-mask" @click="handleMaskClick"></div>
      </Transition>
      <div class="dedsi-dialog-wrap" v-if="visible" @click.self="handleMaskClick">
        <Transition name="dedsi-zoom">
          <div
            v-if="visible"
            class="dedsi-dialog"
            :class="[centered && 'dedsi-dialog-centered']"
            :style="dialogStyle"
          >
            <div class="dedsi-dialog-content">
              <button v-if="closable" class="dedsi-dialog-close" @click="handleClose">
                <span class="dedsi-dialog-close-x">
                  <CloseOutlined />
                </span>
              </button>
              
              <div v-if="title || $slots.title" class="dedsi-dialog-header">
                <div class="dedsi-dialog-title">
                  <span v-if="type && type !== 'info'" class="dedsi-dialog-status-icon" :class="[`dedsi-dialog-status-${type}`]">
                    <CheckCircleFilled v-if="type === 'success'" />
                    <ExclamationCircleFilled v-else-if="type === 'warning'" />
                    <CloseCircleFilled v-else-if="type === 'error'" />
                  </span>
                  <slot name="title">{{ title }}</slot>
                </div>
              </div>

              <div class="dedsi-dialog-body">
                <slot></slot>
              </div>

              <div v-if="!footerHidden" class="dedsi-dialog-footer">
                <slot name="footer">
                  <DedsiButton type="primary" :loading="confirmLoading" @click="handleOk">
                    {{ okText }}
                  </DedsiButton>
                  <DedsiButton @click="handleCancel">{{ cancelText }}</DedsiButton>
                </slot>
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
import { 
  CloseOutlined, 
  CheckCircleFilled, 
  ExclamationCircleFilled, 
  CloseCircleFilled 
} from '@ant-design/icons-vue'
import { DedsiButton } from '../dedsi-button'

interface Props {
  visible: boolean
  title?: string
  width?: number | string
  centered?: boolean
  closable?: boolean
  maskClosable?: boolean
  okText?: string
  cancelText?: string
  confirmLoading?: boolean
  footerHidden?: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  width: 520,
  centered: false,
  closable: true,
  maskClosable: true,
  okText: '确定',
  cancelText: '取消',
  confirmLoading: false,
  footerHidden: false
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'ok'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const dialogStyle = computed(() => {
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return {
    width
  }
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
  emit('cancel')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handleCancel = () => {
  handleClose()
}

const handleOk = () => {
  emit('ok')
}

// 自动处理 Body 滚动锁定
watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = 'var(--dedsi-scrollbar-width, 0px)'
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
})
</script>

<style scoped>
.dedsi-dialog-root {
  position: relative;
  z-index: 1000;
}

.dedsi-dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
}

.dedsi-dialog-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
}

.dedsi-dialog {
  position: relative;
  top: 100px;
  width: auto;
  margin: 0 auto;
  padding-bottom: 24px;
  pointer-events: none;
}

.dedsi-dialog-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100% - 32px);
  top: 0;
  padding-bottom: 0;
}

.dedsi-dialog-content {
  position: relative;
  background-color: var(--dedsi-bg-color, #fff);
  background-clip: padding-box;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: auto;
}

.dedsi-dialog-close {
  position: absolute;
  top: 17px;
  right: 17px;
  z-index: 10;
  padding: 0;
  color: var(--dedsi-text-secondary);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dedsi-dialog-close:hover {
  color: var(--dedsi-text-primary);
}

.dedsi-dialog-header {
  padding: 16px 24px;
  color: var(--dedsi-text-primary);
  background: transparent;
  border-bottom: 1px solid var(--dedsi-divider-color, #f0f0f0);
  border-radius: 8px 8px 0 0;
}

.dedsi-dialog-title {
  margin: 0;
  color: var(--dedsi-text-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
}

.dedsi-dialog-status-icon {
  margin-right: 12px;
  font-size: 22px;
}

.dedsi-dialog-status-success { color: var(--dedsi-success-color); }
.dedsi-dialog-status-warning { color: var(--dedsi-warning-color); }
.dedsi-dialog-status-error { color: var(--dedsi-danger-color); }

.dedsi-dialog-body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
}

.dedsi-dialog-footer {
  padding: 12px 16px;
  text-align: left;
  background: transparent;
  border-top: 1px solid var(--dedsi-divider-color, #f0f0f0);
  border-radius: 0 0 8px 8px;
}

.dedsi-dialog-footer .dedsi-button + .dedsi-button {
  margin-left: 8px;
}

/* Animations */
.dedsi-fade-enter-active,
.dedsi-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dedsi-fade-enter-from,
.dedsi-fade-leave-to {
  opacity: 0;
}

.dedsi-zoom-enter-active {
  animation: dedsiDialogZoomIn 0.3s cubic-bezier(0.08, 0.82, 0.17, 1);
}
.dedsi-zoom-leave-active {
  animation: dedsiDialogZoomOut 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.34);
}

@keyframes dedsiDialogZoomIn {
  0% { transform: scale(0.2); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes dedsiDialogZoomOut {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.2); opacity: 0; }
}
</style>
