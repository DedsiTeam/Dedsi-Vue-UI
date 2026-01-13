<template>
  <div class="dedsi-button-demo">
    <h2 class="page-title">Dedsi Button 按钮组件</h2>
    <p class="page-desc">基础的按钮组件，支持多种样式和状态。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="12" wrap>
          <DedsiButton>默认按钮</DedsiButton>
          <DedsiButton type="primary">主要按钮</DedsiButton>
          <DedsiButton type="success">成功按钮</DedsiButton>
          <DedsiButton type="warning">警告按钮</DedsiButton>
          <DedsiButton type="danger">危险按钮</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="尺寸">
        <DedsiSpace :size="12" wrap>
          <DedsiButton size="large">大号按钮</DedsiButton>
          <DedsiButton>默认按钮</DedsiButton>
          <DedsiButton size="small">小号按钮</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="圆角与禁用">
        <DedsiSpace :size="12" wrap>
          <DedsiButton round>圆角按钮</DedsiButton>
          <DedsiButton type="primary" round>主要圆角</DedsiButton>
          <DedsiButton disabled>禁用按钮</DedsiButton>
          <DedsiButton type="primary" disabled>禁用主要</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="加载状态">
        <DedsiSpace :size="12" wrap>
          <DedsiButton loading>加载中</DedsiButton>
          <DedsiButton type="primary" loading>提交中</DedsiButton>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiButton, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-button-demo {
  padding: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}

.demo-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
