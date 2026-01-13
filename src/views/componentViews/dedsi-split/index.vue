<template>
  <div class="dedsi-split-demo">
    <h2 class="page-title">Dedsi Split 左右布局组件</h2>
    <p class="page-desc">简单高效的水平左右分布容器。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <div class="demo-container">
          <DedsiSplit>
            <template #left>
              <div class="box">左侧内容</div>
            </template>
            <template #right>
              <div class="box primary">右侧内容</div>
            </template>
          </DedsiSplit>
        </div>
      </DedsiCard>

      <DedsiCard title="带边距与间距 (Gap & Padding)">
        <div class="demo-container bordered">
          <DedsiSplit padding="16px" gap="20px">
            <div class="demo-group">
              <div class="box small">Left Item 1</div>
              <div class="box small">Left Item 2</div>
            </div>
            <template #right>
              <div class="box small primary">Right Action</div>
            </template>
          </DedsiSplit>
        </div>
      </DedsiCard>

      <DedsiCard title="对齐方式 (Align)">
        <DedsiSpace direction="vertical" :size="20" style="width: 100%">
          <div class="demo-row">
            <span>Top:</span>
            <div class="demo-container bordered fixed-height">
              <DedsiSplit align="top">
                <div class="box tall">Tall Left</div>
                <template #right>
                  <div class="box">Normal Right</div>
                </template>
              </DedsiSplit>
            </div>
          </div>
          <div class="demo-row">
            <span>Center:</span>
            <div class="demo-container bordered fixed-height">
              <DedsiSplit align="center">
                <div class="box tall">Tall Left</div>
                <template #right>
                  <div class="box">Normal Right</div>
                </template>
              </DedsiSplit>
            </div>
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="实际应用：列表项">
        <DedsiSpace direction="vertical" :size="12" style="width: 100%;">
          <div v-for="i in 3" :key="i" class="list-item">
            <DedsiSplit>
              <div class="item-info">
                <span class="item-title">项目名称 {{ i }}</span>
                <span class="item-desc">这是项目的简短描述文字。</span>
              </div>
              <template #right>
                <div class="item-actions">
                  <span class="status">进行中</span>
                  <a href="#" class="action-link">查看详情</a>
                </div>
              </template>
            </DedsiSplit>
          </div>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiSplit, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-split-demo {
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

.demo-container {
  background: var(--dedsi-bg-secondary);
  border-radius: 4px;
}

.demo-container.bordered {
  border: 1px dashed var(--dedsi-border-color);
}

.demo-container.fixed-height {
  height: 120px;
}

.box {
  padding: 12px 20px;
  background: #fff;
  border: 1px solid var(--dedsi-border-color);
  border-radius: 4px;
  font-size: 14px;
}

.box.primary {
  border-color: var(--dedsi-primary-color);
  color: var(--dedsi-primary-color);
}

.box.small {
  padding: 6px 12px;
  font-size: 12px;
}

.box.tall {
  height: 80px;
  display: flex;
  align-items: center;
}

.demo-group {
  display: flex;
  gap: 8px;
}

.demo-row span {
  display: block;
  font-size: 13px;
  color: var(--dedsi-text-secondary);
  margin-bottom: 8px;
}

.list-item {
  padding: 16px;
  background: #fff;
  border: 1px solid var(--dedsi-divider-color);
  border-radius: 6px;
  transition: all 0.2s;
}

.list-item:hover {
  border-color: var(--dedsi-primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-weight: 500;
  color: var(--dedsi-text-primary);
}

.item-desc {
  font-size: 12px;
  color: var(--dedsi-text-secondary);
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status {
  font-size: 12px;
  color: var(--dedsi-success-color);
  padding: 2px 8px;
  background: var(--dedsi-success-light);
  border-radius: 10px;
}

.action-link {
  font-size: 13px;
  color: var(--dedsi-primary-color);
  text-decoration: none;
}
</style>
