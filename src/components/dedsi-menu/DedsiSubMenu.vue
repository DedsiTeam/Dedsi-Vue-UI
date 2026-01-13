<template>
  <li 
    :class="submenuClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="dedsi-submenu-title" 
      :data-menu-key="item.key"
      @click.stop="handleTitleClick"
    >
      <span v-if="!showTitle" class="dedsi-menu-item-icon">
        <component :is="item.icon" />
      </span>
      <template v-else>
        <span v-if="item.icon" class="dedsi-menu-item-icon">
          <component :is="item.icon" />
        </span>
        <span class="dedsi-menu-item-title">{{ item.label }}</span>
        <span class="dedsi-submenu-arrow" :class="{ 'dedsi-submenu-arrow-open': isOpen || (mode === 'horizontal' && hoverOpen) }">
          <DownOutlined />
        </span>
      </template>
    </div>
    
    <Teleport to="body" :disabled="!isPopup">
      <Transition 
        :name="isPopup ? 'dedsi-fade' : 'dedsi-submenu-expand'"
        @enter="onEnter"
        @leave="onLeave"
      >
        <ul 
          v-if="shouldShowSubMenu" 
          ref="subMenuRef"
          class="dedsi-menu-sub" 
          :class="[
            `dedsi-menu-sub-${mode}`, 
            `dedsi-menu-sub-${currentTheme}`,
            isMenuCollapsed && 'dedsi-menu-sub-vertical-popup',
            isPopup && 'dedsi-menu-sub-popup'
          ]"
          :style="popupStyle"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <template v-for="child in item.children" :key="child.key">
            <DedsiMenuItem 
              v-if="!child.children"
              :item="child"
              :selected="selectedKeys.includes(child.key)"
              :level="level + 1"
              @click="handleItemClick"
            />
            <DedsiSubMenu 
              v-else
              :item="child"
              :selected-keys="selectedKeys"
              :open-keys="openKeys"
              :collapsed="collapsed"
              :mode="mode"
              :level="level + 1"
              @item-click="handleItemClick"
              @submenu-click="$emit('submenu-click', $event)"
            />
          </template>
        </ul>
      </Transition>
    </Teleport>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, nextTick, onUnmounted, type ComputedRef } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import DedsiMenuItem from './DedsiMenuItem.vue'

interface Props {
  item: any
  selectedKeys: string[]
  openKeys: string[]
  collapsed: boolean
  mode: string
  level?: number
}

const props = withDefaults(defineProps<Props>(), {
  level: 1
})

const emit = defineEmits(['item-click', 'submenu-click', 'update:openKeys'])

const theme = inject<ComputedRef<string>>('menuTheme')
const currentTheme = computed(() => theme?.value || 'light')
const isCollapsed = inject<ComputedRef<boolean>>('menuCollapsed')
const hoverOpen = ref(false)
const subMenuRef = ref<HTMLElement | null>(null)
const popupStyle = ref<Record<string, string>>({})

const isMenuCollapsed = computed(() => isCollapsed?.value ?? false)

const showTitle = computed(() => {
  if (props.mode === 'horizontal') return true
  if (!isMenuCollapsed.value) return true
  return props.level > 1
})

const isPopup = computed(() => props.mode === 'horizontal' || isMenuCollapsed.value)

const shouldShowSubMenu = computed(() => {
  if (isPopup.value) return hoverOpen.value
  return isOpen.value && !isMenuCollapsed.value
})

const isOpen = computed(() => props.openKeys.includes(props.item.key))

const submenuClasses = computed(() => [
  'dedsi-submenu',
  isOpen.value && 'dedsi-submenu-open',
  isMenuCollapsed.value && 'dedsi-submenu-collapsed',
  `dedsi-submenu-${theme?.value || 'light'}`
])

const handleTitleClick = () => {
  if (props.collapsed || props.mode === 'horizontal') return
  emit('submenu-click', props.item.key)
}

let hoverTimer: any = null

const handleMouseEnter = () => {
  if (!isPopup.value) return
  
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
  
  hoverOpen.value = true
  nextTick(() => {
    calculatePlacement()
  })
}

const handleMouseLeave = () => {
  if (!isPopup.value) return
  
  hoverTimer = setTimeout(() => {
    hoverOpen.value = false
    popupStyle.value = {}
    hoverTimer = null
  }, 200)
}

onUnmounted(() => {
  if (hoverTimer) clearTimeout(hoverTimer)
})

