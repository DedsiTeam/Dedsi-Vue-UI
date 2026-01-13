<template>
  <div class="dedsi-segmented-demo">
    <h2 class="page-title">Dedsi Segmented 分段控制器</h2>
    <p class="page-desc">分段控制器。用于展示多个选项并允许用户从中选择其一。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSegmented v-model="value1" :options="options1" />
      </DedsiCard>

      <DedsiCard title="自适应内容宽度">
        <DedsiSegmented v-model="value5" :options="options5" />
      </DedsiCard>

      <DedsiCard title="带有图标">
        <DedsiSegmented v-model="value2" :options="options2" @change="handleChange" />
      </DedsiCard>

      <DedsiCard title="尺寸">
        <DedsiSpace direction="vertical">
          <DedsiSegmented v-model="sizeValue" :options="options1" size="large" />
          <DedsiSegmented v-model="sizeValue" :options="options1" />
          <DedsiSegmented v-model="sizeValue" :options="options1" size="small" />
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="Block 模式 (撑满父容器)">
        <div style="width: 100%">
          <DedsiSegmented v-model="value3" :options="options1" block />
        </div>
      </DedsiCard>

      <DedsiCard title="禁用状态">
        <DedsiSpace direction="vertical">
          <DedsiSegmented v-model="value1" :options="options1" disabled />
          <DedsiSegmented v-model="value4" :options="options4" />
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { DedsiSegmented, DedsiSpace, DedsiCard } from '@/components'
import { AppstoreOutlined, BarsOutlined, TableOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons-vue'

const value1 = ref('Daily')
const options1 = [
  { label: 'Daily', value: 'Daily' },
  { label: 'Weekly', value: 'Weekly' },
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Yearly', value: 'Yearly' }
]

const value2 = ref('List')
const options2 = [
  { label: 'List', value: 'List', icon: h(BarsOutlined) },
  { label: 'Kanban', value: 'Kanban', icon: h(AppstoreOutlined) },
  { label: 'Grid', value: 'Grid', icon: h(TableOutlined) }
]

const value3 = ref('Daily')
const sizeValue = ref('Daily')

const value5 = ref('Small')
const options5 = [
  { label: 'S', value: 'Small' },
  { label: 'Medium Center', value: 'Medium' },
  { label: 'Very Long Content Here', value: 'Large' }
]

const value4 = ref('User')
const options4 = [
  { label: 'Profile', value: 'User', icon: h(UserOutlined) },
  { label: 'Password', value: 'Password', disabled: true },
  { label: 'Settings', value: 'Settings', icon: h(SettingOutlined) }
]

const handleChange = (val: any) => {
  console.log('Segmented change:', val)
}
</script>

<style scoped>
.dedsi-segmented-demo {
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
