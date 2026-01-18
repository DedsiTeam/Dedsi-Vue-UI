<template>
  <div class="dedsi-result" :class="resultClass">
    <div class="dedsi-result-icon">
      <slot name="icon">
        <component :is="iconComponent" v-if="iconComponent" class="custom-icon" />
        <div v-else class="default-icon">
          <!-- Success Icon -->
          <svg v-if="type === 'success'" viewBox="0 0 72 72" width="72" height="72">
            <circle cx="36" cy="36" r="36" fill="#52c41a" />
            <path
              fill="#fff"
              d="M30.8 48l-13.2-13.2 3.6-3.6 9.6 9.6 20.4-20.4 3.6 3.6z"
            />
          </svg>
          <!-- Error Icon -->
          <svg v-else-if="type === 'error'" viewBox="0 0 72 72" width="72" height="72">
            <circle cx="36" cy="36" r="36" fill="#ff4d4f" />
            <path
              fill="#fff"
              d="M34 22h4v18h-4zM34 46h4v4h-4z"
            />
          </svg>
          <!-- Info Icon -->
          <svg v-else-if="type === 'info'" viewBox="0 0 72 72" width="72" height="72">
            <circle cx="36" cy="36" r="36" fill="#1890ff" />
            <path
              fill="#fff"
              d="M34 20h4v4h-4zM34 30h4v22h-4z"
            />
          </svg>
          <!-- Warning Icon -->
          <svg v-else-if="type === 'warning'" viewBox="0 0 72 72" width="72" height="72">
            <circle cx="36" cy="36" r="36" fill="#faad14" />
            <path
              fill="#fff"
              d="M34 20h4v18h-4zM34 44h4v4h-4z"
            />
          </svg>
          <!-- 404 Icon -->
          <svg v-else-if="type === '404'" viewBox="0 0 72 72" width="72" height="72">
            <circle cx="36" cy="36" r="36" fill="#1890ff" />
            <text x="36" y="46" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">404</text>
          </svg>
          <!-- 403 Icon -->
          <svg v-else-if="type === '403'" viewBox="0 0 72 72" width="72" height="72">
            <circle cx="36" cy="36" r="36" fill="#faad14" />
            <text x="36" y="46" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">403</text>
          </svg>
          <!-- 500 Icon -->
          <svg v-else-if="type === '500'" viewBox="0 0 72 72" width="72" height="72">
            <circle cx="36" cy="36" r="36" fill="#ff4d4f" />
            <text x="36" y="46" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">500</text>
          </svg>
        </div>
      </slot>
    </div>
    <div class="dedsi-result-title">
      <slot name="title">
        {{ computedTitle }}
      </slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" class="dedsi-result-subtitle">
      <slot name="subTitle">
        {{ subTitle }}
      </slot>
    </div>
    <div v-if="$slots.extra" class="dedsi-result-extra">
      <slot name="extra" />
    </div>
    <div v-if="$slots.default" class="dedsi-result-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'

interface Props {
  success?: boolean
  error?: boolean
  info?: boolean
  warning?: boolean
  '404'?: boolean
  '403'?: boolean
  '500'?: boolean
  status?: ResultStatus
  title?: string
  subTitle?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subTitle: ''
})

const type = computed<ResultStatus>(() => {
  // 优先使用 status 属性
  if (props.status) return props.status
  
  // 兼容之前的布尔属性方式
  if (props.success) return 'success'
  if (props.error) return 'error'
  if (props.info) return 'info'
  if (props.warning) return 'warning'
  if (props['404']) return '404'
  if (props['403']) return '403'
  if (props['500']) return '500'
  
  return 'info'
})

const resultClass = computed(() => {
  return {
    [`dedsi-result-${type.value}`]: true,
    'has-subtitle': props.subTitle || props.$slots?.subTitle
  }
})

const iconComponent = computed(() => {
  return props.icon
})

const computedTitle = computed(() => {
  if (props.title) return props.title
  
  const titles: Record<ResultStatus, string> = {
    success: '成功',
    error: '错误',
    info: '提示',
    warning: '警告',
    '404': '404',
    '403': '403',
    '500': '500'
  }
  
  return titles[type.value] || '提示'
})
</script>

<style scoped>
.dedsi-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 48px 32px;
  text-align: center;
}

.dedsi-result-icon {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
}

.dedsi-result-icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

.dedsi-result-icon .custom-icon {
  width: 100%;
  height: 100%;
}

.dedsi-result-title {
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-bottom: 8px;
}

.dedsi-result.has-subtitle .dedsi-result-title {
  margin-bottom: 16px;
}

.dedsi-result-subtitle {
  color: var(--dedsi-text-secondary, rgba(0, 0, 0, 0.45));
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 24px;
  max-width: 480px;
}

.dedsi-result-extra {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.dedsi-result-content {
  margin-top: 32px;
  width: 100%;
  text-align: left;
}

/* 不同状态的样式 */
.dedsi-result-success .dedsi-result-icon svg circle {
  fill: #52c41a;
}

.dedsi-result-error .dedsi-result-icon svg circle {
  fill: #ff4d4f;
}

.dedsi-result-info .dedsi-result-icon svg circle {
  fill: #1890ff;
}

.dedsi-result-warning .dedsi-result-icon svg circle {
  fill: #faad14;
}

.dedsi-result-404 .dedsi-result-icon svg circle {
  fill: #1890ff;
}

.dedsi-result-403 .dedsi-result-icon svg circle {
  fill: #faad14;
}

.dedsi-result-500 .dedsi-result-icon svg circle {
  fill: #ff4d4f;
}

/* 添加动画效果 */
@keyframes resultIconAnimation {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.dedsi-result-icon {
  animation: resultIconAnimation 0.3s ease-out;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dedsi-result {
    padding: 32px 16px;
  }
  
  .dedsi-result-title {
    font-size: 20px;
  }
  
  .dedsi-result-subtitle {
    max-width: 100%;
  }
  
  .dedsi-result-extra {
    flex-direction: column;
    width: 100%;
  }
  
  .dedsi-result-extra > * {
    width: 100%;
  }
}
</style>
