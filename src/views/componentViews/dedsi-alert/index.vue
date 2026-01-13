<template>
  <div class="dedsi-alert-demo">
    <h2 class="page-title">Dedsi Alert 警告提示</h2>
    <p class="page-desc">展示重要的提示信息。</p>

    <DedsiCard title="基础用法">
      <DedsiSpace direction="vertical" size="middle" fill>
        <DedsiAlert title="Success Text" type="success" />
        <DedsiAlert title="Info Text" type="info" />
        <DedsiAlert title="Warning Text" type="warning" />
        <DedsiAlert title="Error Text" type="error" />
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="显示图标 (Show Icon)">
      <DedsiSpace direction="vertical" size="middle" fill>
        <DedsiAlert title="Success Text" type="success" show-icon />
        <DedsiAlert title="Info Text" type="info" show-icon />
        <DedsiAlert title="Warning Text" type="warning" show-icon />
        <DedsiAlert title="Error Text" type="error" show-icon />
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="带有描述 (With Description)">
      <DedsiSpace direction="vertical" size="middle" fill>
        <DedsiAlert
          title="Success Tips"
          type="success"
          description="Detailed description and advice about successful copywriting."
          show-icon
        />
        <DedsiAlert
          title="Info Tips"
          type="info"
          description="Detailed description and advice about informational copywriting."
          show-icon
        />
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="可关闭 (Closable)">
      <DedsiSpace direction="vertical" size="middle" fill>
        <DedsiAlert title="Unclosable Alert" type="success" />
        <DedsiAlert title="Closable Alert" type="info" closable @close="onClose" />
        <DedsiAlert title="Custom Close Text" type="warning" closable close-text="Got it" />
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="文字居中 (Center)">
      <DedsiAlert title="Success Tips" type="success" center show-icon />
    </DedsiCard>
  </div>
</template>

<script setup lang="ts">
import { DedsiAlert, DedsiSpace, DedsiCard } from '@/components'

const onClose = (e: MouseEvent) => {
  console.log('Alert closed', e)
}
</script>

<style scoped>
.dedsi-alert-demo {
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
</style>
