<template>
  <button
    class="dedsi-button"
    :class="[
      `dedsi-button--${type}`,
      `dedsi-button--${size}`,
      {
        'is-disabled': disabled || loading,
        'is-loading': loading,
        'is-round': round,
        'is-plain': plain,
        'is-circle': circle
      }
    ]"
    :disabled="disabled || loading"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="dedsi-button__loading-icon">
      <svg class="circular" viewBox="0 0 50 50" width="14" height="14">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    </span>
    <span v-if="$slots.icon && !loading" class="dedsi-button__icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="dedsi-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'large' | 'default' | 'small'
  nativeType?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  round?: boolean
  plain?: boolean
  circle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  nativeType: 'button',
  disabled: false,
  loading: false,
  round: false,
  plain: false,
  circle: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style scoped>
.dedsi-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: var(--dedsi-bg-color);
  border: 1px solid var(--dedsi-border-color);
  color: var(--dedsi-text-primary);
  -webkit-appearance: none;
  appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  user-select: none;
  vertical-align: middle;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
}

.dedsi-button:hover {
  color: var(--dedsi-primary-color);
  border-color: var(--dedsi-primary-color);
  background-color: var(--dedsi-primary-light);
}

.dedsi-button:active {
  color: var(--dedsi-primary-color);
  border-color: var(--dedsi-primary-color);
  outline: none;
}

/* Types */
.dedsi-button--primary {
  color: #fff;
  background-color: var(--dedsi-primary-color);
  border-color: var(--dedsi-primary-color);
}
.dedsi-button--primary:hover {
  background-color: var(--dedsi-primary-hover);
  border-color: var(--dedsi-primary-hover);
  color: #fff;
}

.dedsi-button--success {
  color: #fff;
  background-color: var(--dedsi-success-color);
  border-color: var(--dedsi-success-color);
}
.dedsi-button--success:hover {
  background-color: var(--dedsi-success-hover);
  border-color: var(--dedsi-success-hover);
  color: #fff;
}

.dedsi-button--warning {
  color: #fff;
  background-color: var(--dedsi-warning-color);
  border-color: var(--dedsi-warning-color);
}
.dedsi-button--warning:hover {
  background-color: var(--dedsi-warning-hover);
  border-color: var(--dedsi-warning-hover);
  color: #fff;
}

.dedsi-button--danger {
  color: #fff;
  background-color: var(--dedsi-danger-color);
  border-color: var(--dedsi-danger-color);
}
.dedsi-button--danger:hover {
  background-color: var(--dedsi-danger-hover);
  border-color: var(--dedsi-danger-hover);
  color: #fff;
}

/* Sizes */
.dedsi-button--large {
  padding: 12px 20px;
  font-size: 16px;
}
.dedsi-button--small {
  padding: 5px 11px;
  font-size: 12px;
}

/* Round & Circle */
.is-round {
  border-radius: 20px;
}
.is-circle {
  border-radius: 50%;
  padding: 8px;
}

/* Disabled */
.is-disabled, .is-disabled:hover, .is-disabled:focus {
  color: var(--dedsi-text-disabled);
  cursor: not-allowed;
  background-image: none;
  background-color: var(--dedsi-bg-color);
  border-color: var(--dedsi-divider-color);
}
.dedsi-button--primary.is-disabled {
  background-color: #a0cfff;
  border-color: #a0cfff;
  color: #fff;
}

/* Loading */
.dedsi-button__loading-icon {
  margin-right: 6px;
  display: flex;
  align-items: center;
}

.circular {
  animation: rotate 2s linear infinite;
  height: 14px;
  width: 14px;
}

.path {
  stroke: currentColor;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
