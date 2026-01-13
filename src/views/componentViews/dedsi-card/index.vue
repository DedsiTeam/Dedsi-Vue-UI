<template>
  <div class="dedsi-card-demo">
    <h2 class="page-title">Dedsi Card 卡片</h2>
    <p class="page-desc">通用卡片容器，包含标题、内容和操作区域。</p>

    <div class="demo-grid">
      <DedsiCard title="基础卡片">
        <p>这是一个最基础的卡片组件。内边距严格遵循 1rem (16px) 的规范。</p>
        <p>卡片可以包含文本、图片或其他任意组件。</p>
      </DedsiCard>

      <DedsiCard title="带操作的卡片">
        <template #extra>
          <DedsiButton size="small" type="primary">更多</DedsiButton>
        </template>
        <p>卡片右上角支持自定义操作区域。</p>
        <p>这里使用的是 DedsiButton 组件。</p>
      </DedsiCard>

      <DedsiCard title="可悬浮卡片" hoverable>
        <p>设置 hoverable 属性后，鼠标悬浮时会有位移和阴影增强效果。</p>
        <p>非常适合用于导航或功能入口。</p>
      </DedsiCard>

      <DedsiCard title="始终显示阴影" shadow="always">
        <p>可以配置阴影的显示时机，当前为始终显示。</p>
      </DedsiCard>

      <DedsiCard title="带页脚的卡片">
        <p>卡片中心主体内容区域。</p>
        <template #footer>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <DedsiButton size="small">取消</DedsiButton>
            <DedsiButton size="small" type="primary">确认</DedsiButton>
          </div>
        </template>
      </DedsiCard>

      <DedsiCard title="无边框卡片" :bordered="false" shadow="always">
        <p>在某些背景下，可以选择关闭边框，仅保留阴影。</p>
      </DedsiCard>

      <DedsiCard title="禁用阴影卡片" no-shadow>
        <p>设置 no-shadow 属性后，卡片将完全没有阴影效果。</p>
        <p>即便开启了 hoverable，也只有位移效果而没有阴影增强。</p>
      </DedsiCard>
    </div>

    <DedsiCard title="结合图片组件" style="margin-top: 24px;">
      <DedsiSpace size="large">
        <DedsiCard title="产品展示" hoverable style="width: 240px;">
          <DedsiImage 
            src="https://picsum.photos/400/300?id=10" 
            :preview="false" 
            style="margin-bottom: 12px; border-radius: 4px;"
          />
          <div style="font-weight: 600; font-size: 16px;">Dedsi Premium UI</div>
          <div style="color: var(--dedsi-text-secondary); margin-top: 4px;">致力打造极致体验</div>
        </DedsiCard>
      </DedsiSpace>
    </DedsiCard>
  </div>
</template>

<script setup lang="ts">
import { DedsiCard, DedsiButton, DedsiImage, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-card-demo {
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.demo-card {
  background: var(--dedsi-bg-color);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--dedsi-text-primary);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--dedsi-divider-color);
}
</style>
