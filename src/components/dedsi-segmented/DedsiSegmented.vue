<template>
  <div
    class="dedsi-segmented"
    :class="[
      `dedsi-segmented--${size}`,
      {
        'dedsi-segmented--block': block,
        'dedsi-segmented--disabled': disabled
      }
    ]"
    ref="containerRef"
  >
    <div class="dedsi-segmented-group">
      <div 
        class="dedsi-segmented-item-selected-bg" 
        :style="activeStyle"
      />
      <div
        v-for="item in options"
        :key="item.value"
        class="dedsi-segmented-item"
        :class="{
          'dedsi-segmented-item-selected': item.value === modelValue,
          'dedsi-segmented-item-disabled': item.disabled || disabled
        }"
        @click="handleClick(item)"
        ref="itemRefs"
      >
        <div class="dedsi-segmented-item-label">
          <span v-if="item.icon" class="dedsi-segmented-item-icon">
             <component :is="item.icon" />
          </span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

interface SegmentedOption {
  label: string
  value: string | number
  icon?: any
  disabled?: boolean
}

interface Props {
  modelValue: string | number
  options: SegmentedOption[]
  block?: boolean
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  block: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const itemRefs = ref<HTMLElement[]>([])
const activeStyle = ref<Record<string, string>>({})

const updateActiveStyle = () => {
  nextTick(() => {
    const index = props.options.findIndex(opt => opt.value === props.modelValue)
    const activeItem = itemRefs.value[index]
    if (activeItem) {
      activeStyle.value = {
        width: `${activeItem.offsetWidth}px`,
        height: `${activeItem.offsetHeight}px`,
        left: `${activeItem.offsetLeft}px`,
        top: `${activeItem.offsetTop}px`,
        opacity: '1'
      }
    }
  })
}

const handleClick = (item: SegmentedOption) => {
  if (item.disabled || props.disabled) return
  emit('update:modelValue', item.value)
  emit('change', item.value)
}

watch(() => props.modelValue, updateActiveStyle)
watch(() => props.options, updateActiveStyle, { deep: true })

onMounted(() => {
  updateActiveStyle()
})
</script>

<style scoped>
.dedsi-segmented {
  display: inline-block;
  background-color: var(--dedsi-bg-secondary, #fafafa);
  border-radius: 6px;
  padding: 0.2rem;
  box-sizing: border-box;
  transition: all 0.3s;
}

.dedsi-segmented--block {
  display: flex;
  width: 100%;
}

.dedsi-segmented--block .dedsi-segmented-item {
  flex: 1;
}

.dedsi-segmented-group {
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  border-radius: 4px;
}

.dedsi-segmented-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  cursor: pointer;
  z-index: 1;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: var(--dedsi-text-secondary);
}

.dedsi-segmented-item-label {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dedsi-segmented-item-selected {
  color: var(--dedsi-text-primary);
  font-weight: 500;
}

.dedsi-segmented-item:not(.dedsi-segmented-item-selected):not(.dedsi-segmented-item-disabled):hover {
  color: var(--dedsi-text-primary);
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

.dedsi-segmented-item-disabled {
  cursor: not-allowed;
  color: var(--dedsi-text-disabled);
}

.dedsi-segmented-item-selected-bg {
  position: absolute;
  background-color: var(--dedsi-bg-color, #ffffff);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  opacity: 0;
  z-index: 0;
}

/* Sizes */
.dedsi-segmented--large .dedsi-segmented-item {
  height: 36px;
  font-size: 16px;
}

.dedsi-segmented--default .dedsi-segmented-item {
  height: 28px;
  font-size: 14px;
}

.dedsi-segmented--small .dedsi-segmented-item {
  height: 20px;
  font-size: 12px;
  padding: 0 8px;
}

.dedsi-segmented--disabled {
  background-color: var(--dedsi-bg-disabled);
}

.dedsi-segmented-item-icon {
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>
