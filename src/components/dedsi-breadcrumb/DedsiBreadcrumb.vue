<template>
  <nav class="dedsi-breadcrumb" aria-label="Breadcrumb">
    <slot />
  </nav>
</template>

<script setup lang="ts">
import { provide } from 'vue'

interface Props {
  separator?: string
}

const props = withDefaults(defineProps<Props>(), {
  separator: '/'
})

provide('breadcrumbSeparator', props.separator)
</script>

<style scoped>
.dedsi-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 14px;
  color: var(--dedsi-text-secondary);
  line-height: normal;
}
</style>
