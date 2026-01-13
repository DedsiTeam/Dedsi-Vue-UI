<template>
  <div class="dedsi-typography-demo">
    <h2 class="page-title">Dedsi Typography 排版</h2>
    <p class="page-desc">展示标题、段落、列表内容，以及文本的基础操作（拷贝、省略、编辑）。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="标题组件">
        <DedsiSpace direction="vertical" :size="0">
          <DedsiTypography tag="h1">h1. Dedsi Admin</DedsiTypography>
          <DedsiTypography tag="h2">h2. Dedsi Admin</DedsiTypography>
          <DedsiTypography tag="h3">h3. Dedsi Admin</DedsiTypography>
          <DedsiTypography tag="h4">h4. Dedsi Admin</DedsiTypography>
          <DedsiTypography tag="h5">h5. Dedsi Admin</DedsiTypography>
          <DedsiTypography tag="h6">h6. Dedsi Admin</DedsiTypography>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="文本样式">
        <DedsiSpace direction="vertical" :size="12">
          <DedsiTypography>Dedsi Admin (Default)</DedsiTypography>
          <DedsiTypography type="secondary">Dedsi Admin (Secondary)</DedsiTypography>
          <DedsiTypography type="success">Dedsi Admin (Success)</DedsiTypography>
          <DedsiTypography type="warning">Dedsi Admin (Warning)</DedsiTypography>
          <DedsiTypography type="danger">Dedsi Admin (Danger)</DedsiTypography>
          <DedsiTypography disabled>Dedsi Admin (Disabled)</DedsiTypography>
          <DedsiTypography mark>Dedsi Admin (Mark)</DedsiTypography>
          <DedsiTypography code>Dedsi Admin (Code)</DedsiTypography>
          <DedsiTypography underline>Dedsi Admin (Underline)</DedsiTypography>
          <DedsiTypography delete>Dedsi Admin (Delete)</DedsiTypography>
          <DedsiTypography strong>Dedsi Admin (Strong)</DedsiTypography>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="可交互操作">
        <DedsiSpace direction="vertical" :size="12">
          <div class="demo-item">
            <span class="label">可点击拷贝: </span>
            <DedsiTypography copyable>点击右侧图标即可拷贝这段文字</DedsiTypography>
          </div>
          <div class="demo-item">
            <span class="label">可编辑文本: </span>
            <DedsiTypography editable @change="handleTextChange">{{ editableText }}</DedsiTypography>
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="省略号展示">
        <DedsiSpace direction="vertical" :size="12">
          <div class="demo-box">
            <p class="label">单行省略:</p>
            <DedsiTypography ellipsis style="width: 200px">
              这是一段非常长的文字，为了演示单行省略的效果，我们需要它超出容器的宽度。
            </DedsiTypography>
          </div>
          <div class="demo-box">
            <p class="label">多行省略 (3行):</p>
            <DedsiTypography :ellipsis="{ rows: 3 }" style="width: 300px">
              Dedsi Admin 是一个基于 Vue3 + TypeScript 的现代后台管理系统。它提供了丰富的 UI 组件库，极佳的交互体验，以及高度可定制的设计系统。无论你是开发中后台系统、SaaS 平台还是大数据可视化应用，Dedsi 都能为你提供强有力的支持。
            </DedsiTypography>
          </div>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiTypography, DedsiCard, DedsiSpace } from '@/components'

const editableText = ref('这是一段可以被编辑的文字，点击右侧铅笔图标。')

const handleTextChange = (val: string) => {
  console.log('Text changed:', val)
  editableText.value = val
}
</script>

<style scoped>
.dedsi-typography-demo {
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
  align-items: center;
}

.label {
  font-size: 14px;
  color: var(--dedsi-text-secondary);
  margin-right: 12px;
  min-width: 100px;
}

.demo-box {
  padding: 12px;
  border: 1px dashed var(--dedsi-border-color);
  border-radius: 4px;
}
</style>
