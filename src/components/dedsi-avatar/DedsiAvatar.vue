<template>
  <span
    class="dedsi-avatar"
    :class="[
      `dedsi-avatar--${shape}`,
      typeof size === 'string' ? `dedsi-avatar--${size}` : ''
    ]"
    :style="customStyle"
  >
    <img
      v-if="src && !hasLoadError"
      :src="src"
      :alt="alt"
      :style="{ objectFit: fit }"
      @error="handleError"
    >
    <span v-else-if="icon" class="dedsi-avatar-icon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span v-else class="dedsi-avatar-string">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  src?: string
  size?: 'large' | 'default' | 'small' | number
  shape?: 'circle' | 'square'
  icon?: any
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  shape: 'circle',
  fit: 'cover'
})

const emit = defineEmits<{
  (e: 'error', event: Event): void
}>()

const hasLoadError = ref(false)

const handleError = (e: Event) => {
  hasLoadError.value = true
  emit('error', e)
}

const customStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      lineHeight: `${props.size}px`,
      fontSize: `${props.size / 2}px`
    }
  }
  return {}
})
</script>

<style scoped>
.dedsi-avatar {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #ccc;
  color: #fff;
  white-space: nowrap;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.dedsi-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dedsi-avatar--circle {
  border-radius: 50%;
}

.dedsi-avatar--square {
  border-radius: 4px;
}

.dedsi-avatar--large {
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}

.dedsi-avatar--small {
  width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}

.dedsi-avatar img {
  display: block;
  width: 100%;
  height: 100%;
}

.dedsi-avatar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dedsi-avatar-string {
  padding: 0 4px;
}
</style>
