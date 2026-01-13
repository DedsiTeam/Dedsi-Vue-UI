<template>
  <span
    v-if="visible"
    class="dedsi-tag"
    :class="[
      type ? `dedsi-tag--${type}` : '',
      size ? `dedsi-tag--${size}` : '',
      { 'is-round': round }
    ]"
    :style="customStyle"
  >
    <slot />
    <span v-if="closable" class="dedsi-tag-close" @click.stop="handleClose">
      <svg viewBox="0 0 1024 1024" width="12" height="12">
        <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-47.4 47.4L512 611.4l-118 118.2-47.4-47.4L464.6 512l-118-118.2 47.4-47.4L512 464.6l118-118.2 47.4 47.4L559.4 512l118 118.2z"/>
      </svg>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'large' | 'default' | 'small'
  closable?: boolean
  round?: boolean
  color?: string
  backgroundColor?: string
  borderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  closable: false,
  round: false
})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()

const visible = ref(true)

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) style.color = props.color
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor
  if (props.borderColor) style.borderColor = props.borderColor
  return style
})

const handleClose = (event: MouseEvent) => {
  visible.value = false
  emit('close', event)
}
</script>

<style scoped>
.dedsi-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  height: 24px;
  line-height: 22px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid var(--dedsi-border-color);
  background-color: var(--dedsi-bg-secondary);
  color: var(--dedsi-text-secondary);
  white-space: nowrap;
  box-sizing: border-box;
  margin-right: 8px;
}

/* Types */
.dedsi-tag--primary {
  background-color: var(--dedsi-primary-light);
  border-color: var(--dedsi-primary-color);
  color: var(--dedsi-primary-color);
}

.dedsi-tag--success {
  background-color: var(--dedsi-success-light);
  border-color: var(--dedsi-success-color);
  color: var(--dedsi-success-color);
}

.dedsi-tag--warning {
  background-color: var(--dedsi-warning-light);
  border-color: var(--dedsi-warning-color);
  color: var(--dedsi-warning-color);
}

.dedsi-tag--danger {
  background-color: var(--dedsi-danger-light);
  border-color: var(--dedsi-danger-color);
  color: var(--dedsi-danger-color);
}

/* Sizes */
.dedsi-tag--large {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

.dedsi-tag--small {
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
}

/* Round */
.is-round {
  border-radius: 12px;
}

/* Close Icon */
.dedsi-tag-close {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.dedsi-tag-close:hover {
  opacity: 1;
}
</style>