const calculatePlacement = () => {
  if (!subMenuRef.value) return
  
  // 获取触发器的位置
  const triggerEl = document.querySelector(`[data-menu-key="${props.item.key}"]`) || 
                    subMenuRef.value.parentElement?.querySelector('.dedsi-submenu-title')
  
  // 如果找不到触发器，我们回退到相对定位（虽然 teleport 之后会有问题）
  const triggerRect = triggerEl?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0, right: 0, bottom: 0 }
  
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: '2000'
  }

  // 临时渲染以测量尺寸
  const rect = subMenuRef.value.getBoundingClientRect()

  if (props.mode === 'horizontal' && props.level === 1) {
    // 顶级横向：放在触发器下方
    style.top = `${triggerRect.bottom}px`
    style.left = `${triggerRect.left}px`
    style.maxHeight = `${viewportHeight - triggerRect.bottom - 10}px`
    
    // 边界检查
    if (triggerRect.left + rect.width > viewportWidth) {
      style.left = 'auto'
      style.right = '0px'
    }
  } else {
    // 侧边或嵌套：放在触发器右侧
    style.left = `${triggerRect.right}px`
    
    // 垂直定位与自适应高度
    if (triggerRect.top + 200 > viewportHeight) {
      // 如果触发器位置靠下，向上对齐并限制高度
      style.bottom = `${viewportHeight - triggerRect.bottom}px`
      style.maxHeight = `${triggerRect.bottom - 10}px`
    } else {
      style.top = `${triggerRect.top}px`
      style.maxHeight = `${viewportHeight - triggerRect.top - 10}px`
    }
    
    // 边界检查
    if (triggerRect.right + rect.width > viewportWidth) {
      style.left = `${triggerRect.left - rect.width}px`
    }
  }
  
  popupStyle.value = style
}

const handleItemClick = (item: any) => {
  emit('item-click', item)
  if (props.mode === 'horizontal' || isMenuCollapsed.value) {
    hoverOpen.value = false
  }
}

// Height Transitions
const onEnter = (el: any) => {
  if (isPopup.value) return
  el.style.height = '0'
  el.offsetHeight // trigger reflow
  el.style.height = el.scrollHeight + 'px'
}

const onLeave = (el: any) => {
  if (isPopup.value) return
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight
  el.style.height = '0'
}
</script>

<style scoped>
.dedsi-submenu {
  list-style: none;
  position: relative;
}

.dedsi-submenu-title {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  margin: 4px 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dedsi-submenu-collapsed .dedsi-submenu-title {
  justify-content: center;
  padding: 0;
}

.dedsi-submenu-collapsed .dedsi-menu-item-icon {
  margin-right: 0;
}

.dedsi-submenu-title:hover {
  color: var(--dedsi-primary-color);
}

.dedsi-menu-item-icon {
  min-width: 14px;
  margin-right: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.dedsi-menu-item-title {
  flex: 1;
}

.dedsi-submenu-arrow {
  font-size: 10px;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dedsi-submenu-arrow-open {
  transform: rotate(180deg);
}

.dedsi-menu-sub {
  margin: 0;
  padding: 0;
  background: var(--dedsi-bg-secondary, #fafafa);
  overflow-x: hidden;
  overflow-y: auto;
  transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dedsi-menu-sub::-webkit-scrollbar {
  width: 4px;
}

.dedsi-menu-sub::-webkit-scrollbar-thumb {
  background: var(--dedsi-border-color);
  border-radius: 2px;
}

.dedsi-submenu-dark .dedsi-menu-sub {
  background: #000c17;
}

.dedsi-submenu-dark {
  color: rgba(255, 255, 255, 0.65);
}

.dedsi-submenu-dark:hover {
  color: #fff;
}

/* Horizontal Submenu Styles */
.dedsi-submenu-horizontal {
  position: relative;
}

.dedsi-submenu-horizontal .dedsi-submenu-title {
  height: 46px;
  line-height: 46px;
  margin: 0;
  padding: 0 20px;
}

.dedsi-menu-sub-horizontal {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  z-index: 1050;
  background: var(--dedsi-bg-color, #fff);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 0;
  padding: 4px 0 !important;
  height: auto !important;
}

/* 嵌套子菜单在水平模式下向右侧弹出，防止堆叠 */
.dedsi-submenu-horizontal .dedsi-submenu .dedsi-menu-sub-horizontal {
  top: 0;
  left: 100%;
  margin-left: 0;
}

.dedsi-submenu-dark .dedsi-menu-sub-horizontal {
  background: #001529;
}

/* 折叠/垂直模式下的悬浮子菜单 */
.dedsi-menu-sub-vertical-popup {
  position: absolute;
  top: 0;
  left: 100%;
  min-width: 160px;
  z-index: 1050;
  background: var(--dedsi-bg-color, #fff);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 0;
  padding: 4px 0 !important;
  height: auto !important;
  margin-left: 0;
}

.dedsi-submenu-dark .dedsi-menu-sub-vertical-popup {
  background: #001529;
}

/* Teleported Popup Styles */
.dedsi-menu-sub-popup {
  position: fixed;
  margin: 0;
  box-shadow: 0 6px 16px 1px rgba(0, 0, 0, 0.15);
  border-radius: 0;
  background: var(--dedsi-bg-color, #fff);
  padding: 4px 0;
  min-width: 160px;
  visibility: visible !important;
  opacity: 1;
  overflow-y: auto;
}

.dedsi-menu-sub-dark.dedsi-menu-sub-popup {
  background: #001529;
  color: rgba(255, 255, 255, 0.65);
}

/* Animations */
.dedsi-submenu-expand-enter-active,
.dedsi-submenu-expand-leave-active {
  transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dedsi-fade-enter-active,
.dedsi-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dedsi-fade-enter-from,
.dedsi-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
