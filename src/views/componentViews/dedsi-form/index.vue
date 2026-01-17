<template>
  <div class="dedsi-form-demo">
    <h2 class="page-title">Dedsi Form 表单组件</h2>
    <p class="page-desc">具有数据收集、校验和提交功能的表单。</p>

    <DedsiCard title="Ant Design Vue 官方文档">
      <p class="mb-4">查看 DedsiForm 组件的详细文档和更多示例：</p>
      <DedsiButton type="primary" @click="goToDocs">
        访问 Ant Design Vue Form 文档
      </DedsiButton>
    </DedsiCard>
  </div>
</template>

<script setup lang="ts">
import { DedsiCard, DedsiButton } from '@/components'

const goToDocs = () => {
  window.open('https://antdv.com/components/form-cn', '_blank')
}
</script>

<style scoped>
.dedsi-form-demo {
  padding: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}
</style>
