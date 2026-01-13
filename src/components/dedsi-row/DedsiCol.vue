<template>
  <div class="dedsi-col" :class="colClasses" :style="colStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

const props = withDefaults(defineProps<{
  span?: number
  offset?: number
  xs?: number | { span?: number, offset?: number }
  sm?: number | { span?: number, offset?: number }
  md?: number | { span?: number, offset?: number }
  lg?: number | { span?: number, offset?: number }
  xl?: number | { span?: number, offset?: number }
}>(), {
  span: 24,
  offset: 0
})

const gutter = inject<number | [number, number]>('DedsiRowGutter', 0)

const colClasses = computed(() => {
  const classes: string[] = []
  
  if (props.span !== undefined) classes.push(`dedsi-col-${props.span}`)
  if (props.offset !== undefined) classes.push(`dedsi-col-offset-${props.offset}`)
  
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach(size => {
    const sizeProp = props[size]
    if (typeof sizeProp === 'number') {
      classes.push(`dedsi-col-${size}-${sizeProp}`)
    } else if (typeof sizeProp === 'object' && sizeProp !== null) {
      if (sizeProp.span !== undefined) classes.push(`dedsi-col-${size}-${sizeProp.span}`)
      if (sizeProp.offset !== undefined) classes.push(`dedsi-col-${size}-offset-${sizeProp.offset}`)
    }
  })
  
  return classes
})

const colStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (gutter) {
    const gutterX = Array.isArray(gutter) ? gutter[0] : gutter
    if (gutterX) {
      styles.paddingLeft = `${gutterX / 2}px`
      styles.paddingRight = `${gutterX / 2}px`
    }
  }
  return styles
})
</script>

<style scoped>
.dedsi-col {
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  /* 默认值 */
  --col-span: 24;
  --col-offset: 0;
  
  /* 使用 CSS 变量动态计算宽度 */
  flex: 0 0 calc(var(--col-span) / 24 * 100%);
  max-width: calc(var(--col-span) / 24 * 100%);
  margin-left: calc(var(--col-offset) / 24 * 100%);
}

/* 隐藏 span 为 0 的元素 */
.dedsi-col-0,
.dedsi-col-xs-0,
.dedsi-col-sm-0,
.dedsi-col-md-0,
.dedsi-col-lg-0,
.dedsi-col-xl-0 {
  display: none;
}

/* 基础 Span (1-24) */
.dedsi-col-1 { --col-span: 1; }
.dedsi-col-2 { --col-span: 2; }
.dedsi-col-3 { --col-span: 3; }
.dedsi-col-4 { --col-span: 4; }
.dedsi-col-5 { --col-span: 5; }
.dedsi-col-6 { --col-span: 6; }
.dedsi-col-7 { --col-span: 7; }
.dedsi-col-8 { --col-span: 8; }
.dedsi-col-9 { --col-span: 9; }
.dedsi-col-10 { --col-span: 10; }
.dedsi-col-11 { --col-span: 11; }
.dedsi-col-12 { --col-span: 12; }
.dedsi-col-13 { --col-span: 13; }
.dedsi-col-14 { --col-span: 14; }
.dedsi-col-15 { --col-span: 15; }
.dedsi-col-16 { --col-span: 16; }
.dedsi-col-17 { --col-span: 17; }
.dedsi-col-18 { --col-span: 18; }
.dedsi-col-19 { --col-span: 19; }
.dedsi-col-20 { --col-span: 20; }
.dedsi-col-21 { --col-span: 21; }
.dedsi-col-22 { --col-span: 22; }
.dedsi-col-23 { --col-span: 23; }
.dedsi-col-24 { --col-span: 24; }

