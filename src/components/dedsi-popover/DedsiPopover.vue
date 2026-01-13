<template>
  <DedsiPopper
    :placement="placement"
    :trigger="trigger"
    :disabled="disabled"
    :offset="12"
    background="var(--dedsi-bg-color)"
    box-shadow="0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"
    padding="0"
    popper-class="dedsi-popover-popper"
  >
    <slot />
    <template #content>
      <div class="dedsi-popover-inner">
        <div v-if="title || $slots.title" class="dedsi-popover-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="dedsi-popover-content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </template>
  </DedsiPopper>
</template>

<script setup lang="ts">
import DedsiPopper from '../dedsi-popper/DedsiPopper.vue'

interface Props {
  title?: string
  content?: string
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  trigger?: 'hover' | 'click'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  placement: 'top',
  trigger: 'hover',
  disabled: false
})
</script>

<style scoped>
.dedsi-popover-inner {
  overflow: hidden;
}

.dedsi-popover-title {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--dedsi-text-primary);
  border-bottom: 1px solid var(--dedsi-divider-color);
}

.dedsi-popover-content {
  padding: 12px 16px;
  font-size: 14px;
  color: var(--dedsi-text-secondary);
  line-height: 1.5;
}
</style>


