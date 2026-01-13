<template>
  <div class="dedsi-badge">
    <slot />
    <transition name="dedsi-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        class="dedsi-badge__content"
        :class="[
          `dedsi-badge__content--${type}`,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot
          }
        ]"
        v-text="content"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: string | number
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  max: 99,
  isDot: false,
  hidden: false,
  type: 'danger'
})

const content = computed(() => {
  if (props.isDot) return ''
  if (typeof props.value === 'number' && typeof props.max === 'number') {
    return props.max < props.value ? `${props.max}+` : props.value
  }
  return props.value
})
</script>

<style scoped>
.dedsi-badge {
  position: relative;
  vertical-align: middle;
  display: inline-block;
}

.dedsi-badge__content {
  background-color: var(--dedsi-danger-color);
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
}

.dedsi-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%) translateX(100%);
}

.dedsi-badge__content.is-dot {
  height: 8px;
  width: 8px;
  padding: 0;
  right: 0;
  border-radius: 50%;
}

.dedsi-badge__content--primary {
  background-color: var(--dedsi-primary-color);
}

.dedsi-badge__content--success {
  background-color: var(--dedsi-success-color);
}

.dedsi-badge__content--warning {
  background-color: var(--dedsi-warning-color);
}

.dedsi-badge__content--danger {
  background-color: var(--dedsi-danger-color);
}

.dedsi-zoom-in-center-enter-active,
.dedsi-zoom-in-center-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.dedsi-zoom-in-center-enter-from,
.dedsi-zoom-in-center-leave-to {
  opacity: 0;
  transform: scale(0) translateY(-50%) translateX(100%);
}

.dedsi-zoom-in-center-enter-to,
.dedsi-zoom-in-center-leave-from {
  opacity: 1;
  transform: scale(1) translateY(-50%) translateX(100%);
}

/* Adjust zoom for non-fixed badges */
.dedsi-badge .dedsi-badge__content:not(.is-fixed) {
  transform: none;
}

.dedsi-badge .dedsi-badge__content:not(.is-fixed).dedsi-zoom-in-center-enter-from,
.dedsi-badge .dedsi-badge__content:not(.is-fixed).dedsi-zoom-in-center-leave-to {
  transform: scale(0);
}

.dedsi-badge .dedsi-badge__content:not(.is-fixed).dedsi-zoom-in-center-enter-to,
.dedsi-badge .dedsi-badge__content:not(.is-fixed).dedsi-zoom-in-center-leave-from {
  transform: scale(1);
}
</style>
