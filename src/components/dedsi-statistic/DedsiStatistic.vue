<template>
  <div class="dedsi-statistic">
    <div v-if="title || $slots.title" class="dedsi-statistic-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="dedsi-statistic-content" :style="contentStyle">
      <span v-if="prefix || $slots.prefix" class="dedsi-statistic-content-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="dedsi-statistic-content-value">
        {{ formattedValue }}
      </span>
      <span v-if="suffix || $slots.suffix" class="dedsi-statistic-content-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  title?: string
  value: number
  precision?: number
  prefix?: string
  suffix?: string
  showGroup?: boolean
  duration?: number
  animation?: boolean
  contentStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  precision: 0,
  showGroup: true,
  duration: 1500,
  animation: true
})

const displayValue = ref(0)
let startTime: number | null = null
let animationFrameId: number | null = null

const formatNumber = (num: number) => {
  const { precision = 0, showGroup = true } = props
  const fixed = num.toFixed(precision)
  if (!showGroup) return fixed
  
  const parts = fixed.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const formattedValue = computed(() => formatNumber(displayValue.value))

const animate = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const { duration = 1500, value } = props
  const progress = Math.min((timestamp - startTime) / duration, 1)
  
  const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
  
  displayValue.value = easeProgress * value
  
  if (progress < 1) {
    animationFrameId = requestAnimationFrame(animate)
  }
}

const startAnimation = () => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (!props.animation) {
    displayValue.value = props.value
    return
  }
  startTime = null
  animationFrameId = requestAnimationFrame(animate)
}

watch(() => props.value, () => {
  startAnimation()
})

onMounted(() => {
  startAnimation()
})
</script>

<style scoped>
.dedsi-statistic {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.dedsi-statistic-title {
  margin-bottom: 4px;
  color: var(--dedsi-text-secondary);
  font-size: 14px;
}

.dedsi-statistic-content {
  color: var(--dedsi-text-primary);
  font-size: 24px;
  font-variant: tabular-nums;
}

.dedsi-statistic-content-prefix {
  margin-right: 4px;
}

.dedsi-statistic-content-suffix {
  margin-left: 4px;
  font-size: 16px;
}

.dedsi-statistic-content-value {
  font-weight: 500;
}
</style>
