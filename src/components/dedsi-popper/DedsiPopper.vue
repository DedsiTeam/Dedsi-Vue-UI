<template>
  <div 
    class="dedsi-popper-wrapper" 
    ref="triggerRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <slot />
    
    <Teleport to="body">
      <transition :name="transitionName">
        <div 
          v-if="visible" 
          ref="popperRef"
          :class="['dedsi-popper', popperClass, `is-${placement}`]"
          :style="[popperStyle, customStyle]"
          @mouseenter="handlePopperMouseEnter"
          @mouseleave="handlePopperMouseLeave"
          @click.stop
        >
          <div v-if="showArrow" class="dedsi-popper-arrow"></div>
          <slot name="content" />
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, watch, computed } from 'vue'

interface Props {
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  trigger?: 'hover' | 'click'
  disabled?: boolean
  offset?: number
  transitionName?: string
  popperClass?: string
  showArrow?: boolean
  // 新增样式 Props
  background?: string
  color?: string
  borderRadius?: string
  boxShadow?: string
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  trigger: 'hover',
  disabled: false,
  offset: 12,
  transitionName: 'dedsi-popper-fade',
  showArrow: true,
  background: '#fff',
  borderRadius: '8px',
  padding: '12px'
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const visible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const coordsStyle = ref<Record<string, string>>({})
let timer: any = null

const customStyle = computed(() => ({
  '--dedsi-popper-bg': props.background,
  backgroundColor: props.background,
  color: props.color,
  borderRadius: props.borderRadius,
  boxShadow: props.boxShadow,
  padding: props.padding
}))

const popperStyle = computed(() => ({
  ...coordsStyle.value
}))

const updatePosition = () => {
  if (!triggerRef.value || !popperRef.value) return
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popperRect = popperRef.value.getBoundingClientRect()
  
  let top = 0
  let left = 0
  const offset = props.offset

  switch (props.placement) {
    case 'top':
      top = triggerRect.top - popperRect.height - offset
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'top-start':
      top = triggerRect.top - popperRect.height - offset
      left = triggerRect.left
      break
    case 'top-end':
      top = triggerRect.top - popperRect.height - offset
      left = triggerRect.right - popperRect.width
      break
    case 'bottom':
      top = triggerRect.bottom + offset
      left = triggerRect.left + (triggerRect.width - popperRect.width) / 2
      break
    case 'bottom-start':
      top = triggerRect.bottom + offset
      left = triggerRect.left
      break
    case 'bottom-end':
      top = triggerRect.bottom + offset
      left = triggerRect.right - popperRect.width
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.left - popperRect.width - offset
      break
    case 'left-start':
      top = triggerRect.top
      left = triggerRect.left - popperRect.width - offset
      break
    case 'left-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.left - popperRect.width - offset
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - popperRect.height) / 2
      left = triggerRect.right + offset
      break
    case 'right-start':
      top = triggerRect.top
      left = triggerRect.right + offset
      break
    case 'right-end':
      top = triggerRect.bottom - popperRect.height
      left = triggerRect.right + offset
      break
  }

  coordsStyle.value = {
    top: `${top + window.scrollY}px`,
    left: `${left + window.scrollX}px`
  }
}

const handleMouseEnter = () => {
  if (props.disabled || props.trigger !== 'hover') return
  if (timer) clearTimeout(timer)
  visible.value = true
  nextTick(updatePosition)
}

const handleMouseLeave = () => {
  if (props.disabled || props.trigger !== 'hover') return
  timer = setTimeout(() => {
    visible.value = false
  }, 200)
}

const handlePopperMouseEnter = () => {
  if (props.trigger === 'hover' && timer) {
    clearTimeout(timer)
  }
}

const handlePopperMouseLeave = () => {
  if (props.trigger === 'hover') {
    handleMouseLeave()
  }
}

const handleClick = () => {
  if (props.disabled || props.trigger !== 'click') return
  visible.value = !visible.value
  if (visible.value) {
    nextTick(updatePosition)
  }
}

const handleClickOutside = (e: MouseEvent) => {
  if (props.trigger === 'click' && visible.value && triggerRef.value && !triggerRef.value.contains(e.target as Node) && popperRef.value && !popperRef.value.contains(e.target as Node)) {
    visible.value = false
  }
}

const close = () => {
  visible.value = false
}

watch(visible, (val) => {
  emit('update:visible', val)
})

defineExpose({
  close,
  updatePosition
})

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)
})
</script>

<style scoped>
.dedsi-popper-wrapper {
  display: inline-block;
}

.dedsi-popper-fade-enter-active,
.dedsi-popper-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dedsi-popper-fade-enter-from,
.dedsi-popper-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.dedsi-popper {
  position: absolute;
  z-index: 3000;
}

.dedsi-popper-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
  z-index: 1;
}

.is-top .dedsi-popper-arrow,
.is-top-start .dedsi-popper-arrow,
.is-top-end .dedsi-popper-arrow {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0 6px;
  border-top-color: var(--dedsi-popper-bg);
}

.is-bottom .dedsi-popper-arrow,
.is-bottom-start .dedsi-popper-arrow,
.is-bottom-end .dedsi-popper-arrow {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 6px 6px 6px;
  border-bottom-color: var(--dedsi-popper-bg);
}

.is-left .dedsi-popper-arrow,
.is-left-start .dedsi-popper-arrow,
.is-left-end .dedsi-popper-arrow {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 0 6px 6px;
  border-left-color: var(--dedsi-popper-bg);
}

.is-right .dedsi-popper-arrow,
.is-right-start .dedsi-popper-arrow,
.is-right-end .dedsi-popper-arrow {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 6px 6px 0;
  border-right-color: var(--dedsi-popper-bg);
}

.is-top-start .dedsi-popper-arrow,
.is-bottom-start .dedsi-popper-arrow { left: 16px; transform: none; }
.is-top-end .dedsi-popper-arrow,
.is-bottom-end .dedsi-popper-arrow { left: auto; right: 16px; transform: none; }

.is-left-start .dedsi-popper-arrow,
.is-right-start .dedsi-popper-arrow { top: 16px; transform: none; }
.is-left-end .dedsi-popper-arrow,
.is-right-end .dedsi-popper-arrow { top: auto; bottom: 16px; transform: none; }
</style>


