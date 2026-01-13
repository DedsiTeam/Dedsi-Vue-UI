<template>
  <div class="dedsi-space-demo">
    <h2 class="page-title">Dedsi Space 间距组件</h2>
    <p class="page-desc">设置组件之间的间距，支持水平和垂直分布。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法 (Horizontal)">
        <DedsiSpace>
          <DedsiButton type="primary">按钮 1</DedsiButton>
          <DedsiButton>按钮 2</DedsiButton>
          <DedsiButton type="danger">按钮 3</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="间距大小 (size: small | middle | large | 40)">
        <DedsiSpace direction="vertical" size="middle">
          <DedsiSpace size="small">
            <DedsiTag type="primary">Small (8px)</DedsiTag>
            <DedsiTag type="success">Small (8px)</DedsiTag>
          </DedsiSpace>
          <DedsiSpace size="middle">
            <DedsiTag type="primary">Middle (16px)</DedsiTag>
            <DedsiTag type="success">Middle (16px)</DedsiTag>
          </DedsiSpace>
          <DedsiSpace size="large">
            <DedsiTag type="primary">Large (24px)</DedsiTag>
            <DedsiTag type="success">Large (24px)</DedsiTag>
          </DedsiSpace>
          <DedsiSpace :size="40">
            <DedsiTag type="primary">Custom (40px)</DedsiTag>
            <DedsiTag type="success">Custom (40px)</DedsiTag>
          </DedsiSpace>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="垂直排列 (Vertical)">
        <DedsiSpace direction="vertical" size="middle">
            <DedsiButton block>垂直按钮 1</DedsiButton>
            <DedsiButton block>垂直按钮 2</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自动换行 (Wrap: true)">
        <div style="width: 300px; padding: 12px; border: 1px dashed var(--dedsi-border-color);">
          <DedsiSpace wrap size="small">
            <DedsiTag v-for="i in 10" :key="i">标签 {{ i }}</DedsiTag>
          </DedsiSpace>
        </div>
      </DedsiCard>

      <DedsiCard title="对齐方式 (Align)">
        <div class="align-demo-container">
          <DedsiSpace align="center" size="middle" class="bg-light">
            <span>Center Alignment:</span>
            <DedsiButton type="primary">Main</DedsiButton>
            <div class="tall-box">Tall Box</div>
          </DedsiSpace>
        </div>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiSpace, DedsiButton, DedsiTag, DedsiCard } from '@/components'
</script>

<style scoped>
.dedsi-space-demo {
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

.align-demo-container {
  padding: 16px;
  border: 1px solid var(--dedsi-divider-color);
}

.bg-light {
  background-color: var(--dedsi-bg-secondary);
  width: 100%;
}

.tall-box {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #fff;
  border: 1px solid var(--dedsi-border-color);
  border-radius: 4px;
}
</style>
