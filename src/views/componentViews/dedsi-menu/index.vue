<template>
  <div class="dedsi-menu-demo">
    <h2 class="page-title">Dedsi Menu 菜单</h2>
    <p class="page-desc">为页面和功能提供导航的菜单列表。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="内嵌菜单 (Inline)">
        <DedsiSpace :size="40" wrap>
          <div class="menu-container" style="width: 256px">
             <DedsiMenu 
               v-model:selected-keys="selectedKeys1"
               v-model:open-keys="openKeys1"
               :items="menuItems"
             />
          </div>
          <div class="info-panel">
            <p>Selected Keys: {{ selectedKeys1 }}</p>
            <p>Open Keys: {{ openKeys1 }}</p>
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="暗色主题 (Dark)">
        <DedsiSpace :size="40" wrap>
          <div class="menu-container dark-container" style="width: 256px">
             <DedsiMenu 
               theme="dark"
               v-model:selected-keys="selectedKeys2"
               v-model:open-keys="openKeys2"
               :items="menuItems"
             />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="水平菜单 (Horizontal)">
        <div class="horizontal-demo">
           <DedsiMenu 
             mode="horizontal"
             v-model:selected-keys="selectedKeys3"
             :items="menuItems"
             style="width: 100%"
           />
        </div>
      </DedsiCard>

      <DedsiCard title="收起菜单 (Collapsed)">
        <DedsiSpace :size="40" wrap>
          <div style="margin-bottom: 16px;">
            <DedsiButton @click="collapsed = !collapsed">
               {{ collapsed ? '展开' : '收起' }}
            </DedsiButton>
          </div>
          <div class="menu-container" style="width: 256px">
             <DedsiMenu 
               :collapsed="collapsed"
               v-model:selected-keys="selectedKeys4"
               :items="menuItems"
             />
          </div>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { DedsiMenu, DedsiButton, DedsiSpace, DedsiCard } from '@/components'
import type { MenuItem } from '@/components'
import { 
  MailOutlined, 
  AppstoreOutlined, 
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  PictureOutlined
} from '@ant-design/icons-vue'

const selectedKeys1 = ref(['item-1'])
const openKeys1 = ref(['sub-1'])

const selectedKeys2 = ref(['item-1'])
const openKeys2 = ref(['sub-1'])

const selectedKeys3 = ref(['item-1'])
const selectedKeys4 = ref(['item-1'])
const collapsed = ref(false)

const menuItems: MenuItem[] = [
  {
    key: 'item-1',
    label: '控制台预览',
    icon: h(AppstoreOutlined)
  },
  {
    key: 'sub-1',
    label: '内容管理',
    icon: h(MailOutlined),
    children: [
      { key: 'item-1-1', label: '文章列表' },
      { key: 'item-1-2', label: '分类目录' },
      { key: 'item-1-3', label: '标签管理' }
    ]
  },
  {
    key: 'sub-2',
    label: '系统配置',
    icon: h(SettingOutlined),
    children: [
      { 
        key: 'sub-2-1', 
        label: '权限管理',
        children: [
           { key: 'item-2-1-1', label: '用户列表', icon: h(UserOutlined) },
           { key: 'item-2-1-2', label: '角色管理', icon: h(LockOutlined) }
        ]
      },
      { key: 'item-2-2', label: '媒体库', icon: h(PictureOutlined) },
      { key: 'item-2-3', label: '不可用选项', disabled: true }
    ]
  }
]
</script>

<style scoped>
.dedsi-menu-demo {
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
  gap: 40px;
  flex-wrap: wrap;
}

.menu-container {
  border: 1px solid var(--dedsi-divider-color);
  border-radius: 4px;
  overflow: hidden;
}

.dark-container {
  background: #001529;
}

.info-panel {
  flex: 1;
  padding: 24px;
  background: var(--dedsi-bg-secondary);
  border-radius: 4px;
}

.horizontal-demo {
  width: 100%;
}
</style>
