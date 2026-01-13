<template>
  <div class="dedsi-input-wrapper" :class="[
    { 'dedsi-input-bordered': bordered },
    `dedsi-input-wrapper-${size}`
  ]">
    <input
      :type="type === 'password' && showPassword ? 'text' : type"
      class="dedsi-input"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <span v-if="allowClear && modelValue" class="dedsi-input-clear" @click="handleClear">
      ×
    </span>
    <span v-if="type === 'password'" class="dedsi-input-password-icon" @click="togglePassword">
      <EyeOutlined v-if="showPassword" />
      <EyeInvisibleOutlined v-else />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
  bordered?: boolean
  size?: 'small' | 'middle' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  bordered: true,
  size: 'middle'
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur', 'clear'])

const showPassword = ref(false)

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('change', e)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.dedsi-input-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 14px;
}

.dedsi-input {
  width: 100%;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  background-color: #fff;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all 0.2s;
  line-height: 1.5715;
}

.dedsi-input-wrapper-small .dedsi-input {
  padding: 0 7px;
}

.dedsi-input-wrapper-middle .dedsi-input {
  padding: 4px 11px;
}

.dedsi-input-wrapper-large .dedsi-input {
  padding: 7px 11px;
  font-size: 16px;
}

.dedsi-input-bordered .dedsi-input {
  border-color: #d9d9d9;
}

.dedsi-input:focus {
  outline: 0;
}

.dedsi-input-bordered .dedsi-input:focus {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
}

.dedsi-input-bordered .dedsi-input:hover {
  border-color: #4096ff;
}

.dedsi-input[disabled] {
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.04);
  cursor: not-allowed;
}

.dedsi-input-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: color 0.3s;
  z-index: 1;
}

.dedsi-input-clear:hover {
  color: rgba(0, 0, 0, 0.45);
}

.dedsi-input-password-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.45);
  cursor: pointer;
  transition: color 0.3s;
  z-index: 1;
}

.dedsi-input-password-icon:hover {
  color: rgba(0, 0, 0, 0.88);
}
</style>
