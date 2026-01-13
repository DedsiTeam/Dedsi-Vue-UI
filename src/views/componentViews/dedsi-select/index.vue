<template>
  <div class="dedsi-select-demo">
    <h2 class="page-title">Dedsi Select 下拉框组件</h2>
    <p class="page-desc">基于 Vue3 的下拉框组件，支持 v-model 双向绑定</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace direction="vertical" :size="16" style="width: 100%">
          <DedsiSpace :size="24" wrap>
            <div class="demo-item">
              <label class="demo-label">状态选择：</label>
              <DedsiSelect
                v-model="status"
                :options="statusOptions"
                placeholder="请选择状态"
                @change="handleChange"
              />
            </div>
            <div class="demo-item">
              <label class="demo-label">部门选择：</label>
              <DedsiSelect
                v-model="department"
                :options="departmentOptions"
                placeholder="请选择部门"
              />
            </div>
          </DedsiSpace>
          <div class="demo-result">
            当前选中：状态 = <code>{{ status || '未选择' }}</code>，部门 = <code>{{ department || '未选择' }}</code>
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="禁用状态">
        <DedsiSelect
          v-model="disabledValue"
          :options="statusOptions"
          placeholder="禁用状态"
          disabled
        />
      </DedsiCard>

      <DedsiCard title="大量选项">
        <DedsiSelect
          v-model="city"
          :options="cityOptions"
          placeholder="请选择城市"
        />
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiSelect, type SelectOption, DedsiCard, DedsiSpace } from '@/components'

const status = ref<string>()
const department = ref<string>()
const disabledValue = ref<string>('active')
const city = ref<string>()

// 状态选项
const statusOptions: SelectOption[] = [
  { label: '已启用', value: 'active' },
  { label: '已禁用', value: 'inactive' },
  { label: '待审核', value: 'pending' }
]

// 部门选项
const departmentOptions: SelectOption[] = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
  { label: '市场部', value: 'market' },
  { label: '运营部', value: 'operation' }
]

// 城市选项
const cityOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '南京', value: 'nanjing' },
  { label: '成都', value: 'chengdu' },
  { label: '武汉', value: 'wuhan' },
  { label: '西安', value: 'xian' },
  { label: '重庆', value: 'chongqing' }
]

const handleChange = (value: string | number) => {
  console.log('状态变更:', value)
}
</script>

<style scoped>
.dedsi-select-demo {
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

.demo-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-label {
  font-size: 14px;
  color: #666;
}

.demo-result {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
}

.demo-result code {
  background: #e6f7ff;
  color: var(--primary-color, #1677ff);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}
</style>
