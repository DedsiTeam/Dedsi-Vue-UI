<template>
  <div class="dedsi-tag-demo">
    <h2 class="page-title">Dedsi Tag 标签组件</h2>
    <p class="page-desc">用于标记和分类的小标签。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace wrap>
          <DedsiTag>默认标签</DedsiTag>
          <DedsiTag type="primary">主要标签</DedsiTag>
          <DedsiTag type="success">成功标签</DedsiTag>
          <DedsiTag type="warning">警告标签</DedsiTag>
          <DedsiTag type="danger">危险标签</DedsiTag>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="尺寸">
        <DedsiSpace align="center" wrap>
          <DedsiTag size="large">大号标签</DedsiTag>
          <DedsiTag>默认标签</DedsiTag>
          <DedsiTag size="small">小号标签</DedsiTag>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="圆角与可关闭">
        <DedsiSpace wrap>
          <DedsiTag round>圆角标签</DedsiTag>
          <DedsiTag type="primary" round>主要圆角</DedsiTag>
          <DedsiTag closable @close="handleClose">可关闭标签</DedsiTag>
          <DedsiTag type="success" closable round @close="handleClose">成功圆角关闭</DedsiTag>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自定义颜色">
        <DedsiSpace wrap>
          <DedsiTag color="#722ed1" background-color="#f9f0ff" border-color="#d3adf7">紫色标签</DedsiTag>
          <DedsiTag color="#eb2f96" background-color="#fff0f6" border-color="#ffadd2">粉色标签</DedsiTag>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiTag, DedsiCard, DedsiSpace } from '@/components'

const handleClose = (e: MouseEvent) => {
  console.log('Tag closed', e)
}
</script>

<style scoped>
.dedsi-tag-demo {
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
</style>