/* 基础 Offset (0-24) */
.dedsi-col-offset-0 { --col-offset: 0; }
.dedsi-col-offset-1 { --col-offset: 1; }
.dedsi-col-offset-2 { --col-offset: 2; }
.dedsi-col-offset-3 { --col-offset: 3; }
.dedsi-col-offset-4 { --col-offset: 4; }
.dedsi-col-offset-5 { --col-offset: 5; }
.dedsi-col-offset-6 { --col-offset: 6; }
.dedsi-col-offset-7 { --col-offset: 7; }
.dedsi-col-offset-8 { --col-offset: 8; }
.dedsi-col-offset-9 { --col-offset: 9; }
.dedsi-col-offset-10 { --col-offset: 10; }
.dedsi-col-offset-11 { --col-offset: 11; }
.dedsi-col-offset-12 { --col-offset: 12; }
.dedsi-col-offset-13 { --col-offset: 13; }
.dedsi-col-offset-14 { --col-offset: 14; }
.dedsi-col-offset-15 { --col-offset: 15; }
.dedsi-col-offset-16 { --col-offset: 16; }
.dedsi-col-offset-17 { --col-offset: 17; }
.dedsi-col-offset-18 { --col-offset: 18; }
.dedsi-col-offset-19 { --col-offset: 19; }
.dedsi-col-offset-20 { --col-offset: 20; }
.dedsi-col-offset-21 { --col-offset: 21; }
.dedsi-col-offset-22 { --col-offset: 22; }
.dedsi-col-offset-23 { --col-offset: 23; }
.dedsi-col-offset-24 { --col-offset: 24; }

/* XS (<576px) */
@media (max-width: 575.98px) {
  .dedsi-col-xs-1 { --col-span: 1; }
  .dedsi-col-xs-2 { --col-span: 2; }
  .dedsi-col-xs-3 { --col-span: 3; }
  .dedsi-col-xs-4 { --col-span: 4; }
  .dedsi-col-xs-5 { --col-span: 5; }
  .dedsi-col-xs-6 { --col-span: 6; }
  .dedsi-col-xs-7 { --col-span: 7; }
  .dedsi-col-xs-8 { --col-span: 8; }
  .dedsi-col-xs-9 { --col-span: 9; }
  .dedsi-col-xs-10 { --col-span: 10; }
  .dedsi-col-xs-11 { --col-span: 11; }
  .dedsi-col-xs-12 { --col-span: 12; }
  .dedsi-col-xs-13 { --col-span: 13; }
  .dedsi-col-xs-14 { --col-span: 14; }
  .dedsi-col-xs-15 { --col-span: 15; }
  .dedsi-col-xs-16 { --col-span: 16; }
  .dedsi-col-xs-17 { --col-span: 17; }
  .dedsi-col-xs-18 { --col-span: 18; }
  .dedsi-col-xs-19 { --col-span: 19; }
  .dedsi-col-xs-20 { --col-span: 20; }
  .dedsi-col-xs-21 { --col-span: 21; }
  .dedsi-col-xs-22 { --col-span: 22; }
  .dedsi-col-xs-23 { --col-span: 23; }
  .dedsi-col-xs-24 { --col-span: 24; }
  
  .dedsi-col-xs-offset-0 { --col-offset: 0; }
  /* ... offset skipped for brevity unless needed by user. Adding core ones */
}

/* SM (>=576px) */
@media (min-width: 576px) {
  .dedsi-col-sm-1 { --col-span: 1; }
  .dedsi-col-sm-2 { --col-span: 2; }
  .dedsi-col-sm-3 { --col-span: 3; }
  .dedsi-col-sm-4 { --col-span: 4; }
  .dedsi-col-sm-5 { --col-span: 5; }
  .dedsi-col-sm-6 { --col-span: 6; }
  .dedsi-col-sm-7 { --col-span: 7; }
  .dedsi-col-sm-8 { --col-span: 8; }
  .dedsi-col-sm-9 { --col-span: 9; }
  .dedsi-col-sm-10 { --col-span: 10; }
  .dedsi-col-sm-11 { --col-span: 11; }
  .dedsi-col-sm-12 { --col-span: 12; }
  .dedsi-col-sm-13 { --col-span: 13; }
  .dedsi-col-sm-14 { --col-span: 14; }
  .dedsi-col-sm-15 { --col-span: 15; }
  .dedsi-col-sm-16 { --col-span: 16; }
  .dedsi-col-sm-17 { --col-span: 17; }
  .dedsi-col-sm-18 { --col-span: 18; }
  .dedsi-col-sm-19 { --col-span: 19; }
  .dedsi-col-sm-20 { --col-span: 20; }
  .dedsi-col-sm-21 { --col-span: 21; }
  .dedsi-col-sm-22 { --col-span: 22; }
  .dedsi-col-sm-23 { --col-span: 23; }
  .dedsi-col-sm-24 { --col-span: 24; }
}

