<template>
  <div v-if="loading" class="dedsi-skeleton" :class="{ 'dedsi-skeleton-active': active }">
    <!-- 组合型骨架屏 -->
    <div v-if="avatar || title || paragraph" class="dedsi-skeleton-content">
      <div v-if="avatar" class="dedsi-skeleton-avatar-wrap">
        <div 
          class="dedsi-skeleton-avatar" 
          :style="avatarStyle"
          :class="[`dedsi-skeleton-avatar-${avatarShape}`]"
        ></div>
      </div>
      <div class="dedsi-skeleton-data">
        <div v-if="title" class="dedsi-skeleton-title" :style="titleStyle"></div>
        <ul v-if="paragraph" class="dedsi-skeleton-paragraph">
          <li 
            v-for="(rowWidth, index) in rowsWidthArray" 
            :key="index" 
            :style="{ width: rowWidth }"
          ></li>
        </ul>
      </div>
    </div>
    <!-- 基础节点型骨架屏 -->
    <slot v-else></slot>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  loading?: boolean
  active?: boolean // 是否有闪烁动画
  avatar?: boolean
  avatarSize?: number | 'small' | 'large' | 'default'
  avatarShape?: 'circle' | 'square'
  title?: boolean
  titleWidth?: number | string
  paragraph?: boolean | { rows: number; width?: string | number | (string | number)[] }
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
  active: true,
  avatar: false,
  avatarSize: 'default',
  avatarShape: 'circle',
  title: true,
  paragraph: true
})

const avatarStyle = computed(() => {
  if (typeof props.avatarSize === 'number') {
    return {
      width: `${props.avatarSize}px`,
      height: `${props.avatarSize}px`,
      lineHeight: `${props.avatarSize}px`
    }
  }
  return {}
})

const titleStyle = computed(() => {
  const width = typeof props.titleWidth === 'number' ? `${props.titleWidth}px` : props.titleWidth
  return { width: width || '38%' }
})

const rowsWidthArray = computed(() => {
  const p = props.paragraph
  if (p === false) return []
  
  const rows = typeof p === 'object' ? p.rows : 3
  const widths = typeof p === 'object' ? p.width : undefined
  
  return Array.from({ length: rows }).map((_, index) => {
    if (Array.isArray(widths)) {
      return typeof widths[index] === 'number' ? `${widths[index]}px` : widths[index]
    }
    if (widths) {
      return typeof widths === 'number' ? `${widths}px` : widths
    }
    // 默认最后一行短一点
    return index === rows - 1 && rows > 1 ? '61%' : '100%'
  })
})
</script>

<style scoped>
.dedsi-skeleton {
  width: 100%;
}

.dedsi-skeleton-content {
  display: flex;
  width: 100%;
}

.dedsi-skeleton-avatar-wrap {
  flex-shrink: 0;
  padding-right: 16px;
}

.dedsi-skeleton-avatar {
  background: var(--dedsi-divider-color, rgba(0, 0, 0, 0.12));
  width: 32px;
  height: 32px;
  display: block;
}

.dedsi-skeleton-avatar-default { width: 32px; height: 32px; }
.dedsi-skeleton-avatar-small { width: 24px; height: 24px; }
.dedsi-skeleton-avatar-large { width: 40px; height: 40px; }
.dedsi-skeleton-avatar-circle { border-radius: 50%; }

.dedsi-skeleton-data {
  flex: 1;
  min-width: 0;
}

.dedsi-skeleton-title {
  width: 38%;
  height: 16px;
  margin-bottom: 24px;
  background: var(--dedsi-divider-color, rgba(0, 0, 0, 0.12));
  border-radius: 4px;
}

.dedsi-skeleton-avatar-wrap + .dedsi-skeleton-data .dedsi-skeleton-title {
  margin-top: 4px;
}

.dedsi-skeleton-paragraph {
  padding: 0;
  margin: 0;
  list-style: none;
}

.dedsi-skeleton-paragraph li {
  width: 100%;
  height: 16px;
  background: var(--dedsi-divider-color, rgba(0, 0, 0, 0.12));
  border-radius: 4px;
}

.dedsi-skeleton-paragraph li + li {
  margin-top: 12px;
}

/* 动画效果 */
@keyframes dedsi-skeleton-loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.dedsi-skeleton-active .dedsi-skeleton-avatar,
.dedsi-skeleton-active .dedsi-skeleton-title,
.dedsi-skeleton-active .dedsi-skeleton-paragraph li {
  position: relative;
  overflow: hidden;
}

.dedsi-skeleton-active .dedsi-skeleton-avatar::after,
.dedsi-skeleton-active .dedsi-skeleton-title::after,
.dedsi-skeleton-active .dedsi-skeleton-paragraph li::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: dedsi-skeleton-loading 1.5s infinite;
  content: "";
}
</style>
