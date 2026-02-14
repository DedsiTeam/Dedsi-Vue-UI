<template>
  <div class="dedsi-descriptions" :class="descriptionsClasses">
    <div v-if="title || $slots.title" class="dedsi-descriptions__title">
      <slot name="title">{{ title }}</slot>
    </div>

    <div class="dedsi-descriptions__view" :style="viewStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import type { CSSProperties } from 'vue'
import { descriptionsContextKey } from './context'

interface Props {
  title?: string
  bordered?: boolean
  column?: number
  colon?: boolean
  size?: 'default' | 'middle' | 'small'
  layout?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  bordered: false,
  column: 3,
  colon: true,
  size: 'default',
  layout: 'horizontal'
})

const safeColumn = computed(() => Math.max(1, Number(props.column) || 1))

const descriptionsClasses = computed(() => [
  `is-${props.size}`,
  { 'is-bordered': props.bordered }
])

const viewStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${safeColumn.value}, minmax(0, 1fr))`
}))

provide(descriptionsContextKey, {
  bordered: computed(() => props.bordered),
  colon: computed(() => props.colon),
  layout: computed(() => props.layout),
  size: computed(() => props.size)
})
</script>

<style scoped>
.dedsi-descriptions {
  width: 100%;
  color: var(--dedsi-text-primary);
}

.dedsi-descriptions__title {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

.dedsi-descriptions__view {
  display: grid;
}

.dedsi-descriptions.is-bordered .dedsi-descriptions__view {
  border-top: 1px solid var(--dedsi-border-color);
  border-left: 1px solid var(--dedsi-border-color);
}
</style>
