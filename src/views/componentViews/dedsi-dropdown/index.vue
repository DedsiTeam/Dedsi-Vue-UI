<template>
  <div class="dedsi-dropdown-demo">
    <h2 class="page-title">Dedsi Dropdown 下拉菜单</h2>
    <p class="page-desc">当页面上的操作命令过多时，用下拉菜单收纳操作元素。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法 (Hover)">
        <DedsiSpace :size="24" wrap>
          <DedsiDropdown :menu="menu1" @select="handleSelect">
            <DedsiButton>鼠标悬停 <DownOutlined /></DedsiButton>
          </DedsiDropdown>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="点击触发 (Click)">
        <DedsiSpace :size="24" wrap>
          <DedsiDropdown :menu="menu1" trigger="click" @select="handleSelect">
            <DedsiButton type="primary">点击触发 <DownOutlined /></DedsiButton>
          </DedsiDropdown>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="带有图标与危险状态">
        <DedsiSpace :size="24" wrap>
          <DedsiDropdown :menu="menu2" @select="handleSelect">
            <DedsiTypography strong style="cursor: pointer; color: var(--dedsi-primary-color)">
              更多操作 <DownOutlined />
            </DedsiTypography>
          </DedsiDropdown>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="弹出位置 (Placement)">
        <DedsiSpace :size="48" wrap>
          <DedsiDropdown :menu="menu1" placement="bottomLeft">
            <DedsiButton size="small">Bottom Left</DedsiButton>
          </DedsiDropdown>
          <DedsiDropdown :menu="menu1" placement="bottomCenter">
            <DedsiButton size="small">Bottom Center</DedsiButton>
          </DedsiDropdown>
          <DedsiDropdown :menu="menu1" placement="bottomRight">
            <DedsiButton size="small">Bottom Right</DedsiButton>
          </DedsiDropdown>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { DedsiDropdown, DedsiButton, DedsiTypography, DedsiCard, DedsiSpace, type DropdownMenuItem } from '@/components'
import { 
  DownOutlined, 
  UserOutlined, 
  EditOutlined, 
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'

const menu1: DropdownMenuItem[] = [
  { key: '1', label: '菜单选项一' },
  { key: '2', label: '菜单选项二' },
  { key: 'divider', type: 'divider' },
  { key: '3', label: '禁用选项', disabled: true },
  { key: '4', label: '选项四' },
]

const menu2: DropdownMenuItem[] = [
  { key: 'profile', label: '个人资料', icon: h(UserOutlined) },
  { key: 'edit', label: '编辑帐号', icon: h(EditOutlined) },
  { key: 'settings', label: '偏好设置', icon: h(SettingOutlined) },
  { key: 'divider-1', type: 'divider' },
  { key: 'logout', label: '退出登录', icon: h(LogoutOutlined), danger: true },
]

const handleSelect = (key: string | number) => {
  console.log('Selected key:', key)
  alert(`您点击了业务键: ${key}`)
}
</script>

<style scoped>
.dedsi-dropdown-demo {
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
  align-items: center;
  flex-wrap: wrap;
}
</style>
