<template>
  <div class="dedsi-table-wrapper">
    <div class="dedsi-table-scroll">
      <!-- 表格 -->
      <table class="dedsi-table" :class="{ 'dedsi-table-bordered': bordered }">
      <colgroup>
        <col v-if="showIndex" width="70px" />
        <col v-for="col in columns" :key="col.key" :style="{ width: col.width }" />
      </colgroup>
      <thead>
        <tr>
          <th
            v-if="showIndex"
            :class="getIndexFixedCellClass()"
            :style="getIndexCellStyle(true)"
          >
            {{ indexColumnTitle }}
          </th>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="getFixedCellClass(col)"
            :style="{ textAlign: col.align || 'left', ...getFixedCellStyle(col, true) }"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td
            v-if="showIndex"
            :class="getIndexFixedCellClass()"
            :style="getIndexCellStyle(false)"
          >
            {{ (currentPage - 1) * pageSize + rowIndex + 1 }}
          </td>
          <td
            v-for="col in columns"
            :key="col.key"
            :class="getFixedCellClass(col)"
            :style="{ textAlign: col.align || 'left', ...getFixedCellStyle(col, false) }"
          >
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
    </div>

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
          @change="handlePageSizeChange"
        />
        <span class="dedsi-pagination-sizes-text">条/页</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type CSSProperties } from 'vue'
import { DedsiSelect } from '../dedsi-select'

export interface Column {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
}

interface Props {
  data: Record<string, any>[]
  columns: Column[]
  total: number
  pageSize?: number
  bordered?: boolean
  showIndex?: boolean
  indexFixed?: boolean
  indexColumnTitle?: string
  pagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  bordered: false,
  showIndex: false,
  indexFixed: false,
  indexColumnTitle: '序号',
  pagination: true
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'page-size-change', pageSize: number): void
}>()

const DEFAULT_COLUMN_WIDTH = 120
const INDEX_COLUMN_WIDTH = 70

const parseColumnWidth = (width?: string) => {
  if (!width) return DEFAULT_COLUMN_WIDTH

  const pxMatch = width.trim().match(/^(\d+(\.\d+)?)px$/)
  if (pxMatch) {
    return Number(pxMatch[1])
  }

  const numericWidth = Number.parseFloat(width)
  return Number.isFinite(numericWidth) ? numericWidth : DEFAULT_COLUMN_WIDTH
}

const leftFixedOffsets = computed(() => {
  const offsets: Record<string, number> = {}
  let offset = props.showIndex && props.indexFixed ? INDEX_COLUMN_WIDTH : 0

  props.columns.forEach((col) => {
    if (col.fixed === 'left') {
      offsets[col.key] = offset
      offset += parseColumnWidth(col.width)
    }
  })

  return offsets
})

const rightFixedOffsets = computed(() => {
  const offsets: Record<string, number> = {}
  let offset = 0

  for (let i = props.columns.length - 1; i >= 0; i--) {
    const col = props.columns[i]
    if (!col) continue
    if (col.fixed === 'right') {
      offsets[col.key] = offset
      offset += parseColumnWidth(col.width)
    }
  }

  return offsets
})

const leftFixedKeys = computed(() => props.columns.filter(col => col.fixed === 'left').map(col => col.key))
const rightFixedKeys = computed(() => props.columns.filter(col => col.fixed === 'right').map(col => col.key))

const getFixedCellClass = (col: Column) => {
  const classes: string[] = []

  if (!col.fixed) return classes

  classes.push('dedsi-table-cell-fixed')

  if (col.fixed === 'left') {
    classes.push('dedsi-table-cell-fixed-left')
    if (leftFixedKeys.value[leftFixedKeys.value.length - 1] === col.key) {
      classes.push('dedsi-table-cell-fixed-left-last')
    }
  }

  if (col.fixed === 'right') {
    classes.push('dedsi-table-cell-fixed-right')
    if (rightFixedKeys.value[0] === col.key) {
      classes.push('dedsi-table-cell-fixed-right-first')
    }
  }

  return classes
}

const getFixedCellStyle = (col: Column, isHeader = false) => {
  if (!col.fixed) return {}

  const baseStyle = {
    position: 'sticky',
    zIndex: isHeader ? 3 : 2,
    background: isHeader ? 'var(--dedsi-bg-secondary)' : 'var(--dedsi-bg-color)'
  }

  if (col.fixed === 'left') {
    return {
      ...baseStyle,
      left: `${leftFixedOffsets.value[col.key] ?? 0}px`
    }
  }

  return {
    ...baseStyle,
    right: `${rightFixedOffsets.value[col.key] ?? 0}px`
  }
}

const getIndexFixedCellClass = () => {
  if (!props.indexFixed) return []

  const classes = ['dedsi-table-cell-fixed', 'dedsi-table-cell-fixed-left']
  if (leftFixedKeys.value.length === 0) {
    classes.push('dedsi-table-cell-fixed-left-last')
  }

  return classes
}

const getIndexFixedCellStyle = (isHeader = false): CSSProperties => {
  if (!props.indexFixed) return {}

  return {
    position: 'sticky',
    zIndex: isHeader ? 3 : 2,
    background: isHeader ? 'var(--dedsi-bg-secondary)' : 'var(--dedsi-bg-color)',
    left: '0px'
  }
}

const getIndexCellStyle = (isHeader = false): CSSProperties => ({
  textAlign: 'center',
  ...getIndexFixedCellStyle(isHeader)
})

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

const handlePageSizeChange = (value: any) => {
  emit('page-size-change', value)
  // 当切换页码大小时，通常回到第一页
  changePage(1)
};

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

.dedsi-table-scroll {
  position: relative;
  width: 100%;
  overflow-x: auto;
}

.dedsi-table {
  width: 100%;
  min-width: max-content;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--dedsi-bg-color);
}

.dedsi-table th,
.dedsi-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--dedsi-border-color);
}

.dedsi-table th {
  position: relative;
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

.dedsi-table tbody tr:hover .dedsi-table-cell-fixed {
  background: var(--dedsi-bg-secondary) !important;
}

.dedsi-table tbody tr:last-child td {
  border-bottom: none;
}

/* 边框样式 */
.dedsi-table-bordered {
  border-top: 1px solid var(--dedsi-border-color);
  border-bottom: 1px solid var(--dedsi-border-color);
}

.dedsi-table-bordered th,
.dedsi-table-bordered td {
  border-right: 1px solid var(--dedsi-border-color);
  border-bottom: 1px solid var(--dedsi-border-color);
}

.dedsi-table-bordered thead tr > th:first-child,
.dedsi-table-bordered tbody tr > td:first-child {
  border-left: 1px solid var(--dedsi-border-color);
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
  font-weight: bold;
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
