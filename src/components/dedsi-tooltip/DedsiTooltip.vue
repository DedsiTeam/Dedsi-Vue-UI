<template>
  <DedsiPopper 
    :placement="placement" 
    trigger="hover" 
    :disabled="disabled"
    :offset="8"
    background="rgba(0, 0, 0, 0.75)"
    border-radius="4px"
    padding="6px 12px"
    popper-class="dedsi-tooltip-popper"
  >
    <slot />
    <template #content>
      <div class="dedsi-tooltip-content">
        {{ content }}
      </div>
    </template>
  </DedsiPopper>
</template>

<script setup lang="ts">
import DedsiPopper from '../dedsi-popper/DedsiPopper.vue'

interface Props {
  content: string
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  placement: 'top',
  disabled: false
})
</script>

<style scoped>
.dedsi-tooltip-content {
  color: #fff;
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
}
</style>

