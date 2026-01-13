<template>
  <div class="dedsi-avatar-demo">
    <h2 class="page-title">Dedsi Avatar 头像</h2>
    <p class="page-desc">用来代表用户或事物，支持图片、图标或字符。</p>

    <DedsiCard title="基础用法">
      <DedsiSpace wrap size="large" align="center">
        <DedsiAvatar src="https://joeschmoe.io/api/v1/random" />
        <DedsiAvatar>U</DedsiAvatar>
        <DedsiAvatar :icon="UserOutlined" />
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="形状">
      <DedsiSpace wrap size="large" align="center">
        <DedsiAvatar shape="circle" src="https://joeschmoe.io/api/v1/male/random" />
        <DedsiAvatar shape="square" src="https://joeschmoe.io/api/v1/female/random" />
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="尺寸">
      <DedsiSpace wrap size="large" align="center">
        <DedsiAvatar size="large" src="https://joeschmoe.io/api/v1/jon" />
        <DedsiAvatar size="default" src="https://joeschmoe.io/api/v1/jerry" />
        <DedsiAvatar size="small" src="https://joeschmoe.io/api/v1/jess" />
        <DedsiAvatar :size="64" src="https://joeschmoe.io/api/v1/jack" />
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="配合 Badge 使用">
      <DedsiSpace wrap size="large" align="center">
        <DedsiBadge :value="5">
          <DedsiAvatar shape="square" src="https://joeschmoe.io/api/v1/joe" />
        </DedsiBadge>
        <DedsiBadge is-dot>
          <DedsiAvatar shape="square" :icon="UserOutlined" />
        </DedsiBadge>
      </DedsiSpace>
    </DedsiCard>

    <DedsiCard title="字符头像">
      <DedsiSpace wrap size="large" align="center">
        <DedsiAvatar style="background-color: #f56a00">U</DedsiAvatar>
        <DedsiAvatar style="background-color: #722ed1">User</DedsiAvatar>
        <DedsiAvatar style="background-color: #87d068">Admin</DedsiAvatar>
      </DedsiSpace>
    </DedsiCard>
  </div>
</template>

<script setup lang="ts">
import { DedsiAvatar, DedsiBadge, DedsiCard, DedsiSpace } from '@/components'
import { UserOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.dedsi-avatar-demo {
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
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
