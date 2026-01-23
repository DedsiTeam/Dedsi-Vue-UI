<template>
  <li 
    :class="itemClasses"
    :style="itemStyle"
    @click.stop="handleClick"
    :title="item.label"
  >
    <span v-if="item.icon" class="dedsi-menu-item-icon">
      <component :is="item.icon" />
    </span>
    <span v-if="showTitle" class="dedsi-menu-item-title">{{ item.label }}</span>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'

const props = withDefaults(defineProps<{
  item: any
  selected: boolean
  level?: number
}>(), {
  level: 1
})

const emit = defineEmits(['click'])

const theme = inject<ComputedRef<string>>('menuTheme')
const mode = inject<ComputedRef<string>>('menuMode')
const collapsed = inject<ComputedRef<boolean>>('menuCollapsed')

const isMenuCollapsed = computed(() => collapsed?.value ?? false)
const showTitle = computed(() => {
  if (mode?.value === 'horizontal') return true
  if (!isMenuCollapsed.value) return true
  return props.level > 1
})

const itemClasses = computed(() => [
  'dedsi-menu-item',
  props.selected && 'dedsi-menu-item-selected',
  props.item.disabled && 'dedsi-menu-item-disabled',
  isMenuCollapsed.value && 'dedsi-menu-item-collapsed',
  `dedsi-menu-item-${theme?.value || 'light'}`,
  `dedsi-menu-item-${mode?.value || 'inline'}`
])

const itemStyle = computed(() => {
  if (mode?.value !== 'inline' || isMenuCollapsed.value) return {}
  return { paddingLeft: `${20 + (props.level - 1) * 24}px` }
})

const handleClick = () => {
  if (props.item.disabled) return
  emit('click', props.item)
}
</script>

<style scoped>
.dedsi-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  margin: 4px 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dedsi-menu-item-horizontal {
  margin: 0;
  height: 46px;
  line-height: 46px;
}

.dedsi-menu-item:hover:not(.dedsi-menu-item-disabled) {
  color: var(--dedsi-primary-color);
}

.dedsi-menu-item-selected {
  background-color: var(--dedsi-primary-light, #e6f7ff);
  color: var(--dedsi-primary-color);
  margin: 4px;
  border-radius: 6px;
  box-sizing: border-box;
}

/* Vertical/Inline selected bar removed by user request */
/* .dedsi-menu-item-selected::after styles removed */

.dedsi-menu-item-horizontal.dedsi-menu-item-selected::after {
  top: auto;
  left: 0;
  right: 0;
  bottom: 0;
  border-right: 0;
  border-bottom: 2px solid var(--dedsi-primary-color);
  transform: scaleX(1);
}

/* Dark Theme */
.dedsi-menu-item-dark {
  color: rgba(255, 255, 255, 0.65);
}
.dedsi-menu-item-dark:hover:not(.dedsi-menu-item-disabled) {
  color: #fff;
}
.dedsi-menu-item-dark.dedsi-menu-item-selected {
  background-color: var(--dedsi-primary-color);
  color: #fff;
  margin: 4px;
  border-radius: 6px;
  box-sizing: border-box;
}

.dedsi-menu-item-icon {
  min-width: 14px;
  margin-right: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: margin 0.3s;
}

.dedsi-menu-item-collapsed .dedsi-menu-item-icon {
  margin-right: 0;
}

.dedsi-menu-item-collapsed {
  justify-content: center;
  padding: 0;
}

.dedsi-menu-item-disabled {
  color: var(--dedsi-text-disabled) !important;
  cursor: not-allowed;
  background: none !important;
}

.dedsi-menu-item-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
