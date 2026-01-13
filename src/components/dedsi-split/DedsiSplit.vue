<template>
  <div 
    class="dedsi-split" 
    :style="containerStyle"
  >
    <div class="dedsi-split-left">
      <slot name="left" />
      <slot />
    </div>
    <div class="dedsi-split-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  align?: 'top' | 'center' | 'bottom' | 'baseline'
  padding?: string | number
  gap?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center'
})

const containerStyle = computed(() => {
  const alignMap = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    baseline: 'baseline'
  }

  const paddingVal = typeof props.padding === 'number' ? `${props.padding}px` : props.padding
  const gapVal = typeof props.gap === 'number' ? `${props.gap}px` : props.gap

  return {
    alignItems: alignMap[props.align],
    padding: paddingVal || undefined,
    gap: gapVal || undefined
  }
})
</script>

<style scoped>
.dedsi-split {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

.dedsi-split-left,
.dedsi-split-right {
  display: flex;
  align-items: inherit;
  gap: inherit;
}
</style>
