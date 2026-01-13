<template>
  <div 
    class="dedsi-dropdown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="triggerRef"
  >
    <div class="dedsi-dropdown-trigger" @click="handleClick">
      <slot></slot>
    </div>

    <Teleport to="body">
      <Transition name="dedsi-zoom-in-top">
        <div 
          v-if="visible"
          class="dedsi-dropdown-menu-wrapper"
          :style="dropdownStyle"
          @mouseenter="clearTimer"
          @mouseleave="handleMouseLeave"
        >
          <ul class="dedsi-dropdown-menu">
            <li 
              v-for="item in menu" 
              :key="item.key"
              class="dedsi-dropdown-menu-item"
              :class="{ 
                'dedsi-dropdown-menu-item-disabled': item.disabled,
                'dedsi-dropdown-menu-item-danger': item.danger,
                'dedsi-dropdown-menu-item-divider': item.type === 'divider'
              }"
              @click="handleItemClick(item)"
            >
              <template v-if="item.type === 'divider'">
                <div class="dedsi-dropdown-divider"></div>
              </template>
              <template v-else>
                <span v-if="item.icon" class="dedsi-dropdown-menu-item-icon">
                  <component :is="item.icon" />
                </span>
                <span class="dedsi-dropdown-menu-item-title">{{ item.label }}</span>
              </template>
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, nextTick, watch } from 'vue'

export interface DropdownMenuItem {
  key: string | number
  label?: string
  icon?: any
  disabled?: boolean
  danger?: boolean
  type?: 'item' | 'divider'
}

interface Props {
  menu: DropdownMenuItem[]
  trigger?: 'hover' | 'click'
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'hover',
  placement: 'bottomLeft',
  disabled: false
})

const emit = defineEmits<{
  (e: 'select', key: string | number): void
}>()

const visible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref<Record<string, string>>({})
let timer: any = null

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const handleMouseEnter = () => {
  if (props.disabled || props.trigger !== 'hover') return
  clearTimer()
  visible.value = true
}

const handleMouseLeave = () => {
  if (props.disabled || props.trigger !== 'hover') return
  timer = setTimeout(() => {
    visible.value = false
  }, 150)
}

const handleClick = () => {
  if (props.disabled || props.trigger !== 'click') return
  visible.value = !visible.value
}

const handleItemClick = (item: DropdownMenuItem) => {
  if (item.disabled || item.type === 'divider') return
  emit('select', item.key)
  visible.value = false
}

const updatePosition = () => {
  if (!triggerRef.value || !visible.value) return
  
  const rect = triggerRef.value.getBoundingClientRect()
  
  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: '2050',
    minWidth: `${rect.width}px`
  }

  // 计算位置逻辑 (简化版，仅支持下方排列)
  // 生产环境通常需要动态测量 dropdown 自身的宽高来做更精准的 placement
  
  nextTick(() => {
    style.left = `${rect.left}px`
    style.top = `${rect.bottom + 4}px`

    if (props.placement === 'bottomRight') {
      style.left = 'auto'
      style.right = `${window.innerWidth - rect.right}px`
    } else if (props.placement === 'bottomCenter') {
      style.transform = 'translateX(-50%)'
      style.left = `${rect.left + rect.width / 2}px`
    }

    dropdownStyle.value = style
  })
}

watch(visible, (val) => {
  if (val) {
    updatePosition()
    if (props.trigger === 'click') {
      document.addEventListener('click', handleClickOutside)
    }
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

const handleClickOutside = (e: MouseEvent) => {
  if (triggerRef.value && !triggerRef.value.contains(e.target as Node)) {
    visible.value = false
  }
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dedsi-dropdown {
  display: inline-block;
}

.dedsi-dropdown-trigger {
  cursor: pointer;
}

.dedsi-dropdown-menu-wrapper {
  background: var(--dedsi-bg-color, #fff);
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 4px;
  min-width: 120px;
}

.dedsi-dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dedsi-dropdown-menu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--dedsi-text-primary);
  font-size: 14px;
}

.dedsi-dropdown-menu-item:hover:not(.dedsi-dropdown-menu-item-disabled) {
  background: var(--dedsi-bg-secondary, #fafafa);
}

.dedsi-dropdown-menu-item-disabled {
  color: var(--dedsi-text-disabled);
  cursor: not-allowed;
}

.dedsi-dropdown-menu-item-danger {
  color: var(--dedsi-danger-color);
}

.dedsi-dropdown-menu-item-danger:hover:not(.dedsi-dropdown-menu-item-disabled) {
  background: rgba(255, 77, 79, 0.05);
}

.dedsi-dropdown-menu-item-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.dedsi-dropdown-divider {
  height: 1px;
  background: var(--dedsi-divider-color, #f0f0f0);
  margin: 4px 0;
}

/* Animations */
.dedsi-zoom-in-top-enter-active,
.dedsi-zoom-in-top-leave-active {
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: top center;
}

.dedsi-zoom-in-top-enter-from,
.dedsi-zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
