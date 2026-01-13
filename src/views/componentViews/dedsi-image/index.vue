<template>
  <div class="dedsi-image-demo">
    <h2 class="page-title">Dedsi Image 图片</h2>
    <p class="page-desc">支持预览、缩放、旋转以及多图查看的图片组件。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="24">
          <DedsiImage 
            src="https://picsum.photos/400/300?id=1" 
            width="200" 
            height="150" 
          />
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="适应方式 (Fit)">
        <DedsiSpace :size="24">
          <DedsiSpace size="large">
            <div class="image-item">
              <p>Cover</p>
              <DedsiImage 
                src="https://picsum.photos/400/300?id=2" 
                width="150" 
                height="150" 
                fit="cover" 
              />
            </div>
            <div class="image-item">
              <p>Contain</p>
              <DedsiImage 
                src="https://picsum.photos/400/300?id=3" 
                width="150" 
                height="150" 
                fit="contain" 
                background="#f5f5f5"
              />
            </div>
            <div class="image-item">
              <p>Fill</p>
              <DedsiImage 
                src="https://picsum.photos/400/300?id=4" 
                width="150" 
                height="150" 
                fit="fill" 
              />
            </div>
          </DedsiSpace>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="多图预览">
        <DedsiSpace :size="24" direction="vertical">
          <DedsiImage 
            src="https://picsum.photos/400/300?id=5" 
            width="200" 
            height="150" 
            :preview-src-list="srcList"
          />
          <p style="color: var(--dedsi-text-secondary); font-size: 14px;">
            点击图片可循环预览下方列表中的所有图片
          </p>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="禁用预览">
        <DedsiSpace :size="24" direction="vertical">
          <DedsiImage 
            src="https://picsum.photos/400/300?id=6" 
            width="200" 
            height="150" 
            :preview="false"
          />
          <p style="color: var(--dedsi-text-secondary); font-size: 14px;">
            设置 :preview="false" 后无 Hover 提示，点击不触发预览
          </p>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiImage, DedsiSpace, DedsiCard } from '@/components'

const srcList = [
  'https://picsum.photos/800/600?id=10',
  'https://picsum.photos/800/600?id=11',
  'https://picsum.photos/800/600?id=12',
  'https://picsum.photos/800/600?id=13'
]
</script>

<style scoped>
.dedsi-image-demo {
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
  flex-direction: column;
  align-items: flex-start;
}

.image-item {
  text-align: center;
}

.image-item p {
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--dedsi-text-secondary);
}
</style>
