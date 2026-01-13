<template>
  <div class="dedsi-drawer-demo">
    <h2 class="page-title">Dedsi Drawer 抽屉</h2>
    <p class="page-desc">屏幕边缘滑出的浮层面板。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法 (右侧滑出)">
        <DedsiSpace :size="16">
          <DedsiButton type="primary" @click="visible1 = true">打开抽屉</DedsiButton>
          <DedsiDrawer v-model:visible="visible1" title="基础抽屉">
             <p>这是一些抽屉内容...</p>
             <p>这是一些抽屉内容...</p>
          </DedsiDrawer>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="滑出方向 (Placement)">
        <DedsiSpace :size="16">
          <DedsiButton @click="showDrawer('top')">Top</DedsiButton>
          <DedsiButton @click="showDrawer('bottom')">Bottom</DedsiButton>
          <DedsiButton @click="showDrawer('left')">Left</DedsiButton>
          <DedsiButton @click="showDrawer('right')">Right</DedsiButton>

          <DedsiDrawer 
            v-model:visible="visible2" 
            :placement="placement" 
            :title="`${placement.toUpperCase()} Drawer`"
          >
            <p>当前方向: {{ placement }}</p>
            <p>抽屉可以从上下左右四个方向滑出。</p>
          </DedsiDrawer>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="带有页脚">
        <DedsiSpace :size="16">
          <DedsiButton type="primary" @click="visible3 = true">带页脚的抽屉</DedsiButton>
          <DedsiDrawer v-model:visible="visible3" title="表单抽屉">
             <div class="demo-form">
                <div class="form-item">
                  <span>用户名:</span>
                  <input type="text" placeholder="请输入" class="demo-input" />
                </div>
                <div class="form-item">
                  <span>权限描述:</span>
                  <textarea rows="4" class="demo-input"></textarea>
                </div>
             </div>
             <template #footer>
                <DedsiSpace>
                  <DedsiButton type="primary" @click="visible3 = false">提交</DedsiButton>
                  <DedsiButton @click="visible3 = false">取消</DedsiButton>
                </DedsiSpace>
             </template>
          </DedsiDrawer>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自定义尺寸">
        <DedsiSpace :size="16">
          <DedsiButton @click="visible4 = true">超宽抽屉 (700px)</DedsiButton>
          <DedsiDrawer v-model:visible="visible4" title="自定义尺寸" width="700px">
             <DedsiEmpty description="展示更宽泛的内容区域" />
          </DedsiDrawer>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiDrawer, DedsiButton, DedsiSpace, DedsiEmpty, DedsiCard } from '@/components'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)

const placement = ref<'left' | 'right' | 'top' | 'bottom'>('right')

const showDrawer = (pos: 'left' | 'right' | 'top' | 'bottom') => {
  placement.value = pos
  visible2.value = true
}
</script>

<style scoped>
.dedsi-drawer-demo {
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
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-input {
  padding: 8px 12px;
  border: 1px solid var(--dedsi-divider-color);
  border-radius: 4px;
  outline: none;
}

.demo-input:focus {
  border-color: var(--dedsi-primary-color);
}
</style>
