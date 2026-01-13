<template>
  <div class="dedsi-skeleton-demo">
    <h2 class="page-title">Dedsi Skeleton 骨架屏</h2>
    <p class="page-desc">在需要等待加载内容的位置提供一个占位图形组合，减少用户等待焦虑。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSkeleton />
      </DedsiCard>

      <DedsiCard title="带有头像">
        <DedsiSkeleton avatar :paragraph="{ rows: 4 }" />
      </DedsiCard>

      <DedsiCard title="包含真实内容的加载态切换">
        <DedsiSpace direction="vertical" :size="24" style="width: 100%">
          <DedsiSpace align="center" style="margin-bottom: 24px;">
            <span>加载状态:</span>
            <DedsiButton @click="loading = !loading" type="primary" size="small">
              {{ loading ? '停止加载' : '开始加载' }}
            </DedsiButton>
          </DedsiSpace>
          <div class="article-demo">
            <DedsiSkeleton :loading="loading" avatar :paragraph="{ rows: 3 }" active>
              <div class="real-content">
                  <div class="avatar-mock">🚀</div>
                  <div class="text-data">
                    <h4>Dedsi Admin 核心架构分析</h4>
                    <p>骨架屏渲染完毕后，您现在看到的是真实的业务数据。通过 loading 属性可以平滑地在占位符与内容之间切换。</p>
                  </div>
              </div>
            </DedsiSkeleton>
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自定义行数与宽度">
        <DedsiSkeleton :title="false" :paragraph="{ rows: 5, width: [ '100%', '80%', '100%', '90%', '40%'] }" />
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiSkeleton, DedsiCard, DedsiSpace, DedsiButton } from '@/components'

const loading = ref(true)
</script>

<style scoped>
.dedsi-skeleton-demo {
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

.real-content {
  display: flex;
  gap: 16px;
}

.avatar-mock {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1px solid var(--dedsi-divider-color);
}

.text-data h4 {
  margin: 0 0 8px 0;
  color: var(--dedsi-text-primary);
}

.text-data p {
  margin: 0;
  font-size: 14px;
  color: var(--dedsi-text-secondary);
  line-height: 1.6;
}
</style>
