<template>
  <div class="dedsi-statistic-demo">
    <h2 class="page-title">Dedsi Statistic 统计数值</h2>
    <p class="page-desc">展示统计数据，支持滚动动画和格式化。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="64" align="end" wrap>
          <DedsiStatistic title="活跃用户" :value="112893" />
          <DedsiStatistic title="账户余额 (CNY)" :value="112893" :precision="2" />
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="千分位控制">
        <DedsiSpace :size="64" align="end" wrap>
          <div class="demo-item">
            <p class="demo-item-label">显示千分位 (默认)</p>
            <DedsiStatistic :value="1234567.89" :precision="2" />
          </div>
          <div class="demo-item">
            <p class="demo-item-label">不显示千分位</p>
            <DedsiStatistic :value="1234567.89" :precision="2" :show-group="false" />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="前缀与后缀">
        <DedsiSpace :size="64" align="end" wrap>
          <DedsiStatistic title="反馈率" :value="11.28" suffix="%" :content-style="{ color: 'var(--dedsi-primary-color)' }" />
          <DedsiStatistic title="闲置资产" :value="9.3" :precision="2" prefix="$" />
          <DedsiStatistic title="下载量" :value="2688" :content-style="{ color: 'var(--dedsi-success-color)' }">
            <template #suffix>
              <ArrowUpOutlined />
            </template>
          </DedsiStatistic>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="精度控制">
        <DedsiSpace direction="vertical" :size="24" style="width: 100%">
          <DedsiSpace :size="64" align="end" wrap>
            <div class="demo-item">
              <p class="demo-item-label">整数 (precision=0)</p>
              <DedsiStatistic :value="1234.5678" :precision="0" />
            </div>
            <div class="demo-item">
              <p class="demo-item-label">两位小数 (precision=2)</p>
              <DedsiStatistic :value="1234.5678" :precision="2" />
            </div>
            <div class="demo-item">
              <p class="demo-item-label">四位小数 (precision=4)</p>
              <DedsiStatistic :value="1234.5678" :precision="4" />
            </div>
          </DedsiSpace>
          <div class="demo-action">
            <span style="font-size: 14px; margin-right: 12px; color: var(--dedsi-text-secondary)">动态切换精度:</span>
            <DedsiSpace :size="8">
              <DedsiButton size="small" @click="currentPrecision = 0">整数</DedsiButton>
              <DedsiButton size="small" @click="currentPrecision = 1">一位</DedsiButton>
              <DedsiButton size="small" @click="currentPrecision = 2">两位</DedsiButton>
              <DedsiButton size="small" @click="currentPrecision = 3">三位</DedsiButton>
            </DedsiSpace>
            <DedsiStatistic title="实时预览" :value="1989.1225" :precision="currentPrecision" style="margin-left: 48px" />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="动画控制">
        <DedsiSpace :size="64" align="end" wrap>
          <div class="demo-item">
            <p class="demo-item-label">开启动画 (默认)</p>
            <DedsiStatistic :value="4567.89" :precision="2" />
          </div>
          <div class="demo-item">
            <p class="demo-item-label">禁用动画 (animation=false)</p>
            <DedsiStatistic :value="4567.89" :precision="2" :animation="false" />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="滚动动画">
        <DedsiSpace :size="64" align="end" wrap>
          <div class="demo-item">
            <p class="demo-item-label">默认动画 (1500ms)</p>
            <DedsiStatistic :value="targetValue" />
          </div>
          <div class="demo-item">
            <p class="demo-item-label">快速动画 (500ms)</p>
            <DedsiStatistic :value="targetValue" :duration="500" />
          </div>
          <div class="demo-item">
            <p class="demo-item-label">慢速动画 (3000ms)</p>
            <DedsiStatistic :value="targetValue" :duration="3000" />
          </div>
          <DedsiButton @click="refreshValue">更新数值</DedsiButton>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiStatistic, DedsiButton, DedsiCard, DedsiSpace } from '@/components'
import { ArrowUpOutlined } from '@ant-design/icons-vue'

const targetValue = ref(826.5)
const currentPrecision = ref(2)

const refreshValue = () => {
  targetValue.value = Math.random() * 1000 + 500
}
</script>

<style scoped>
.dedsi-statistic-demo {
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

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-item-label {
  font-size: 12px;
  color: var(--dedsi-text-placeholder);
}

.demo-action {
  padding-top: 24px;
  border-top: 1px dashed var(--dedsi-divider-color);
  display: flex;
  align-items: center;
}
</style>
