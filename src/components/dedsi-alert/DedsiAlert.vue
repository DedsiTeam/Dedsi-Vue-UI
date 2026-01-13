<template>
  <transition name="dedsi-alert-fade">
    <div
      v-if="visible"
      class="dedsi-alert"
      :class="[
        `dedsi-alert--${type}`,
        { 'is-center': center, 'is-with-description': description || $slots.default }
      ]"
      role="alert"
    >
      <span v-if="showIcon" class="dedsi-alert__icon">
        <slot name="icon">
          <svg v-if="type === 'success'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H700c6.5 0 10.3 7.4 6.5 12.7z"/></svg>
          <svg v-else-if="type === 'info'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"/></svg>
          <svg v-else-if="type === 'warning'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"/></svg>
          <svg v-else-if="type === 'error'" viewBox="0 0 1024 1024" width="16" height="16"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-47.4 47.4L512 611.4l-118 118.2-47.4-47.4L464.6 512l-118-118.2 47.4-47.4L512 464.6l118-118.2 47.4 47.4L559.4 512l118 118.2z"/></svg>
        </slot>
      </span>
      <div class="dedsi-alert__content">
        <span v-if="title || $slots.title" class="dedsi-alert__title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="description || $slots.default" class="dedsi-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <span v-if="closable" class="dedsi-alert__close-btn" @click="close">
          <slot name="close">{{ closeText }}</slot>
          <svg v-if="!closeText" viewBox="0 0 1024 1024" width="12" height="12"><path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>
        </span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  description?: string
  type?: 'success' | 'info' | 'warning' | 'error'
  closable?: boolean
  closeText?: string
  showIcon?: boolean
  center?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  closable: false,
  showIcon: false,
  center: false
})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()

const visible = ref(true)

const close = (event: MouseEvent) => {
  visible.value = false
  emit('close', event)
}
</script>

<style scoped>
.dedsi-alert {
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  background-color: var(--dedsi-bg-color);
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  border: 1px solid transparent;
}

.dedsi-alert-fade-enter-from,
.dedsi-alert-fade-leave-to {
  opacity: 0;
}

.dedsi-alert--success {
  background-color: var(--dedsi-success-light);
  border-color: var(--dedsi-success-color);
  color: var(--dedsi-success-color);
}

.dedsi-alert--info {
  background-color: var(--dedsi-primary-light);
  border-color: var(--dedsi-primary-color);
  color: var(--dedsi-primary-color);
}

.dedsi-alert--warning {
  background-color: var(--dedsi-warning-light);
  border-color: var(--dedsi-warning-color);
  color: var(--dedsi-warning-color);
}

.dedsi-alert--error {
  background-color: var(--dedsi-danger-light);
  border-color: var(--dedsi-danger-color);
  color: var(--dedsi-danger-color);
}

.dedsi-alert__icon {
  font-size: 16px;
  width: 16px;
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.dedsi-alert__content {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.dedsi-alert__title {
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}

.dedsi-alert__description {
  font-size: 12px;
  margin: 4px 0 0;
  line-height: 18px;
  color: inherit;
  opacity: 0.9;
}

.dedsi-alert.is-center {
  justify-content: center;
  text-align: center;
}

.dedsi-alert.is-center .dedsi-alert__content {
  flex: none;
}

.dedsi-alert__close-btn {
  font-size: 12px;
  color: inherit;
  opacity: 0.6;
  position: absolute;
  top: 12px;
  right: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
}

.dedsi-alert__close-btn:hover {
  opacity: 1;
}

.is-with-description {
  align-items: flex-start;
  padding: 12px 16px;
}

.is-with-description .dedsi-alert__icon {
  font-size: 24px;
  width: 24px;
  margin-top: 2px;
}

.is-with-description .dedsi-alert__title {
  font-size: 16px;
}
</style>
