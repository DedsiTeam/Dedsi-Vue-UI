<template>
  <div class="dedsi-row-demo">
    <h2 class="page-title">Dedsi Layout 栅格</h2>
    <p class="page-desc">24 栅格系统。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基本使用">
        <p class="section-desc">简单的栅格布局。</p>
        <DedsiRow>
          <DedsiCol :span="12" class="demo-col">col-12</DedsiCol>
          <DedsiCol :span="12" class="demo-col light">col-12</DedsiCol>
        </DedsiRow>
        <DedsiRow>
          <DedsiCol :span="8" class="demo-col">col-8</DedsiCol>
          <DedsiCol :span="8" class="demo-col light">col-8</DedsiCol>
          <DedsiCol :span="8" class="demo-col">col-8</DedsiCol>
        </DedsiRow>
        <DedsiRow>
          <DedsiCol :span="6" class="demo-col">col-6</DedsiCol>
          <DedsiCol :span="6" class="demo-col light">col-6</DedsiCol>
          <DedsiCol :span="6" class="demo-col">col-6</DedsiCol>
          <DedsiCol :span="6" class="demo-col light">col-6</DedsiCol>
        </DedsiRow>
      </DedsiCard>

      <DedsiCard title="区块间隔">
        <p class="section-desc">推荐使用 (16+8n)px 作为栅格间隔。</p>
        <DedsiRow :gutter="16">
          <DedsiCol :span="6">
            <div class="demo-col-content">col-6</div>
          </DedsiCol>
          <DedsiCol :span="6">
            <div class="demo-col-content">col-6</div>
          </DedsiCol>
          <DedsiCol :span="6">
            <div class="demo-col-content">col-6</div>
          </DedsiCol>
          <DedsiCol :span="6">
            <div class="demo-col-content">col-6</div>
          </DedsiCol>
        </DedsiRow>
      </DedsiCard>

      <DedsiCard title="左右偏移">
        <p class="section-desc">使用 offset 可以将列向右侧偏。</p>
        <DedsiRow>
          <DedsiCol :span="8" class="demo-col">col-8</DedsiCol>
          <DedsiCol :span="8" :offset="8" class="demo-col light">col-8 offset-8</DedsiCol>
        </DedsiRow>
        <DedsiRow>
          <DedsiCol :span="6" :offset="6" class="demo-col">col-6 offset-6</DedsiCol>
          <DedsiCol :span="6" :offset="6" class="demo-col light">col-6 offset-6</DedsiCol>
        </DedsiRow>
        <DedsiRow>
          <DedsiCol :span="12" :offset="6" class="demo-col">col-12 offset-6</DedsiCol>
        </DedsiRow>
      </DedsiCard>

      <DedsiCard title="对齐">
        <p class="section-desc">子元素垂直对齐。</p>
        <div class="align-demo-section">
          <p>Align Top</p>
          <DedsiRow justify="center" align="top" class="demo-row-bg">
            <DedsiCol :span="4" class="demo-col" style="height: 100px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col light" style="height: 50px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col" style="height: 120px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col light" style="height: 80px">col-4</DedsiCol>
          </DedsiRow>
          
          <p>Align Middle</p>
          <DedsiRow justify="space-around" align="middle" class="demo-row-bg">
            <DedsiCol :span="4" class="demo-col" style="height: 100px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col light" style="height: 50px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col" style="height: 120px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col light" style="height: 80px">col-4</DedsiCol>
          </DedsiRow>

           <p>Align Bottom</p>
          <DedsiRow justify="space-between" align="bottom" class="demo-row-bg">
            <DedsiCol :span="4" class="demo-col" style="height: 100px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col light" style="height: 50px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col" style="height: 120px">col-4</DedsiCol>
            <DedsiCol :span="4" class="demo-col light" style="height: 80px">col-4</DedsiCol>
          </DedsiRow>
        </div>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiRow, DedsiCol, DedsiSpace, DedsiCard } from '@/components'
</script>

<style scoped>
.dedsi-row-demo {
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

.section-desc {
  font-size: 14px;
  color: var(--dedsi-text-secondary);
  margin-bottom: 16px;
}

/* Demo specific styles */
.demo-col {
  background: #0092ff;
  color: #fff;
  min-height: 30px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 8px;
}

.demo-col.light {
  background: #69c0ff;
}

.demo-col-content {
  background: #0092ff;
  color: #fff;
  min-height: 30px;
  text-align: center;
  line-height: 30px;
}

:deep(.dedsi-row) {
  margin-bottom: 16px; 
}
:deep(.dedsi-row:last-child) {
  margin-bottom: 0;
}

.demo-row-bg {
    background-color: #f5f5f5;
    padding: 16px 0;
}

.align-demo-section > p {
    margin: 12px 0 8px;
    font-weight: 500;
}
</style>
