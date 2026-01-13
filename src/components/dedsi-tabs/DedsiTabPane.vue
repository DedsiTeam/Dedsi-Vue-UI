<template>
  <div v-show="active" class="dedsi-tab-pane">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onUnmounted } from 'vue'

interface Props {
  label: string
  name: string | number
  disabled?: boolean
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  closable: true
})

const tabsContext = inject<any>('tabsContext')

const active = computed(() => {
  return tabsContext?.activeName.value === props.name
})

// Register pane to parent
tabsContext?.registerPane({
  name: props.name,
  label: props.label,
  disabled: props.disabled,
  closable: props.closable
})

onUnmounted(() => {
  tabsContext?.unregisterPane(props.name)
})
</script>

<style scoped>
.dedsi-tab-pane {
  width: 100%;
}
</style>
