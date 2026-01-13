<template>
  <div class="dedsi-tabs-demo">
    <h2 class="page-title">Dedsi Tabs 标签页</h2>
    <p class="page-desc">分隔内容上有关联但属于不同类别的部分。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiTabs v-model="activeTab1">
          <DedsiTabPane label="用户管理" name="user">用户管理内容</DedsiTabPane>
          <DedsiTabPane label="配置管理" name="config">配置管理内容</DedsiTabPane>
          <DedsiTabPane label="角色管理" name="role">角色管理内容</DedsiTabPane>
          <DedsiTabPane label="定时任务" name="task">定时任务内容</DedsiTabPane>
        </DedsiTabs>
      </DedsiCard>

      <DedsiCard title="禁用状态">
        <DedsiTabs v-model="activeTab2">
          <DedsiTabPane label="可用标签" name="tab1">欢迎使用</DedsiTabPane>
          <DedsiTabPane label="禁用标签" name="tab2" disabled>你看不到我</DedsiTabPane>
          <DedsiTabPane label="又一个可用" name="tab3">这里又是正常的</DedsiTabPane>
        </DedsiTabs>
      </DedsiCard>

      <DedsiCard title="结合其他组件">
        <DedsiTabs v-model="activeTab3">
          <DedsiTabPane label="表格示例" name="table">
            <div style="padding-top: 16px;">
              <DedsiAlert title="提示：这是在 Tab 中的表格" show-icon style="margin-bottom: 16px;" />
              <DedsiTable
                :data="miniData"
                :columns="miniColumns"
                :total="3"
                :page-size="5"
                bordered
              />
            </div>
          </DedsiTabPane>
          <DedsiTabPane label="按钮示例" name="button">
            <div style="padding-top: 16px;">
              <DedsiSpace>
                <DedsiButton type="primary">确认</DedsiButton>
                <DedsiButton>取消</DedsiButton>
              </DedsiSpace>
            </div>
          </DedsiTabPane>
        </DedsiTabs>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiTabs, DedsiTabPane, DedsiTable, DedsiButton, DedsiSpace, DedsiAlert, DedsiCard, type Column } from '@/components'

const activeTab1 = ref('user')
const activeTab2 = ref('tab1')
const activeTab3 = ref('table')

const miniColumns: Column[] = [
  { key: 'id', title: 'ID', width: '60px' },
  { key: 'name', title: '名称' }
]

const miniData = [
  { id: 1, name: '项目 A' },
  { id: 2, name: '项目 B' },
  { id: 3, name: '项目 C' }
]
</script>

<style scoped>
.dedsi-tabs-demo {
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
