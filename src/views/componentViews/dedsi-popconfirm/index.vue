<template>
  <div class="dedsi-popconfirm-demo">
    <h2 class="page-title">Dedsi Popconfirm 气泡确认框</h2>
    <p class="page-desc">点击元素，弹出气泡确认框，用于更轻量级的确认操作。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiPopconfirm 
          title="确定要删除这条信息吗？" 
          @confirm="onConfirm" 
          @cancel="onCancel"
        >
          <DedsiButton type="danger">删除</DedsiButton>
        </DedsiPopconfirm>
      </DedsiCard>

      <DedsiCard title="12 种方位">
        <div class="popover-container">
          <div class="popover-grid">
            <!-- Top -->
            <div class="grid-cell top-start">
              <DedsiPopconfirm title="Top Start" placement="top-start">
                <DedsiButton size="small">TS</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell top-center">
              <DedsiPopconfirm title="Top" placement="top">
                <DedsiButton size="small">Top</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell top-end">
              <DedsiPopconfirm title="Top End" placement="top-end">
                <DedsiButton size="small">TE</DedsiButton>
              </DedsiPopconfirm>
            </div>

            <!-- Left & Right -->
            <div class="grid-cell left-start">
              <DedsiPopconfirm title="Left Start" placement="left-start">
                <DedsiButton size="small">LS</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell right-start">
              <DedsiPopconfirm title="Right Start" placement="right-start">
                <DedsiButton size="small">RS</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell left-center">
              <DedsiPopconfirm title="Left" placement="left">
                <DedsiButton size="small">Left</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell right-center">
              <DedsiPopconfirm title="Right" placement="right">
                <DedsiButton size="small">Right</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell left-end">
              <DedsiPopconfirm title="Left End" placement="left-end">
                <DedsiButton size="small">LE</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell right-end">
              <DedsiPopconfirm title="Right End" placement="right-end">
                <DedsiButton size="small">RE</DedsiButton>
              </DedsiPopconfirm>
            </div>

            <!-- Bottom -->
            <div class="grid-cell bottom-start">
              <DedsiPopconfirm title="Bottom Start" placement="bottom-start">
                <DedsiButton size="small">BS</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell bottom-center">
              <DedsiPopconfirm title="Bottom" placement="bottom">
                <DedsiButton size="small">Bottom</DedsiButton>
              </DedsiPopconfirm>
            </div>
            <div class="grid-cell bottom-end">
              <DedsiPopconfirm title="Bottom End" placement="bottom-end">
                <DedsiButton size="small">BE</DedsiButton>
              </DedsiPopconfirm>
            </div>
          </div>
        </div>
      </DedsiCard>

      <DedsiCard title="自定义按钮文字">
        <DedsiPopconfirm 
          title="您确定已经阅读完协议了吗？" 
          confirmText="是的" 
          cancelText="还没"
        >
          <DedsiButton type="primary">阅读协议</DedsiButton>
        </DedsiPopconfirm>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiPopconfirm, DedsiButton, DedsiCard, DedsiSpace } from '@/components'

const onConfirm = () => {
  alert('点击了确定按钮')
}

const onCancel = () => {
  console.log('点击了取消按钮')
}
</script>

<style scoped>
/* Popover Grid Layout (Reusing Tooltip demo layout) */
.popover-container {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.popover-grid {
  display: grid;
  grid-template-columns: repeat(5, 80px);
  grid-template-rows: repeat(5, 40px);
  gap: 15px;
}

.grid-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-start { grid-area: 1 / 2; }
.top-center { grid-area: 1 / 3; }
.top-end { grid-area: 1 / 4; }

.left-start { grid-area: 2 / 1; }
.right-start { grid-area: 2 / 5; }

.left-center { grid-area: 3 / 1; }
.right-center { grid-area: 3 / 5; }

.left-end { grid-area: 4 / 1; }
.right-end { grid-area: 4 / 5; }

.bottom-start { grid-area: 5 / 2; }
.bottom-center { grid-area: 5 / 3; }
.bottom-end { grid-area: 5 / 4; }

.popover-grid :deep(.dedsi-button) {
  width: 70px;
}
</style>
