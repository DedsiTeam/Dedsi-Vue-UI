<template>
  <div class="dedsi-converter-demo">
    <h2 class="page-title">Dedsi Number Converter 数字转换器</h2>
    <p class="page-desc">将大额数字转换为易读的单位（万、千万、亿），支持自定义精度和后缀。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法 (自动转换)">
        <DedsiSpace direction="vertical" :size="16">
          <div class="demo-item">
            <span class="label">12,500: </span>
            <DedsiNumberConverter :value="12500" />
          </div>
          <div class="demo-item">
            <span class="label">8,500,000: </span>
            <DedsiNumberConverter :value="8500000" />
          </div>
          <div class="demo-item">
            <span class="label">120,000,000: </span>
            <DedsiNumberConverter :value="120000000" />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="指定转换单位">
        <DedsiSpace direction="vertical" :size="16">
          <div class="demo-item">
            <span class="label">120,000,000 (强制转为万): </span>
            <DedsiNumberConverter :value="120000000" target-unit="wan" />
          </div>
          <div class="demo-item">
            <span class="label">120,000,000 (强制转为千万): </span>
            <DedsiNumberConverter :value="120000000" target-unit="qianwan" />
          </div>
          <div class="demo-item">
            <span class="label">1,000 (不转换): </span>
            <DedsiNumberConverter :value="1000" target-unit="none" />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="精度与后缀">
        <DedsiSpace direction="vertical" :size="16">
          <div class="demo-item">
            <span class="label">精度为 0 (12,500): </span>
            <DedsiNumberConverter :value="12500" :precision="0" />
          </div>
          <div class="demo-item">
            <span class="label">精度为 4 (12,500): </span>
            <DedsiNumberConverter :value="12500" :precision="4" />
          </div>
          <div class="demo-item">
            <span class="label">添加后缀 (12,500 元): </span>
            <DedsiNumberConverter :value="12500" suffix="元" />
          </div>
          <div class="demo-item">
            <span class="label">组合使用 (88,000,000 美金, 1位小数): </span>
            <DedsiNumberConverter :value="88000000" :precision="1" target-unit="yi" suffix="美元" />
          </div>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiNumberConverter, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-converter-demo {
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

.demo-card {
  background: var(--dedsi-bg-color);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--dedsi-text-primary);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--dedsi-divider-color);
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-item {
  font-size: 14px;
  color: var(--dedsi-text-primary);
}

.label {
  color: var(--dedsi-text-secondary);
  margin-right: 8px;
  display: inline-block;
  min-width: 240px;
}
</style>
