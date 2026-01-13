<template>
  <div 
    class="dedsi-card" 
    :class="{ 
      'is-bordered': bordered,
      'is-hoverable': hoverable && !noShadow,
      'has-shadow': !noShadow && (shadow === 'always' || (shadow === 'hover' && isHovering))
    }"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div v-if="title || $slots.title || $slots.extra" class="dedsi-card__header">
      <div class="dedsi-card__header-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" class="dedsi-card__header-extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="dedsi-card__body" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="$slots.footer" class="dedsi-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  bordered?: boolean
  hoverable?: boolean
  noShadow?: boolean
  shadow?: 'always' | 'hover' | 'never'
  bodyStyle?: Record<string, any>
}

withDefaults(defineProps<Props>(), {
  bordered: true,
  hoverable: false,
  noShadow: true,
  shadow: 'hover'
})


const isHovering = ref(false)
</script>

<style scoped>
.dedsi-card {
  background: var(--dedsi-bg-color);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
}

.dedsi-card.is-bordered {
  border: 1px solid var(--dedsi-divider-color);
}

.dedsi-card.has-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.dedsi-card.is-hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  cursor: pointer;
}

.dedsi-card__header {
  padding: 1rem;
  border-bottom: 1px solid var(--dedsi-divider-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dedsi-card__header-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dedsi-text-primary);
}

.dedsi-card__body {
  padding: 1rem;
  flex: 1;
  color: var(--dedsi-text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.dedsi-card__footer {
  padding: 1rem;
  border-top: 1px solid var(--dedsi-divider-color);
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
