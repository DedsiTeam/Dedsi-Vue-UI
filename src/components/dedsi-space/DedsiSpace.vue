<template>
  <div 
    class="dedsi-space" 
    :class="[
      `dedsi-space-${direction}`,
      { 'dedsi-space-wrap': wrap }
    ]"
    :style="spaceStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SpaceSize = 'small' | 'middle' | 'large' | number

interface Props {
  direction?: 'horizontal' | 'vertical'
  size?: SpaceSize | [SpaceSize, SpaceSize]
  wrap?: boolean
  align?: 'start' | 'end' | 'center' | 'baseline'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 'small',
  wrap: false
})

const getSpaceSize = (size: SpaceSize): string => {
  if (typeof size === 'number') return `${size}px`
  const sizeMap = {
    small: '8px',
    middle: '16px',
    large: '24px'
  }
  return sizeMap[size]
}

const spaceStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (Array.isArray(props.size)) {
    const [rowGap, colGap] = props.size
    styles.rowGap = getSpaceSize(rowGap)
    styles.columnGap = getSpaceSize(colGap)
  } else {
    const gap = getSpaceSize(props.size)
    styles.gap = gap
  }

  if (props.align) {
    const alignMap = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline'
    }
    styles.alignItems = alignMap[props.align]
  }

  return styles
})
</script>

<style scoped>
.dedsi-space {
  display: inline-flex;
}

.dedsi-space-horizontal {
  flex-direction: row;
}

.dedsi-space-vertical {
  flex-direction: column;
}

.dedsi-space-wrap {
  flex-wrap: wrap;
}
</style>
