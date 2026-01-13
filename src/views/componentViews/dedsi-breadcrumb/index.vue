<template>
  <div class="dedsi-breadcrumb-demo">
    <h2 class="page-title">Dedsi Breadcrumb 面包屑</h2>
    <p class="page-desc">显示当前页面的路径，快速返回之前的页面。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace direction="vertical" :size="24">
          <DedsiBreadcrumb>
            <DedsiBreadcrumbItem to="/">首页</DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem to="/components/dedsi-button">组件演示</DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem>面包屑</DedsiBreadcrumbItem>
          </DedsiBreadcrumb>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自定义分隔符">
        <DedsiSpace direction="vertical" :size="24">
          <DedsiBreadcrumb separator=">">
            <DedsiBreadcrumbItem to="/">首页</DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem>管理中心</DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem>列表页面</DedsiBreadcrumbItem>
          </DedsiBreadcrumb>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="使用图标">
        <DedsiSpace direction="vertical" :size="24">
          <DedsiBreadcrumb>
            <DedsiBreadcrumbItem to="/">
              <HomeOutlined style="margin-right: 4px" />
              首页
            </DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem>
              <UserOutlined style="margin-right: 4px" />
              用户管理
            </DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem>详细信息</DedsiBreadcrumbItem>
          </DedsiBreadcrumb>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="面包屑项分隔符插槽">
        <DedsiSpace direction="vertical" :size="24">
          <DedsiBreadcrumb>
            <DedsiBreadcrumbItem to="/">首页</DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem>
              系统设置
              <template #separator>
                <ArrowRightOutlined />
              </template>
            </DedsiBreadcrumbItem>
            <DedsiBreadcrumbItem>个人信息</DedsiBreadcrumbItem>
          </DedsiBreadcrumb>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiBreadcrumb, DedsiBreadcrumbItem, DedsiCard, DedsiSpace } from '@/components'
import { HomeOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.dedsi-breadcrumb-demo {
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

.demo-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