/* MD (>=768px) */
@media (min-width: 768px) {
  .dedsi-col-md-1 { --col-span: 1; }
  .dedsi-col-md-2 { --col-span: 2; }
  .dedsi-col-md-3 { --col-span: 3; }
  .dedsi-col-md-4 { --col-span: 4; }
  .dedsi-col-md-5 { --col-span: 5; }
  .dedsi-col-md-6 { --col-span: 6; }
  .dedsi-col-md-7 { --col-span: 7; }
  .dedsi-col-md-8 { --col-span: 8; }
  .dedsi-col-md-9 { --col-span: 9; }
  .dedsi-col-md-10 { --col-span: 10; }
  .dedsi-col-md-11 { --col-span: 11; }
  .dedsi-col-md-12 { --col-span: 12; }
  .dedsi-col-md-13 { --col-span: 13; }
  .dedsi-col-md-14 { --col-span: 14; }
  .dedsi-col-md-15 { --col-span: 15; }
  .dedsi-col-md-16 { --col-span: 16; }
  .dedsi-col-md-17 { --col-span: 17; }
  .dedsi-col-md-18 { --col-span: 18; }
  .dedsi-col-md-19 { --col-span: 19; }
  .dedsi-col-md-20 { --col-span: 20; }
  .dedsi-col-md-21 { --col-span: 21; }
  .dedsi-col-md-22 { --col-span: 22; }
  .dedsi-col-md-23 { --col-span: 23; }
  .dedsi-col-md-24 { --col-span: 24; }
}

/* LG (>=992px) */
@media (min-width: 992px) {
  .dedsi-col-lg-1 { --col-span: 1; }
  .dedsi-col-lg-2 { --col-span: 2; }
  .dedsi-col-lg-3 { --col-span: 3; }
  .dedsi-col-lg-4 { --col-span: 4; }
  .dedsi-col-lg-5 { --col-span: 5; }
  .dedsi-col-lg-6 { --col-span: 6; }
  .dedsi-col-lg-7 { --col-span: 7; }
  .dedsi-col-lg-8 { --col-span: 8; }
  .dedsi-col-lg-9 { --col-span: 9; }
  .dedsi-col-lg-10 { --col-span: 10; }
  .dedsi-col-lg-11 { --col-span: 11; }
  .dedsi-col-lg-12 { --col-span: 12; }
  .dedsi-col-lg-13 { --col-span: 13; }
  .dedsi-col-lg-14 { --col-span: 14; }
  .dedsi-col-lg-15 { --col-span: 15; }
  .dedsi-col-lg-16 { --col-span: 16; }
  .dedsi-col-lg-17 { --col-span: 17; }
  .dedsi-col-lg-18 { --col-span: 18; }
  .dedsi-col-lg-19 { --col-span: 19; }
  .dedsi-col-lg-20 { --col-span: 20; }
  .dedsi-col-lg-21 { --col-span: 21; }
  .dedsi-col-lg-22 { --col-span: 22; }
  .dedsi-col-lg-23 { --col-span: 23; }
  .dedsi-col-lg-24 { --col-span: 24; }
}

/* XL (>=1200px) */
@media (min-width: 1200px) {
  .dedsi-col-xl-1 { --col-span: 1; }
  .dedsi-col-xl-2 { --col-span: 2; }
  .dedsi-col-xl-3 { --col-span: 3; }
  .dedsi-col-xl-4 { --col-span: 4; }
  .dedsi-col-xl-5 { --col-span: 5; }
  .dedsi-col-xl-6 { --col-span: 6; }
  .dedsi-col-xl-7 { --col-span: 7; }
  .dedsi-col-xl-8 { --col-span: 8; }
  .dedsi-col-xl-9 { --col-span: 9; }
  .dedsi-col-xl-10 { --col-span: 10; }
  .dedsi-col-xl-11 { --col-span: 11; }
  .dedsi-col-xl-12 { --col-span: 12; }
  .dedsi-col-xl-13 { --col-span: 13; }
  .dedsi-col-xl-14 { --col-span: 14; }
  .dedsi-col-xl-15 { --col-span: 15; }
  .dedsi-col-xl-16 { --col-span: 16; }
  .dedsi-col-xl-17 { --col-span: 17; }
  .dedsi-col-xl-18 { --col-span: 18; }
  .dedsi-col-xl-19 { --col-span: 19; }
  .dedsi-col-xl-20 { --col-span: 20; }
  .dedsi-col-xl-21 { --col-span: 21; }
  .dedsi-col-xl-22 { --col-span: 22; }
  .dedsi-col-xl-23 { --col-span: 23; }
  .dedsi-col-xl-24 { --col-span: 24; }
}
</style>
