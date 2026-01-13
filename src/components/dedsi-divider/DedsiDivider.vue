<template>
  <div
    class="dedsi-divider"
    :class="[
      `dedsi-divider--${direction}`,
      {
        'dedsi-divider--with-text': $slots.default && direction === 'horizontal',
        'dedsi-divider--dashed': dashed,
        [`dedsi-divider--with-text-${contentPosition}`]: $slots.default && direction === 'horizontal'
      }
    ]"
    role="separator"
  >
    <span v-if="$slots.default && direction === 'horizontal'" class="dedsi-divider__text">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  direction?: 'horizontal' | 'vertical'
  contentPosition?: 'left' | 'center' | 'right'
  dashed?: boolean
}

withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  contentPosition: 'center',
  dashed: false
})
</script>

<style scoped>
.dedsi-divider {
  background-color: var(--dedsi-divider-color, #f0f0f0);
  position: relative;
}

.dedsi-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
}

.dedsi-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
}

.dedsi-divider--dashed {
  background: none;
  border-top: 1px dashed var(--dedsi-divider-color, #f0f0f0);
}

.dedsi-divider--with-text {
  display: flex;
  align-items: center;
  border-top: none;
  background-color: transparent;
}

.dedsi-divider--with-text:before,
.dedsi-divider--with-text:after {
  content: "";
  height: 1px;
  background-color: var(--dedsi-divider-color, #f0f0f0);
}

.dedsi-divider--with-text-center:before,
.dedsi-divider--with-text-center:after {
  flex: 1;
}

.dedsi-divider--with-text-left:before {
  width: 5%;
}
.dedsi-divider--with-text-left:after {
  flex: 1;
}

.dedsi-divider--with-text-right:before {
  flex: 1;
}
.dedsi-divider--with-text-right:after {
  width: 5%;
}

.dedsi-divider__text {
  padding: 0 20px;
  font-weight: 500;
  color: var(--dedsi-text-primary);
  font-size: 14px;
}

.dedsi-divider--dashed.dedsi-divider--with-text:before,
.dedsi-divider--dashed.dedsi-divider--with-text:after {
  background: none;
  border-top: 1px dashed var(--dedsi-divider-color, #f0f0f0);
}
</style>
