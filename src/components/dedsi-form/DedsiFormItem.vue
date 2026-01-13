<template>
  <div class="dedsi-form-item" :class="itemClasses">
    <div v-if="label" class="dedsi-form-item-label" :class="{ 'dedsi-form-item-required': isRequired }" :style="labelStyle">
      <label :for="name" :title="label">{{ label }}</label>
    </div>
    <div class="dedsi-form-item-control" :style="wrapperStyle">
      <div class="dedsi-form-item-control-input">
        <div class="dedsi-form-item-control-input-content">
          <slot />
        </div>
      </div>
      <transition name="dedsi-fade-down">
        <div v-if="validateState === 'error'" class="dedsi-form-item-explain">
          <div class="dedsi-form-item-explain-error">{{ validateMessage }}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'

interface FormItemProps {
  name?: string
  label?: string
  rules?: any[] | any
  required?: boolean
  labelCol?: object
  wrapperCol?: object
}

const props = defineProps<FormItemProps>()

const dedsiForm = inject('dedsiForm', {} as any)

const validateState = ref('') // '', 'success', 'error', 'validating'
const validateMessage = ref('')

const computedRules = computed(() => {
  let rules = props.rules
  if (rules === undefined && props.name && dedsiForm.rules && dedsiForm.rules.value) {
    rules = dedsiForm.rules.value[props.name]
  }
  if (!rules) return []
  return Array.isArray(rules) ? rules : [rules]
})

const isRequired = computed(() => {
  if (props.required) return true
  return computedRules.value.some((rule: any) => rule.required)
})

const fieldValue = computed(() => {
  if (!dedsiForm.model || !dedsiForm.model.value || !props.name) return undefined
  return dedsiForm.model.value[props.name]
})

const itemClasses = computed(() => [
  {
    'dedsi-form-item-has-error': validateState.value === 'error',
    'dedsi-form-item-with-help': validateState.value === 'error',
  }
])

const labelStyle = computed(() => {
  // Simple implementation, expand if needed
  if (props.labelCol) return props.labelCol
  return dedsiForm.labelCol?.value || {}
})

const wrapperStyle = computed(() => {
  if (props.wrapperCol) return props.wrapperCol
  return dedsiForm.wrapperCol?.value || {}
})

const validate = async (trigger: string) => {
  if (!props.name || !computedRules.value.length) {
    validateState.value = 'success'
    return true
  }

  validateState.value = 'validating'
  const value = fieldValue.value

  for (const rule of computedRules.value) {
    // Check trigger if specified in rule
    if (trigger && rule.trigger && !rule.trigger.includes(trigger)) {
      continue
    }

    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        validateState.value = 'error'
        validateMessage.value = rule.message || `${props.label || 'Field'} is required`
        return Promise.reject(validateMessage.value)
      }
    }

    if (rule.validator) {
       try {
         await new Promise((resolve, reject) => {
           rule.validator(rule, value, (error: any) => {
             if (error) reject(error)
             else resolve(true)
           })
         })
       } catch (error: any) {
          validateState.value = 'error'
          validateMessage.value = error.message || error
          return Promise.reject(validateMessage.value)
       }
    }
  }

  validateState.value = 'success'
  validateMessage.value = ''
  return true
}

const clearValidate = () => {
  validateState.value = ''
  validateMessage.value = ''
}

const resetField = () => {
    validateState.value = ''
    validateMessage.value = ''
    // Reset value logic would go here if we stored initial value
}

// Register with form
const context = {
  prop: props.name,
  validate,
  clearValidate,
  resetField
}

onMounted(() => {
  if (props.name) {
    dedsiForm.addField?.(context)
  }
})

onBeforeUnmount(() => {
  if (props.name) {
    dedsiForm.removeField?.(context)
  }
})

// Watch value change for validation
watch(fieldValue, () => {
  if (props.name && computedRules.value.length) {
     // Debounce could be added here
     validate('change').catch(() => {})
  }
})
</script>

<style scoped>
.dedsi-form-item {
  margin-bottom: 24px;
  vertical-align: top;
  display: flex;
  flex-wrap: wrap;
}

.dedsi-form-item-label {
  display: inline-block;
  flex-grow: 0;
  overflow: hidden;
  white-space: nowrap;
  text-align: right;
  vertical-align: middle;
  line-height: normal; /* Fix vertical alignment */
  padding-bottom: 8px; /* For vertical layout default */
}

/* Vertical Layout as default or explicit */
.dedsi-form-vertical .dedsi-form-item {
    flex-direction: column;
}
.dedsi-form-vertical .dedsi-form-item-label {
    text-align: left;
    padding: 0 0 8px;
}

.dedsi-form-item-label > label {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 32px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
}

.dedsi-form-item-required > label::before {
  display: inline-block;
  margin-right: 4px;
  color: #ff4d4f;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: '*';
}

.dedsi-form-item-control {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.dedsi-form-item-control-input {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
}

.dedsi-form-item-control-input-content {
  flex: auto;
  max-width: 100%;
}

.dedsi-form-item-explain {
  clear: both;
  min-height: 24px;
  color: #ff4d4f;
  font-size: 14px;
  line-height: 1.5715;
  padding-top: 2px;
  transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

/* Animation */
.dedsi-fade-down-enter-active,
.dedsi-fade-down-leave-active {
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.dedsi-fade-down-enter-from,
.dedsi-fade-down-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
