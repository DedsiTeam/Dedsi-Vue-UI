<template>
  <div class="dedsi-modal-demo">
    <h2 class="page-title">Dedsi Modal 模态框</h2>
    <p class="page-desc">
      模态对话框，用于在当前页面打开一个浮层展示内容。
      <br/>
      <strong>注意：</strong> Modal 组件不包含固定页脚，交互逻辑由承载的内容自行实现。
    </p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="16">
          <DedsiButton type="primary" @click="visible1 = true">打开模态框</DedsiButton>
          <DedsiModal v-model:visible="visible1" title="基础展示">
            <p>这是一个去除了标准页脚的模态框。</p>
            <p>您可以随心所欲地在主体区域布置内容和操作按钮。</p>
            <div style="margin-top: 24px; text-align: right;">
               <DedsiButton @click="visible1 = false">在内容区控制关闭</DedsiButton>
            </div>
          </DedsiModal>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="垂直居中与自定义尺寸">
        <DedsiSpace :size="16">
          <DedsiButton @click="visible2 = true">展示超宽居中框</DedsiButton>
          <DedsiModal v-model:visible="visible2" title="居中展示" centered width="800px">
            <p>模态框将在视口垂直居中显示，并且宽度设置为 800px。</p>
            <DedsiEmpty description="模态框内展示复杂组件" />
          </DedsiModal>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="完全定制化标题">
        <DedsiSpace :size="16">
          <DedsiButton @click="visible3 = true">带图标的标题</DedsiButton>
          <DedsiModal v-model:visible="visible3">
            <template #title>
               <span style="color: var(--dedsi-primary-color); display: flex; align-items: center; gap: 8px;">
                  <InfoCircleOutlined /> 系统详情
               </span>
            </template>
            <p>通过使用 #title 插槽，您可以完全控制标题部分的 UI。</p>
          </DedsiModal>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiModal, DedsiButton, DedsiEmpty, DedsiCard, DedsiSpace } from '@/components'
import { InfoCircleOutlined } from '@ant-design/icons-vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>

<style scoped>
.dedsi-modal-demo {
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
  line-height: 1.6;
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
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
