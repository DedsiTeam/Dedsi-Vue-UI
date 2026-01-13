<template>
  <component
    :is="componentTag"
    class="dedsi-typography"
    :class="[
      type ? `dedsi-typography-${type}` : '',
      {
        'dedsi-typography-disabled': disabled,
        'dedsi-typography-ellipsis': ellipsis,
        'dedsi-typography-underline': underline,
        'dedsi-typography-delete': deleteAction,
        'dedsi-typography-strong': strong,
        'dedsi-typography-code': code,
        'dedsi-typography-mark': mark,
      }
    ]"
    :style="ellipsisStyle"
    ref="textRef"
  >
    <template v-if="!isEditing">
      <slot></slot>
      
      <span v-if="copyable" class="dedsi-typography-action" @click.stop="handleCopy">
        <template v-if="copied">
          <CheckOutlined style="color: var(--dedsi-success-color)" />
        </template>
        <template v-else>
          <CopyOutlined />
        </template>
      </span>

      <span v-if="editable" class="dedsi-typography-action" @click.stop="isEditing = true">
        <EditOutlined />
      </span>
    </template>

    <template v-else>
      <input
        ref="inputRef"
        v-model="editValue"
        class="dedsi-typography-edit-input"
        @blur="handleEditBlur"
        @keydown.enter="handleEditBlur"
        @keydown.esc="handleEditCancel"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { CopyOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'

interface Props {
  tag?: string
  type?: 'secondary' | 'success' | 'warning' | 'danger'
  disabled?: boolean
  mark?: boolean
  code?: boolean
  delete?: boolean
  underline?: boolean
  strong?: boolean
  copyable?: boolean | string
  editable?: boolean
  ellipsis?: boolean | { rows: number }
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  disabled: false,
  mark: false,
  code: false,
  delete: false,
  underline: false,
  strong: false,
  copyable: false,
  editable: false,
  ellipsis: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const componentTag = computed(() => props.tag)
const deleteAction = computed(() => props.delete)

const textRef = ref<HTMLElement | null>(null)
const copied = ref(false)
const isEditing = ref(false)
const editValue = ref('')

// Initialize edit value
watch(isEditing, (val) => {
  if (val) {
    editValue.value = textRef.value?.innerText || ''
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

const inputRef = ref<HTMLInputElement | null>(null)

const handleCopy = async () => {
  if (copied.value) return
  const text = typeof props.copyable === 'string' ? props.copyable : textRef.value?.innerText || ''
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const handleEditBlur = () => {
  if (!isEditing.value) return
  isEditing.value = false
  emit('change', editValue.value)
}

const handleEditCancel = () => {
  isEditing.value = false
}

const ellipsisStyle = computed(() => {
  if (typeof props.ellipsis === 'object' && props.ellipsis.rows > 1) {
    return {
      display: '-webkit-box',
      '-webkit-line-clamp': props.ellipsis.rows,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden'
    } as any
  }
  return {}
})
</script>

<style scoped>
.dedsi-typography {
  color: var(--dedsi-text-primary);
  line-height: 1.5715;
}

.dedsi-typography-secondary {
  color: var(--dedsi-text-secondary);
}

.dedsi-typography-success {
  color: var(--dedsi-success-color);
}

.dedsi-typography-warning {
  color: var(--dedsi-warning-color);
}

.dedsi-typography-danger {
  color: var(--dedsi-danger-color);
}

.dedsi-typography-disabled {
  color: var(--dedsi-text-disabled);
  cursor: not-allowed;
  user-select: none;
}

.dedsi-typography-underline {
  text-decoration: underline;
}

.dedsi-typography-delete {
  text-decoration: line-through;
}

.dedsi-typography-strong {
  font-weight: 600;
}

.dedsi-typography-code {
  margin: 0 0.2em;
  padding: 0.2em 0.4em;
  font-size: 85%;
  background: rgba(150, 150, 150, 0.1);
  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
}

.dedsi-typography-mark {
  background-color: #fff566;
}

.dedsi-typography-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dedsi-typography-action {
  margin-left: 8px;
  color: var(--dedsi-primary-color);
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s;
}

.dedsi-typography-action:hover {
  opacity: 0.8;
}

.dedsi-typography-edit-input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--dedsi-primary-color);
  border-radius: 4px;
  outline: none;
  font-size: inherit;
  font-family: inherit;
}

h1.dedsi-typography { font-size: 38px; font-weight: 600; margin-bottom: 0.5em; }
h2.dedsi-typography { font-size: 30px; font-weight: 600; margin-bottom: 0.5em; }
h3.dedsi-typography { font-size: 24px; font-weight: 600; margin-bottom: 0.5em; }
h4.dedsi-typography { font-size: 20px; font-weight: 600; margin-bottom: 0.5em; }
h5.dedsi-typography { font-size: 16px; font-weight: 600; margin-bottom: 0.5em; }
h6.dedsi-typography { font-size: 14px; font-weight: 600; margin-bottom: 0.5em; }
p.dedsi-typography { margin-bottom: 1em; }
</style>
