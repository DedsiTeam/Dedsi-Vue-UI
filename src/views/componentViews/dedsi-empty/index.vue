<template>
  <div class="dedsi-empty-demo">
    <h2 class="page-title">Dedsi Empty 空状态</h2>
    <p class="page-desc">空状态时的展示占位图。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <div class="demo-box">
          <DedsiEmpty />
        </div>
      </DedsiCard>

      <DedsiCard title="自定义描述">
        <div class="demo-box">
          <DedsiEmpty description="这里什么都没有，去别处看看吧" />
        </div>
      </DedsiCard>

      <DedsiCard title="自定义内容 (带有按钮)">
        <div class="demo-box">
          <DedsiEmpty>
            <DedsiButton type="primary">即刻创建</DedsiButton>
          </DedsiEmpty>
        </div>
      </DedsiCard>

      <DedsiCard title="自定义图片 / 尺寸">
        <div class="demo-box">
          <DedsiEmpty 
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            :image-size="160"
            description="使用远程图片资源"
          >
            <DedsiButton>返回首页</DedsiButton>
          </DedsiEmpty>
        </div>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiEmpty, DedsiButton, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-empty-demo {
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

.demo-box {
  background: var(--dedsi-bg-secondary);
  border-radius: 4px;
  padding: 48px;
}
</style>
