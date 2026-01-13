<template>
  <DedsiPopper
    ref="popperRef"
    :placement="placement"
    trigger="click"
    :disabled="disabled"
    :offset="12"
    background="var(--dedsi-bg-color)"
    box-shadow="0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"
    padding="12px"
    popper-class="dedsi-popconfirm-popper"
  >
    <slot />
    <template #content>
      <div class="dedsi-popconfirm-inner">
        <div class="dedsi-popconfirm-body">
          <span class="dedsi-popconfirm-icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16">
              <path fill="#faad14" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"/>
            </svg>
          </span>
          <div class="dedsi-popconfirm-title">{{ title }}</div>
        </div>
        <div class="dedsi-popconfirm-buttons">
          <DedsiButton size="small" @click="handleCancel">{{ cancelText }}</DedsiButton>
          <DedsiButton size="small" type="primary" @click="handleConfirm">{{ confirmText }}</DedsiButton>
        </div>
      </div>
    </template>
  </DedsiPopper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DedsiPopper from '../dedsi-popper/DedsiPopper.vue'
import { DedsiButton } from '../index'

interface Props {
  title: string
  confirmText?: string
  cancelText?: string
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: '确定',
  cancelText: '取消',
  placement: 'top',
  disabled: false
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const popperRef = ref<any>(null)

const handleConfirm = () => {
  popperRef.value?.close()
  emit('confirm')
}

const handleCancel = () => {
  popperRef.value?.close()
  emit('cancel')
}
</script>

<style scoped>
.dedsi-popconfirm-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dedsi-popconfirm-body {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.dedsi-popconfirm-icon {
  margin-top: 2px;
  display: flex;
}

.dedsi-popconfirm-title {
  font-size: 14px;
  color: var(--dedsi-text-primary);
  line-height: 1.5;
}

.dedsi-popconfirm-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>


