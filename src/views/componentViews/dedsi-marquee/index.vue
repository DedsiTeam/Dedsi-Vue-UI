<template>
  <div class="dedsi-marquee-demo">
    <h2 class="page-title">Dedsi Marquee 跑马灯</h2>
    <p class="page-desc">内容在区域内来回滚动，常用于展示长文本、公告或通知。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法 (来回滚动)">
        <div class="demo-box">
          <DedsiMarquee>
            <span class="marquee-text">
              🌟 欢迎使用 Dedsi Admin AI 极效后台组件库！这是一段非常长的文本，用来测试跑马灯的来回滚动效果。当文本超过容器宽度时，它会自动开始工作。
            </span>
          </DedsiMarquee>
        </div>
      </DedsiCard>

      <DedsiCard title="控制速度 (像素每秒)">
        <DedsiSpace direction="vertical" :size="16" style="width: 100%">
          <div class="demo-control">
            <label>当前速度: {{ speed }} px/s</label>
            <input type="range" v-model.number="speed" min="10" max="200" step="10" />
          </div>
          <div class="demo-box">
            <DedsiMarquee :speed="speed">
              <span class="marquee-text">
                🚀 动态调整速度示例：拖动上方的滑块即可实时改变滚动速率。当前速度为 {{ speed }} 像素每秒。
              </span>
            </DedsiMarquee>
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="滚动方向">
        <DedsiSpace direction="vertical" :size="16" style="width: 100%">
          <DedsiSpace :size="16">
            <DedsiButton @click="direction = 'rtl'">从右向左 (默认)</DedsiButton>
            <DedsiButton @click="direction = 'ltr'">从左向右</DedsiButton>
          </DedsiSpace>
          <div class="demo-box">
            <DedsiMarquee :direction="direction">
              <span class="marquee-text" style="color: var(--dedsi-primary-color); font-weight: bold;">
                当前方向: {{ direction === 'rtl' ? '右 -> 左' : '左 -> 右' }}。您可以点击上方按钮切换方向起点。
              </span>
            </DedsiMarquee>
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="复杂内容展示">
        <div class="demo-box" style="background: #000; border-radius: 4px;">
          <DedsiMarquee :speed="80">
            <div class="complex-content">
               <span v-for="n in 10" :key="n" class="tag">#热点话题 {{ n }}#</span>
            </div>
          </DedsiMarquee>
        </div>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiMarquee, DedsiButton, DedsiCard, DedsiSpace } from '@/components'

const speed = ref(60)
const direction = ref<'ltr' | 'rtl'>('rtl')
</script>

<style scoped>
.dedsi-marquee-demo {
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
  padding: 12px;
  background: var(--dedsi-bg-secondary);
  border-radius: 4px;
  margin-bottom: 16px;
}

.marquee-text {
  font-size: 15px;
  color: var(--dedsi-text-primary);
}

.demo-control {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.complex-content {
  display: flex;
  gap: 20px;
  padding: 4px 0;
}

.tag {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
}
</style>
