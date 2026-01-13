<template>
  <div class="dedsi-scrollbar-demo">
    <h2 class="page-title">Dedsi Scrollbar 滚动条</h2>
    <p class="page-desc">自定义的滚动条组件，用于替换浏览器原生滚动条。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <p class="desc">通过 height 属性设置滚动条高度，若不设置则适应父容器高度。</p>
        <DedsiScrollbar height="400px">
          <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
        </DedsiScrollbar>
      </DedsiCard>

      <DedsiCard title="横向滚动">
        <p class="desc">当内容宽度超过容器时，自动出现横向滚动条。</p>
        <DedsiScrollbar>
          <div class="scrollbar-flex-content">
            <p v-for="item in 50" :key="item" class="scrollbar-demo-item horizontal">{{ item }}</p>
          </div>
        </DedsiScrollbar>
      </DedsiCard>

      <DedsiCard title="最大高度">
        <p class="desc">当元素高度超过 max-height 时，触发滚动条。</p>
        <DedsiScrollbar max-height="400px">
          <p v-for="item in 10" :key="item" class="scrollbar-demo-item">{{ item }}</p>
        </DedsiScrollbar>
      </DedsiCard>

      <DedsiCard title="手动滚动">
        <p class="desc">通过调用 scrollTo 方法进行滚动。</p>
        <DedsiSpace style="margin-bottom: 16px;">
          <DedsiButton @click="handleScrollTo(0)">滚动到顶部</DedsiButton>
          <DedsiButton @click="handleScrollTo(200)">滚动到 200px</DedsiButton>
          <DedsiButton @click="handleScrollTo(400)">滚动到底部</DedsiButton>
        </DedsiSpace>
        <DedsiScrollbar ref="scrollbarRef" height="400px">
          <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
        </DedsiScrollbar>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiScrollbar, DedsiCard, DedsiButton, DedsiSpace } from '@/components'

const scrollbarRef = ref<InstanceType<typeof DedsiScrollbar>>()

const handleScrollTo = (y: number) => {
  scrollbarRef.value?.setScrollTop(y)
}
</script>

<style scoped>
.dedsi-scrollbar-demo {
  padding: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--dedsi-text-primary);
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: var(--dedsi-text-secondary);
  margin-bottom: 24px;
}

.desc {
  color: var(--dedsi-text-secondary);
  margin-bottom: 16px;
  font-size: 14px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #ecf5ff;
  color: #409eff;
}

.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item.horizontal {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #fef0f0;
  color: #f56c6c;
}

@media screen and (max-width: 1200px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>