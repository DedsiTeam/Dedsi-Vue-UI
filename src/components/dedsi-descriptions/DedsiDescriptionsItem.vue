<template>
  <div class="dedsi-descriptions-item" :class="itemClasses" :style="itemStyle">
    <template v-if="isHorizontal">
      <div class="dedsi-descriptions-item__label" :style="labelStyleMerged">
        {{ label }}
        <span v-if="showColon" class="dedsi-descriptions-item__colon">:</span>
      </div>
      <div class="dedsi-descriptions-item__content" :style="contentStyleMerged">
        <slot />
      </div>
    </template>

    <template v-else>
      <div class="dedsi-descriptions-item__label is-vertical" :style="labelStyleMerged">
        {{ label }}
      </div>
      <div class="dedsi-descriptions-item__content is-vertical" :style="contentStyleMerged">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CSSProperties } from 'vue'
import { descriptionsContextKey } from './context'

interface Props {
  label: string
  span?: number
  labelStyle?: CSSProperties
  contentStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {
  span: 1,
  labelStyle: () => ({}),
  contentStyle: () => ({})
})

const descriptionsContext = inject(descriptionsContextKey, null)

const safeSpan = computed(() => Math.max(1, Number(props.span) || 1))

const isHorizontal = computed(() => descriptionsContext?.layout.value !== 'vertical')
const showColon = computed(() => isHorizontal.value && Boolean(descriptionsContext?.colon.value))

const itemClasses = computed(() => [
  `is-${descriptionsContext?.size.value || 'default'}`,
  {
    'is-horizontal': isHorizontal.value,
    'is-vertical': !isHorizontal.value,
    'is-bordered': descriptionsContext?.bordered.value
  }
])

const itemStyle = computed<CSSProperties>(() => ({
  gridColumn: `span ${safeSpan.value} / span ${safeSpan.value}`
}))

const labelStyleMerged = computed<CSSProperties>(() => ({
  ...props.labelStyle
}))

const contentStyleMerged = computed<CSSProperties>(() => ({
  ...props.contentStyle
}))
</script>

<style scoped>
.dedsi-descriptions-item {
  min-width: 0;
}

.dedsi-descriptions-item.is-horizontal {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.dedsi-descriptions-item.is-vertical {
  display: flex;
  flex-direction: column;
}

.dedsi-descriptions-item__label {
  color: var(--dedsi-text-secondary);
  line-height: 1.6;
  white-space: nowrap;
}

.dedsi-descriptions-item__content {
  color: var(--dedsi-text-primary);
  line-height: 1.6;
  min-width: 0;
  word-break: break-word;
}

.dedsi-descriptions-item__colon {
  margin-left: 2px;
}

.dedsi-descriptions-item.is-default {
  padding: 16px;
}

.dedsi-descriptions-item.is-middle {
  padding: 12px 16px;
}

.dedsi-descriptions-item.is-small {
  padding: 8px 12px;
}

.dedsi-descriptions-item.is-bordered {
  border-right: 1px solid var(--dedsi-border-color);
  border-bottom: 1px solid var(--dedsi-border-color);
}

.dedsi-descriptions-item.is-vertical .dedsi-descriptions-item__label {
  margin-bottom: 8px;
}
</style>
