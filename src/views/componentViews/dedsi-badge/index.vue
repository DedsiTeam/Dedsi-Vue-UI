<template>
  <div class="dedsi-badge-demo">
    <h2 class="page-title">Dedsi Badge 徽标数</h2>
    <p class="page-desc">图标右上角的圆形徽标数字。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="32">
          <DedsiBadge :value="12">
            <div class="demo-box" />
          </DedsiBadge>
          <DedsiBadge :value="3" type="primary">
            <div class="demo-box" />
          </DedsiBadge>
          <DedsiBadge :value="1" type="success">
            <div class="demo-box" />
          </DedsiBadge>
          <DedsiBadge :value="2" type="warning">
            <div class="demo-box" />
          </DedsiBadge>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="最大值">
        <DedsiSpace :size="32">
          <DedsiBadge :value="200" :max="99">
            <div class="demo-box" />
          </DedsiBadge>
          <DedsiBadge :value="100" :max="10">
            <div class="demo-box" />
          </DedsiBadge>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="小红点">
        <DedsiSpace :size="32">
          <DedsiBadge is-dot>
            数据查询
          </DedsiBadge>
          <DedsiBadge is-dot>
            <div class="demo-box" />
          </DedsiBadge>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="独立使用">
        <DedsiSpace :size="32">
          <DedsiBadge :value="10" />
          <DedsiBadge :value="12" type="primary" />
          <DedsiBadge :value="3" type="success" />
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiBadge, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-badge-demo {
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

.demo-row {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  align-items: center;
}

.demo-box {
  width: 40px;
  height: 40px;
  background: #f0f2f5;
  border-radius: 4px;
}
</style>
