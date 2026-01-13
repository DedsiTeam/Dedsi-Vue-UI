<template>
  <form class="dedsi-form" :class="formClasses" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, computed, ref } from 'vue'

interface FormProps {
  model?: Record<string, any>
  rules?: Record<string, any>
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelCol?: { span?: number; offset?: number; style?: any }
  wrapperCol?: { span?: number; offset?: number; style?: any }
  disabled?: boolean
}

const props = withDefaults(defineProps<FormProps>(), {
  model: () => ({}),
  rules: () => ({}),
  layout: 'vertical',
  disabled: false
})

const emit = defineEmits(['finish', 'finishFailed'])

const fields = ref<any[]>([])

const addField = (field: any) => {
  if (field) {
    fields.value.push(field)
  }
}

const removeField = (field: any) => {
  if (field.prop) {
    fields.value.splice(fields.value.indexOf(field), 1)
  }
}

const formClasses = computed(() => [
  `dedsi-form-${props.layout}`
])

const validate = async () => {
  let valid = true
  const errors: any[] = []
  
  for (const field of fields.value) {
    try {
      await field.validate('')
    } catch (e: any) {
      valid = false
      errors.push(e)
    }
  }

  if (valid) {
    return Promise.resolve(props.model)
  } else {
    return Promise.reject(errors)
  }
}

const handleSubmit = () => {
  validate()
    .then(() => {
      emit('finish', props.model)
    })
    .catch((errors) => {
      emit('finishFailed', errors)
    })
}

const validateField = (name: string) => {
  const field = fields.value.find(f => f.prop === name)
  if (field) {
    field.validate('')
  }
}

const clearValidate = (name?: string | string[]) => {
  if (!name) {
    fields.value.forEach(f => f.clearValidate())
  } else {
    // Handle array or string
    const names = Array.isArray(name) ? name : [name]
    fields.value.filter(f => names.includes(f.prop)).forEach(f => f.clearValidate())
  }
}

const resetFields = () => {
    fields.value.forEach(f => f.resetField())
}

provide('dedsiForm', {
  model: computed(() => props.model),
  rules: computed(() => props.rules),
  layout: computed(() => props.layout),
  labelCol: computed(() => props.labelCol),
  wrapperCol: computed(() => props.wrapperCol),
  disabled: computed(() => props.disabled),
  addField,
  removeField
})

defineExpose({
  validate,
  validateField,
  clearValidate,
  resetFields
})
</script>

<style scoped>
.dedsi-form {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5715;
}

.dedsi-form-inline {
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
}

.dedsi-form-inline :deep(.dedsi-form-item-label){
  padding-bottom: 0;
}
.dedsi-form-inline :deep(.dedsi-form-item) {
  margin-bottom: 0;
}
</style>
