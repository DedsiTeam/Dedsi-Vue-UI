<template>
  <Transition name="dedsi-message-fade" @after-leave="handleAfterLeave">
    <div v-if="visible" class="dedsi-message-notice">
      <div class="dedsi-message-notice-content" :class="[`dedsi-message-${type}`]">
        <span class="dedsi-message-icon">
          <LoadingOutlined v-if="type === 'loading'" />
          <CheckCircleFilled v-else-if="type === 'success'" />
          <ExclamationCircleFilled v-else-if="type === 'warning'" />
          <CloseCircleFilled v-else-if="type === 'error'" />
          <InfoCircleFilled v-else />
        </span>
        <span class="dedsi-message-text">{{ content }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  InfoCircleFilled,
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseCircleFilled,
  LoadingOutlined
} from '@ant-design/icons-vue'

interface Props {
  content: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'loading'
  duration?: number
  onClose?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000
})

const visible = ref(false)

onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
})

const handleAfterLeave = () => {
  if (props.onClose) {
    props.onClose()
  }
}

// 暴露关闭方法
defineExpose({
  close: () => (visible.value = false)
})
</script>

<style scoped>
.dedsi-message-notice {
  padding: 8px;
  text-align: center;
  pointer-events: none;
}

.dedsi-message-notice-content {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  background: var(--dedsi-bg-color, #fff);
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: all;
}

.dedsi-message-icon {
  margin-right: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.dedsi-message-text {
  font-size: 14px;
  color: var(--dedsi-text-primary);
}

/* Types */
.dedsi-message-info .dedsi-message-icon { color: var(--dedsi-primary-color); }
.dedsi-message-success .dedsi-message-icon { color: var(--dedsi-success-color); }
.dedsi-message-warning .dedsi-message-icon { color: var(--dedsi-warning-color); }
.dedsi-message-error .dedsi-message-icon { color: var(--dedsi-danger-color); }
.dedsi-message-loading .dedsi-message-icon { color: var(--dedsi-primary-color); }

/* Animations */
.dedsi-message-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.dedsi-message-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dedsi-message-fade-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.dedsi-message-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
