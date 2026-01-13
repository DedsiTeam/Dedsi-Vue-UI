<template>
  <div class="dedsi-countdown">
    <div v-if="title || $slots.title" class="dedsi-countdown-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="dedsi-countdown-content" :style="valueStyle">
      <span v-if="prefix || $slots.prefix" class="dedsi-countdown-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="dedsi-countdown-value">
        {{ formattedValue }}
      </span>
      <span v-if="suffix || $slots.suffix" class="dedsi-countdown-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  title?: string
  value: number | string | Date
  format?: string
  prefix?: string
  suffix?: string
  valueStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  format: 'HH:mm:ss'
})

const emit = defineEmits<{
  (e: 'finish'): void
  (e: 'change', value: number): void
}>()

const remaining = ref(0)
let timer: any = null

const calculateRemaining = () => {
  const target = new Date(props.value).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)
  remaining.value = diff
  
  if (diff <= 0) {
    stopTimer()
    emit('finish')
  }
}

const startTimer = () => {
  stopTimer()
  calculateRemaining()
  if (remaining.value > 0) {
    timer = setInterval(() => {
      calculateRemaining()
      emit('change', remaining.value)
    }, 1000)
  }
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const formattedValue = computed(() => {
  const t = remaining.value
  const seconds = Math.floor(t / 1000) % 60
  const minutes = Math.floor(t / (1000 * 60)) % 60
  const hours = Math.floor(t / (1000 * 60 * 60)) % 24
  const days = Math.floor(t / (1000 * 60 * 60 * 24))

  let fmt = props.format
  
  // Replace patterns
  const map: Record<string, number> = {
    'D+': days,
    'H+': hours,
    'm+': minutes,
    's+': seconds
  }

  for (const k in map) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const val = map[k]
      const match = RegExp.$1
      // If it's single character like 'H', just show value. If 'HH', pad zero.
      const strVal = match.length > 1 ? String(val).padStart(2, '0') : String(val)
      fmt = fmt.replace(match, strVal)
    }
  }

  return fmt
})

watch(() => props.value, () => {
  startTimer()
})

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.dedsi-countdown {
  display: inline-block;
}

.dedsi-countdown-title {
  margin-bottom: 4px;
  color: var(--dedsi-text-secondary);
  font-size: 14px;
}

.dedsi-countdown-content {
  color: var(--dedsi-text-primary);
  font-size: 24px;
  font-variant: tabular-nums;
  display: flex;
  align-items: baseline;
}

.dedsi-countdown-prefix {
  margin-right: 4px;
}

.dedsi-countdown-suffix {
  margin-left: 4px;
  font-size: 16px;
}

.dedsi-countdown-value {
  font-weight: 500;
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
}
</style>
