<template>
  <div class="dedsi-divider-demo">
    <h2 class="page-title">Dedsi Divider 分割线</h2>
    <p class="page-desc">区隔内容的分割线。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <div class="demo-content">
          <p>
            桃花坞里桃花庵，桃花庵下桃花仙。
          </p>
          <DedsiDivider />
          <p>
            桃花仙人种桃树，又摘桃花换酒钱。
          </p>
        </div>
      </DedsiCard>

      <DedsiCard title="带有文字">
        <div class="demo-content">
          <p>纵使晴明无雨色，入云深处亦沾衣。</p>
          <DedsiDivider>中间文字</DedsiDivider>
          <p>人生如逆旅，我亦是行人。</p>
          <DedsiDivider content-position="left">左侧文字</DedsiDivider>
          <p>不畏浮云遮望眼，自缘身在最高层。</p>
          <DedsiDivider content-position="right">右侧文字</DedsiDivider>
        </div>
      </DedsiCard>

      <DedsiCard title="垂直分割线">
        <div class="demo-content">
          <span>文档</span>
          <DedsiDivider direction="vertical" />
          <span>代码</span>
          <DedsiDivider direction="vertical" />
          <span>演示</span>
        </div>
      </DedsiCard>

      <DedsiCard title="虚线">
        <div class="demo-content">
          <p>大漠孤烟直，长河落日圆。</p>
          <DedsiDivider dashed />
          <p>举头望明月，低头思故乡。</p>
          <DedsiDivider dashed>虚线文字</DedsiDivider>
        </div>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiDivider, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-divider-demo {
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

.demo-content {
  color: var(--dedsi-text-secondary);
  line-height: 1.6;
}
</style>
