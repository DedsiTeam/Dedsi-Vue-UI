<template>
  <ul :class="menuClasses">
    <template v-for="item in items" :key="item.key">
      <DedsiMenuItem 
        v-if="!item.children" 
        :item="item"
        :selected="selectedKeys.includes(item.key)"
        @click="handleItemClick"
      />
      <DedsiSubMenu 
        v-else 
        :item="item"
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        :collapsed="collapsed"
        :mode="mode"
        @item-click="handleItemClick"
        @submenu-click="handleSubMenuClick"
      />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import DedsiMenuItem from './DedsiMenuItem.vue'
import DedsiSubMenu from './DedsiSubMenu.vue'

export interface MenuItem {
  key: string
  label: string
  icon?: any
  disabled?: boolean
  children?: MenuItem[]
}

interface Props {
  items: MenuItem[]
  mode?: 'vertical' | 'horizontal' | 'inline'
  theme?: 'light' | 'dark'
  selectedKeys?: string[]
  openKeys?: string[]
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'inline',
  theme: 'light',
  selectedKeys: () => [],
  openKeys: () => [],
  collapsed: false
})

const emit = defineEmits<{
  (e: 'update:selectedKeys', keys: string[]): void
  (e: 'update:openKeys', keys: string[]): void
  (e: 'click', item: MenuItem): void
}>()

const menuClasses = computed(() => [
  'dedsi-menu',
  `dedsi-menu-${props.mode}`,
  `dedsi-menu-${props.theme}`,
  props.collapsed && 'dedsi-menu-collapsed'
])

const handleItemClick = (item: MenuItem) => {
  if (item.disabled) return
  emit('update:selectedKeys', [item.key])
  emit('click', item)
}

const handleSubMenuClick = (key: string) => {
  const newOpenKeys = [...props.openKeys]
  const index = newOpenKeys.indexOf(key)
  
  if (index > -1) {
    newOpenKeys.splice(index, 1)
  } else {
    // 手风琴模式：如果是顶级菜单，则关闭其他已经打开的顶级菜单
    // 我们简单判断：如果当前点击的 key 在 items 的第一层，则清空 openKeys 再加入
    const isTopLevel = props.items.some(item => item.key === key)
    if (isTopLevel) {
      newOpenKeys.length = 0
    }
    newOpenKeys.push(key)
  }
  emit('update:openKeys', newOpenKeys)
}

// Provide theme and state to children
provide('menuTheme', computed(() => props.theme))
provide('menuMode', computed(() => props.mode))
provide('menuCollapsed', computed(() => props.collapsed))
</script>

<style scoped>
.dedsi-menu {
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--dedsi-bg-color, #fff);
  color: var(--dedsi-text-primary);
  line-height: normal;
  transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1);
  outline: none;
  font-size: 14px;
}

.dedsi-menu-horizontal {
  display: flex;
  border-bottom: 1px solid var(--dedsi-divider-color);
  position: relative;
}

.dedsi-menu-inline, .dedsi-menu-vertical {
  border-right: 1px solid var(--dedsi-divider-color);
}

.dedsi-menu-dark {
  background: #001529;
  color: rgba(255, 255, 255, 0.65);
}

.dedsi-menu-dark.dedsi-menu-inline, 
.dedsi-menu-dark.dedsi-menu-vertical {
  border-right: 0;
}

.dedsi-menu-collapsed {
  /* Let the parent logic or width prop control this */
}
</style>
