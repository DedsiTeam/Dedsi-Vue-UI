<template>
  <div class="dedsi-table-wrapper">
    <!-- 表格 -->
    <table class="dedsi-table" :class="{ 'dedsi-table-bordered': bordered }">
      <colgroup>
        <col v-if="showIndex" width="70px" />
        <col v-for="col in columns" :key="col.key" :style="{ width: col.width }" />
      </colgroup>
      <thead>
        <tr>
          <th v-if="showIndex" style="text-align: center">{{ indexColumnTitle }}</th>
          <th v-for="col in columns" :key="col.key" :style="{ textAlign: col.align || 'left' }">
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-if="showIndex" style="text-align: center">
            {{ (currentPage - 1) * pageSize + rowIndex + 1 }}
          </td>
          <td v-for="col in columns" :key="col.key" :style="{ textAlign: col.align || 'left' }">
            <slot :name="col.key" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="showIndex ? columns.length + 1 : columns.length" class="dedsi-table-empty">
            暂无数据
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页 -->
    <div class="dedsi-pagination" v-if="pagination && totalPages > 1">
      <span class="dedsi-pagination-info">
        当前第 <span class="dedsi-pagination-current">{{ currentPage }}</span> / {{ totalPages }} 页，
        每页 <span class="dedsi-pagination-total">{{ pageSize }}</span> 条，
        共 <span class="dedsi-pagination-total">{{ total }}</span> 条
      </span>
      <button 
        class="dedsi-pagination-btn" 
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        ‹
      </button>
      
      <template v-for="page in displayPages" :key="page">
        <span v-if="page === '...'" class="dedsi-pagination-ellipsis">...</span>
        <button 
          v-else
          class="dedsi-pagination-btn"
          :class="{ active: currentPage === page }"
          @click="changePage(page as number)"
        >
          {{ page }}
        </button>
      </template>

      <button 
        class="dedsi-pagination-btn" 
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        ›
      </button>

      <div class="dedsi-pagination-sizes">
        <DedsiSelect
          v-model:value="localPageSize"
          :options="pageSizeOptions"
          style="width: 110px"
          @update:model-value="handlePageSizeChange"
        />
        <span class="dedsi-pagination-sizes-text">条/页</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DedsiSelect } from '../dedsi-select'

export interface Column {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface Props {
  data: Record<string, any>[]
  columns: Column[]
  total: number
  pageSize?: number
  bordered?: boolean
  showIndex?: boolean
  indexColumnTitle?: string
  pagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  bordered: false,
  showIndex: false,
  indexColumnTitle: '序号',
  pagination: true
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'page-size-change', pageSize: number): void
}>()

const currentPage = ref(1)

// 本地的每页条数，用于双向绑定
const localPageSize = ref(props.pageSize)

// 监听 props.pageSize 的变化，同步到 localPageSize
watch(() => props.pageSize, (newSize) => {
  localPageSize.value = newSize
})

const pageSizeOptions = [
  { label: '10 条/页', value: 10 },
  { label: '20 条/页', value: 20 },
  { label: '50 条/页', value: 50 },
  { label: '100 条/页', value: 100 }
]

const handlePageSizeChange = (val: string | number) => {
  const size = typeof val === 'string' ? parseInt(val) : val
  emit('page-size-change', size)
  // 当切换页码大小时，通常回到第一页
  changePage(1)
}

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / localPageSize.value))

// 计算显示的页码
const displayPages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) pages.push(i)
    
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }
  
  return pages
})

// 切换页码
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  emit('page-change', page)
}

// 监听 total 变化，重置页码
watch(() => props.total, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value)
  }
})

// 导出 pageSize 供模板使用（计算总页数等）
const pageSize = computed(() => localPageSize.value)
</script>

<style scoped>
.dedsi-table-wrapper {
  width: 100%;
}

.dedsi-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--dedsi-bg-color);
}

.dedsi-table th,
.dedsi-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--dedsi-border-color);
}

.dedsi-table th {
  background: var(--dedsi-bg-secondary);
  font-weight: 500;
  color: var(--dedsi-text-primary);
  font-size: 14px;
}

.dedsi-table td {
  color: var(--dedsi-text-secondary);
  font-size: 14px;
}

.dedsi-table tbody tr:hover {
  background: var(--dedsi-bg-secondary);
}

.dedsi-table tbody tr:last-child td {
  border-bottom: none;
}

/* 边框样式 */
.dedsi-table-bordered {
  border-top: 1px solid var(--dedsi-border-color);
  border-left: 1px solid var(--dedsi-border-color);
  border-bottom: 1px solid var(--dedsi-border-color);
}

.dedsi-table-bordered th,
.dedsi-table-bordered td {
  border-right: 1px solid var(--dedsi-border-color);
  border-bottom: 1px solid var(--dedsi-border-color);
}

.dedsi-table-empty {
  text-align: center !important;
  color: var(--dedsi-text-placeholder);
  padding: 40px 16px !important;
}

/* 分页 */
.dedsi-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.dedsi-pagination-info {
  font-size: 14px;
  color: var(--dedsi-text-secondary);
}

.dedsi-pagination-sizes {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
}

.dedsi-pagination-sizes-text {
  font-size: 14px;
  color: var(--dedsi-text-secondary);
}

.dedsi-pagination-total,
.dedsi-pagination-current {
  color: var(--dedsi-primary-color);
  font-weight: 500;
}

.dedsi-pagination-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--dedsi-border-color);
  background: var(--dedsi-bg-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: var(--dedsi-text-primary);
  transition: all 0.2s;
}

.dedsi-pagination-btn:hover:not(:disabled) {
  border-color: var(--dedsi-primary-color);
  color: var(--dedsi-primary-color);
}

.dedsi-pagination-btn.active {
  background: var(--dedsi-primary-color);
  border-color: var(--dedsi-primary-color);
  color: #fff;
}

.dedsi-pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.dedsi-pagination-ellipsis {
  padding: 0 8px;
  color: var(--dedsi-text-placeholder);
}
</style>
