<template>
  <div class="dedsi-time-range-picker-demo">
    <h2 class="page-title">DedsiTimeRangePicker 时间范围选择器组件</h2>
    <p class="page-desc">输入或选择时间范围的控件。</p>

    <DedsiCard title="Ant Design Vue 官方文档">
      <p class="mb-4">查看 DedsiTimeRangePicker 组件的详细文档和更多示例：</p>
      <DedsiButton type="primary" @click="goToDocs">
        访问 Ant Design Vue DatePicker 文档
      </DedsiButton>
    </DedsiCard>
  </div>
</template>

<script setup lang="ts">
import { DedsiCard, DedsiButton } from '@/components'

const goToDocs = () => {
  window.open('https://antdv.com/components/date-picker-cn', '_blank')
}
</script>

<style scoped>
.dedsi-time-range-picker-demo {
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
