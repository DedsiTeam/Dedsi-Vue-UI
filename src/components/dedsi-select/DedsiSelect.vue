<template>
  <div class="dedsi-select" :class="{ 'dedsi-select-open': isOpen, 'dedsi-select-disabled': disabled }">
    <div ref="selectorRef" class="dedsi-select-selector" @click="toggleDropdown">
      <div v-if="mode === 'multiple' && Array.isArray(modelValue) && modelValue.length > 0" class="dedsi-select-tags">
        <span v-for="val in modelValue" :key="val" class="dedsi-tag-item">
          {{ getLabel(val) }}
          <span class="dedsi-tag-close" @click="removeTag($event, val)">×</span>
        </span>
      </div>
      <span v-else class="dedsi-select-value" :class="{ 'dedsi-select-placeholder': isEmpty }">
        {{ displayLabel }}
      </span>
      <span class="dedsi-select-arrow">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </span>
    </div>
    <Teleport to="body">
      <div 
        v-if="isOpen" 
        class="dedsi-select-dropdown"
        :style="dropdownStyle"
      >
        <div 
          v-for="option in options" 
          :key="option.value"
          class="dedsi-select-option"
          :class="{ 'dedsi-select-option-selected': isSelected(option.value) }"
          @click="selectOption(option)"
        >
          {{ option.label }}
          <span v-if="isSelected(option.value)" class="dedsi-check-icon">✓</span>
        </div>
        <div v-if="options.length === 0" class="dedsi-select-empty">
          暂无数据
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number | (string | number)[] | undefined
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  mode?: 'default' | 'multiple'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  disabled: false,
  mode: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  (e: 'change', value: string | number | (string | number)[]): void
}>()

const isOpen = ref(false)
const selectorRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref<Record<string, string>>({})

const isEmpty = computed(() => {
  if (props.mode === 'multiple') {
    return !Array.isArray(props.modelValue) || props.modelValue.length === 0
  }
  return props.modelValue === undefined || props.modelValue === '' || props.modelValue === null
})

const displayLabel = computed(() => {
  if (isEmpty.value) return props.placeholder
  if (props.mode !== 'multiple') {
    const option = props.options.find(opt => opt.value === props.modelValue)
    return option?.label || props.modelValue
  }
  return props.placeholder // Should show tags instead
})

const getLabel = (val: string | number) => {
  return props.options.find(opt => opt.value === val)?.label || val
}

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      updateDropdownPosition()
    })
  }
}

const updateDropdownPosition = () => {
  if (selectorRef.value) {
    const rect = selectorRef.value.getBoundingClientRect()
    const dropdownHeight = 256
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow

    const style: Record<string, string> = {
      position: 'fixed',
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      zIndex: '2000'
    }

    if (showAbove) {
      style.bottom = `${window.innerHeight - rect.top + 4}px`
    } else {
      style.top = `${rect.bottom + 4}px`
    }

    dropdownStyle.value = style
  }
}

const handleWindowChange = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

const selectOption = (option: SelectOption) => {
  if (props.mode === 'multiple') {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = current.indexOf(option.value)
    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(option.value)
    }
    emit('update:modelValue', current)
    emit('change', current)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
  }
}

const isSelected = (value: string | number) => {
  if (props.mode === 'multiple' && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(value)
  }
  return props.modelValue === value
}

const removeTag = (e: Event, value: string | number) => {
  e.stopPropagation()
  if (props.mode === 'multiple' && Array.isArray(props.modelValue)) {
    const current = [...props.modelValue]
    const index = current.indexOf(value)
    if (index > -1) {
      current.splice(index, 1)
      emit('update:modelValue', current)
      emit('change', current)
    }
  }
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.dedsi-select') && !target.closest('.dedsi-select-dropdown')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleWindowChange, true)
  window.addEventListener('resize', handleWindowChange)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleWindowChange, true)
  window.removeEventListener('resize', handleWindowChange)
})
</script>

<style scoped>
.dedsi-select {
  display: inline-block;
  position: relative;
  width: 200px;
  vertical-align: middle;
}

.dedsi-select-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  min-height: 32px;
  background: var(--dedsi-bg-color);
  border: 1px solid var(--dedsi-border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.dedsi-select-selector:hover {
  border-color: var(--dedsi-primary-color);
}

.dedsi-select-open .dedsi-select-selector {
  border-color: var(--dedsi-primary-color);
  box-shadow: 0 0 0 2px var(--dedsi-primary-light);
}

.dedsi-select-disabled .dedsi-select-selector {
  background: var(--dedsi-bg-disabled);
  cursor: not-allowed;
  color: var(--dedsi-text-placeholder);
}

.dedsi-select-value {
  font-size: 14px;
  color: var(--dedsi-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.dedsi-select-placeholder {
  color: var(--dedsi-text-placeholder);
}

.dedsi-select-arrow {
  display: flex;
  align-items: center;
  color: var(--dedsi-text-placeholder);
  transition: transform 0.2s;
  margin-left: 8px;
}

.dedsi-select-open .dedsi-select-arrow {
  transform: rotate(180deg);
}

.dedsi-select-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
}

.dedsi-tag-item {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 0 4px;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0,0,0,0.88);
}

.dedsi-tag-close {
  margin-left: 4px;
  cursor: pointer;
  color: rgba(0,0,0,0.45);
  font-size: 14px;
}

.dedsi-tag-close:hover {
  color: rgba(0,0,0,0.88);
}
</style>

<style>
.dedsi-select-dropdown {
  background: var(--dedsi-bg-color);
  border: 1px solid var(--dedsi-border-color);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 256px;
  overflow-y: auto;
  min-width: 120px;
}

.dedsi-select-option {
  padding: 8px 12px;
  font-size: 14px;
  color: var(--dedsi-text-primary);
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dedsi-select-option:hover {
  background: var(--dedsi-bg-disabled);
}

.dedsi-select-option-selected {
  background: var(--dedsi-primary-light);
  font-weight: 500;
}

.dedsi-check-icon {
  color: var(--dedsi-primary-color);
  font-size: 12px;
}

.dedsi-select-empty {
  padding: 16px;
  text-align: center;
  color: var(--dedsi-text-placeholder);
  font-size: 14px;
}
</style>
