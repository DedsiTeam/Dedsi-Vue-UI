<template>
  <span class="dedsi-number-converter">
    <span class="dedsi-number-converter-value">
      {{ formattedValue }}
    </span>
    <span v-if="unitDisplay" class="dedsi-number-converter-unit">
      {{ unitDisplay }}
    </span>
    <span v-if="suffix" class="dedsi-number-converter-suffix">
      {{ suffix }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TargetUnit = 'none' | 'wan' | 'qianwan' | 'yi' | 'auto'

interface Props {
  value: number | string
  targetUnit?: TargetUnit
  precision?: number
  suffix?: string // 额外的单位，如 '元', '人'
}

const props = withDefaults(defineProps<Props>(), {
  targetUnit: 'auto',
  precision: 2,
  suffix: ''
})

const units = [
  { label: '', value: 1, key: 'none' },
  { label: '万', value: 10000, key: 'wan' },
  { label: '千万', value: 10000000, key: 'qianwan' },
  { label: '亿', value: 100000000, key: 'yi' }
]

const numValue = computed(() => {
  const val = typeof props.value === 'string' ? parseFloat(props.value) : props.value
  return isNaN(val) ? 0 : val
})

const bestUnit = computed(() => {
  let unit = units[0]
  if (props.targetUnit !== 'auto') {
    unit = units.find(u => u.key === props.targetUnit) || units[0]
  } else {
    const absValue = Math.abs(numValue.value)
    if (absValue >= 100000000) unit = units[3]
    else if (absValue >= 10000000) unit = units[2]
    else if (absValue >= 10000) unit = units[1]
  }
  return unit as { label: string; value: number; key: string }
})

const formattedValue = computed(() => {
  const converted = numValue.value / bestUnit.value.value
  // 禁止四舍五入，进行物理截断
  const factor = Math.pow(10, props.precision)
  const truncated = Math.floor(converted * factor) / factor
  
  return truncated.toLocaleString(undefined, {
    minimumFractionDigits: props.precision,
    maximumFractionDigits: props.precision
  })
})

const unitDisplay = computed(() => bestUnit.value.label)
</script>

<style scoped>
.dedsi-number-converter {
  display: inline-flex;
  align-items: baseline;
  font-variant: tabular-nums;
}

.dedsi-number-converter-value {
  font-weight: 500;
}

.dedsi-number-converter-unit {
  margin-left: 2px;
  font-size: 0.9em;
  color: var(--dedsi-text-secondary);
}

.dedsi-number-converter-suffix {
  margin-left: 2px;
  font-size: 0.9em;
  color: var(--dedsi-text-secondary);
}
</style>
