<template>
  <div 
    class="dedsi-marquee" 
    ref="containerRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="dedsi-marquee-content" 
      ref="contentRef"
      :style="contentStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

interface Props {
  speed?: number // 像素每秒 (px/s)
  direction?: 'ltr' | 'rtl'
  pauseOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speed: 50,
  direction: 'rtl',
  pauseOnHover: true
})

const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const duration = ref(0)
const isPaused = ref(false)
const distance = ref(0)

const calculateAnimation = () => {
  if (!containerRef.value || !contentRef.value) return

  const containerWidth = containerRef.value.offsetWidth
  const contentWidth = contentRef.value.scrollWidth
  
  // 计算总移动距离：从右侧进入到从左侧完全离开
  // 距离 = 容器宽 (起点在右侧外) + 内容宽 (终点在左侧外)
  distance.value = containerWidth + contentWidth
  
  // 根据速度计算时长 (t = s / v)
  duration.value = distance.value / props.speed
}

const contentStyle = computed(() => {
  if (duration.value === 0) return {}

  const animName = `dedsi-marquee-loop-${props.direction}`
  return {
    animationName: animName,
    animationDuration: `${duration.value}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationPlayState: isPaused.value ? 'paused' : 'running',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    paddingLeft: '100%' // 初始状态内容在容器右侧边缘
  }
})

const handleMouseEnter = () => {
  if (props.pauseOnHover) isPaused.value = true
}

const handleMouseLeave = () => {
  isPaused.value = false
}

// 注入动态 Keyframes
const updateKeyframes = () => {
  const styleId = 'dedsi-marquee-keyframes'
  let styleEl = document.getElementById(styleId) as HTMLStyleElement
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = styleId
    document.head.appendChild(styleEl)
  }

  // 我们使用 padding-left: 100% 让内容起始在右侧
  // 所以 transform 需要从 0 (右侧边缘) 移动到 -(100% + contentWidth)
  styleEl.innerHTML = `
    @keyframes dedsi-marquee-loop-rtl {
      from { transform: translateX(0); }
      to { transform: translateX(-100%); }
    }
    @keyframes dedsi-marquee-loop-ltr {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `
}

watch([() => props.speed, () => props.direction], () => {
  calculateAnimation()
  updateKeyframes()
})

onMounted(() => {
  nextTick(() => {
    calculateAnimation()
    updateKeyframes()
    window.addEventListener('resize', calculateAnimation)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateAnimation)
})
</script>

<style scoped>
.dedsi-marquee {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  background: transparent;
}

.dedsi-marquee-content {
  display: inline-block;
  will-change: transform;
}
</style>
