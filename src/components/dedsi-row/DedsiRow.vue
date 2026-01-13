<template>
  <div class="dedsi-row" :style="rowStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

const props = defineProps<{
  gutter?: number | [number, number]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
}>()

const rowStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (props.gutter) {
    const gutterX = Array.isArray(props.gutter) ? props.gutter[0] : props.gutter
    const gutterY = Array.isArray(props.gutter) ? props.gutter[1] : 0
    
    if (gutterX) {
      styles.marginLeft = `-${gutterX / 2}px`
      styles.marginRight = `-${gutterX / 2}px`
    }
    if (gutterY) {
      styles.rowGap = `${gutterY}px`
    }
  }
  
  if (props.justify) {
    styles.justifyContent = props.justify
  }
  
  if (props.align) {
    const alignMap = {
      top: 'flex-start',
      middle: 'center',
      bottom: 'flex-end'
    }
    styles.alignItems = alignMap[props.align]
  }
  
  return styles
})

provide('DedsiRowGutter', props.gutter)
</script>

<style scoped>
.dedsi-row {
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
}

.dedsi-row::before,
.dedsi-row::after {
  display: flex;
}
</style>
