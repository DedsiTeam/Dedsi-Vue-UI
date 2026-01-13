<template>
  <span class="dedsi-breadcrumb__item">
    <span
      ref="link"
      :class="['dedsi-breadcrumb__inner', { 'is-link': to }]"
      role="link"
      @click="handleClick"
    >
      <slot />
    </span>
    <span class="dedsi-breadcrumb__separator" role="presentation">
      <slot name="separator">{{ separator }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  to?: string | object
  replace?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  replace: false
})

const router = useRouter()
const separator = inject('breadcrumbSeparator', '/')

const handleClick = () => {
  if (!props.to || !router) return
  props.replace ? router.replace(props.to) : router.push(props.to)
}
</script>

<style scoped>
.dedsi-breadcrumb__item {
  display: inline-flex;
  align-items: center;
}

.dedsi-breadcrumb__item:last-child .dedsi-breadcrumb__separator {
  display: none;
}

.dedsi-breadcrumb__inner {
  color: var(--dedsi-text-secondary);
  transition: color 0.3s;
}

.dedsi-breadcrumb__inner.is-link {
  font-weight: 500;
  color: var(--dedsi-text-primary);
  cursor: pointer;
}

.dedsi-breadcrumb__inner.is-link:hover {
  color: var(--dedsi-primary-color);
}

.dedsi-breadcrumb__separator {
  margin: 0 8px;
  color: var(--dedsi-text-placeholder);
}

.dedsi-breadcrumb__item:last-child .dedsi-breadcrumb__inner {
  color: var(--dedsi-text-primary);
  font-weight: normal;
  cursor: default;
}

.dedsi-breadcrumb__item:last-child .dedsi-breadcrumb__inner:hover {
  color: var(--dedsi-text-primary);
}
</style>
