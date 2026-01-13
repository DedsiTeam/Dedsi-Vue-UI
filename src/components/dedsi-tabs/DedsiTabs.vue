<template>
  <div class="dedsi-tabs" :class="[`dedsi-tabs--${type}`]">
    <div class="dedsi-tabs__header">
      <div 
        v-for="pane in panes" 
        :key="pane.name"
        :ref="el => { if (el) tabRefs[pane.name] = el as HTMLElement }"
        class="dedsi-tabs__item"
        :class="{ 
          'is-active': activeName === pane.name,
          'is-disabled': pane.disabled,
          'is-closable': pane.closable
        }"
        @click="handleTabClick(pane)"
      >
        {{ pane.label }}
        <span 
          v-if="type === 'editable-card' && activeName === pane.name" 
          class="dedsi-tabs__icon-btn dedsi-tabs__refresh-icon"
          title="刷新"
          @click.stop="handleTabRefresh(pane)"
        >
          <ReloadOutlined />
        </span>
        <span 
          v-if="type === 'editable-card' && pane.closable" 
          class="dedsi-tabs__icon-btn dedsi-tabs__close-icon"
          @click.stop="handleTabRemove(pane.name)"
        >×</span>
      </div>
      <div v-if="type === 'line'" class="dedsi-tabs__active-bar" :style="barStyle"></div>
      <div class="dedsi-tabs__extra" v-if="$slots.extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="dedsi-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, onMounted, nextTick } from 'vue'
import { ReloadOutlined } from '@ant-design/icons-vue'

interface Props {
  modelValue?: string | number
  activeKey?: string | number // Compatibility alias
  type?: 'line' | 'card' | 'editable-card'
  hideAdd?: boolean
  size?: 'default' | 'small'
  tabBarGutter?: number
}

interface Pane {
  name: string | number
  label: string
  disabled: boolean
  closable: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  activeKey: undefined,
  type: 'line',
  hideAdd: false,
  size: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', name: string | number): void
  (e: 'update:activeKey', name: string | number): void
  (e: 'tab-click', name: string | number): void
  (e: 'change', name: string | number): void
  (e: 'refresh', name: string | number): void
  (e: 'edit', targetKey: string | number, action: 'add' | 'remove'): void
}>()

const activeName = ref(props.modelValue ?? props.activeKey)
const panes = ref<Pane[]>([])
const tabRefs = ref<Record<string | number, HTMLElement>>({})
const barStyle = ref({
  width: '0px',
  transform: 'translateX(0px)'
})

const updateBar = () => {
  if (props.type !== 'line') return
  nextTick(() => {
    const activeEl = tabRefs.value[activeName.value as string | number]
    if (activeEl) {
      barStyle.value = {
        width: `${activeEl.offsetWidth}px`,
        transform: `translateX(${activeEl.offsetLeft}px)`
      }
    }
  })
}

provide('tabsContext', {
  activeName,
  registerPane: (pane: Pane) => {
    const existing = panes.value.find(p => p.name === pane.name)
    if (!existing) {
      panes.value.push(pane)
      nextTick(updateBar)
    } else {
      // Update existing if needed
      Object.assign(existing, pane)
    }
  },
  unregisterPane: (name: string | number) => {
    const index = panes.value.findIndex(p => p.name === name)
    if (index !== -1) {
      panes.value.splice(index, 1)
      nextTick(updateBar)
    }
  }
})

watch(() => props.modelValue, (val) => {
  if (val !== undefined) activeName.value = val
  updateBar()
})

watch(() => props.activeKey, (val) => {
  if (val !== undefined) activeName.value = val
  updateBar()
})

watch(activeName, (val) => {
    emit('update:modelValue', val as string | number)
    emit('update:activeKey', val as string | number)
    emit('change', val as string | number)
})

const handleTabClick = (pane: Pane) => {
  if (pane.disabled || activeName.value === pane.name) return
  activeName.value = pane.name
  emit('tab-click', pane.name)
  updateBar()
}

const handleTabRefresh = (pane: Pane) => {
  emit('refresh', pane.name)
}

const handleTabRemove = (name: string | number) => {
  emit('edit', name, 'remove')
}

onMounted(() => {
  updateBar()
})
</script>

<style scoped>
.dedsi-tabs {
  width: 100%;
}

.dedsi-tabs__header {
  display: flex;
  margin-bottom: 16px;
  position: relative;
}

.dedsi-tabs--line .dedsi-tabs__header {
  border-bottom: 2px solid var(--dedsi-divider-color);
}

.dedsi-tabs__item {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--dedsi-text-secondary);
  cursor: pointer;
  transition: color 0.3s, background 0.3s;
  position: relative;
  user-select: none;
  display: flex;
  align-items: center;
}

.dedsi-tabs__item:hover:not(.is-disabled) {
  color: var(--dedsi-primary-color);
}

.dedsi-tabs__item.is-active {
  color: var(--dedsi-primary-color);
}

.dedsi-tabs__item.is-disabled {
  color: var(--dedsi-text-disabled);
  cursor: not-allowed;
}

.dedsi-tabs__active-bar {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background-color: var(--dedsi-primary-color);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), 
              width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1;
}

.dedsi-tabs__content {
  color: var(--dedsi-text-primary);
}

/* Editable Card Style */
.dedsi-tabs--editable-card .dedsi-tabs__header {
  border-bottom: 1px solid #e8e8e8;
  background: #f5f5f5;
  padding: 4px 4px 0;
  gap: 4px;
}

.dedsi-tabs--editable-card .dedsi-tabs__item {
  border: 1px solid #e8e8e8;
  background: #fafafa;
  margin-right: 2px;
  border-radius: 4px 4px 0 0;
  padding: 8px 16px;
  border-bottom: none;
  height: 32px;
  line-height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}

.dedsi-tabs--editable-card .dedsi-tabs__item.is-active {
  background: #fff;
  color: var(--dedsi-primary-color);
  font-weight: 600;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
}

.dedsi-tabs__icon-btn {
  font-size: 12px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  color: #999;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dedsi-tabs__refresh-icon {
  margin-left: 8px;
}

.dedsi-tabs__refresh-icon:hover {
  background: rgba(0, 0, 0, 0.1);
  color: var(--dedsi-primary-color);
}

.dedsi-tabs__close-icon {
  margin-left: 4px;
}

.dedsi-tabs__close-icon:hover {
  background: #ff4d4f;
  color: #fff;
}

.dedsi-tabs__extra {
  margin-left: auto;
  display: flex;
  align-items: center;
  padding: 0 12px;
}
</style>
