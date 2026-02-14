<template>
  <div class="dedsi-table-demo">
    <h2 class="page-title">Dedsi Table 表格组件</h2>
    <p class="page-desc">基于 Vue3 的表格组件，支持分页与左右固定列</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法（固定列）">
        <DedsiTable
          :data="tableData"
          :columns="columns"
          :total="total"
          :page-size="pageSize"
          index-fixed
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
          bordered
          show-index
        >
          <template #status="{ value }">
            <DedsiTag :type="value === 'active' ? 'success' : 'danger'">
              {{ value === 'active' ? '正常' : '禁用' }}
            </DedsiTag>
          </template>
          <template #action="{ row }">
            <DedsiSpace size="small">
              <DedsiButton size="small" @click="handleEdit(row)">编辑</DedsiButton>
              <DedsiButton size="small" danger @click="handleDelete(row)">删除</DedsiButton>
            </DedsiSpace>
          </template>
        </DedsiTable>
      </DedsiCard>
      
      <DedsiCard title="启用序号列">
        <DedsiTable
          :data="tableData.slice(0, 5)"
          :columns="columns.slice(1)"
          :total="5"
          :page-size="5"
          show-index
          bordered
        />
      </DedsiCard>

      <DedsiCard title="禁用分页">
        <DedsiTable
          :data="tableData.slice(0, 5)"
          :columns="columns.slice(1)"
          :total="5"
          :pagination="false"
          bordered
        />
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiTable, DedsiButton, DedsiTag, DedsiSpace, DedsiCard, type Column } from '@/components'

// 列配置
const columns: Column[] = [
  { key: 'id', title: 'ID', width: '80px', fixed: 'left' },
  { key: 'name', title: '姓名', width: '140px', align: 'center', fixed: 'left' },
  { key: 'email', title: '邮箱', width: '220px' },
  { key: 'phone', title: '手机号', width: '160px' },
  { key: 'role', title: '角色', width: '140px', align: 'center' },
  { key: 'department', title: '部门', width: '120px', align: 'center' },
  { key: 'joinDate', title: '入职日期', width: '140px', align: 'center' },
  { key: 'status', title: '状态', width: '100px', align: 'center' },
  { key: 'address', title: '地址', width: '240px' },
  { key: 'action', title: '操作', width: '160px', fixed: 'right' }
]

// 生成示例数据
const generateData = () => {
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十']
  const departments = ['技术部', '产品部', '设计部', '市场部', '运营部']
  const roles = ['前端工程师', '后端工程师', '产品经理', 'UI设计师', '测试工程师']
  const data = []
  
  for (let i = 1; i <= 10; i++) {
    data.push({
      id: i,
      name: names[i % names.length],
      email: `user${i}@dedsi.com`,
      phone: `1380000${String(i).padStart(4, '0')}`,
      role: roles[i % roles.length],
      department: departments[i % departments.length],
      joinDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      status: i % 3 === 0 ? 'inactive' : 'active',
      address: `上海市浦东新区世纪大道 ${i * 10} 号`
    })
  }
  return data
}

const tableData = ref(generateData())
const total = ref(56)
const pageSize = ref(10)

// 页码变化
const handlePageChange = (page: number) => {
  console.log('当前页:', page)
}

// 每页条数变化
const handlePageSizeChange = (size: number) => {
  console.log('每页条数:', size)
  pageSize.value = size
}

// 编辑
const handleEdit = (row: any) => {
  console.log('编辑:', row)
  alert(`编辑用户: ${row.name}`)
}

// 删除
const handleDelete = (row: any) => {
  console.log('删除:', row)
  alert(`删除用户: ${row.name}`)
}
</script>

<style scoped>
.dedsi-table-demo {
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
