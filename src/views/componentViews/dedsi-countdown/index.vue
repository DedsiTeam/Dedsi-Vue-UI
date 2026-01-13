<template>
  <div class="dedsi-countdown-demo">
    <h2 class="page-title">Dedsi Countdown 倒计时</h2>
    <p class="page-desc">用于展示倒计时数值。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="24">
          <DedsiCountdown title="倒计时" :value="deadline" />
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自定义格式">
        <DedsiSpace :size="24">
          <DedsiCountdown title="剩余时间" :value="deadline" format="D 天 H 时 m 分 s 秒" />
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="结合其他组件">
        <DedsiSpace :size="24">
          <DedsiCountdown title="活动截止" :value="deadline" :value-style="{ color: 'var(--dedsi-danger-color)' }">
            <template #prefix>
               <ClockCircleOutlined />
            </template>
            <template #suffix>
              <DedsiButton size="small" type="primary" style="margin-left: 12px">立即行动</DedsiButton>
            </template>
          </DedsiCountdown>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="完成回调">
        <DedsiSpace :size="24">
          <DedsiCountdown 
            title="限时抢购" 
            :value="shortDeadline" 
            @finish="handleFinish"
          />
          <DedsiButton size="small" @click="resetShortDeadline" style="margin-left: 24px">重置 (10秒)</DedsiButton>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiCountdown, DedsiButton, DedsiCard, DedsiSpace } from '@/components'
import { ClockCircleOutlined } from '@ant-design/icons-vue'

// 设置为明天此时
const deadline = ref(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 5)

const shortDeadline = ref(Date.now() + 1000 * 10)

const handleFinish = () => {
  console.log('Countdown finished!')
  alert('倒计时已结束！')
}

const resetShortDeadline = () => {
  shortDeadline.value = Date.now() + 1000 * 10
}
</script>

<style scoped>
.dedsi-countdown-demo {
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
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
