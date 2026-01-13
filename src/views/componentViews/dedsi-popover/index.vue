<template>
  <div class="dedsi-popover-demo">
    <h2 class="page-title">Dedsi Popover 气泡卡片</h2>
    <p class="page-desc">点击或悬停在元素上，弹出更丰富的内容卡片。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="12" wrap>
          <DedsiPopover title="标题" content="这是一段内容，这是一段内容，这是一段内容。">
            <DedsiButton>Hover me</DedsiButton>
          </DedsiPopover>
          
          <DedsiPopover 
            title="点击触发" 
            content="通过点击触发，再次点击或点击外部关闭。" 
            trigger="click"
          >
            <DedsiButton type="primary">Click me</DedsiButton>
          </DedsiPopover>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="12 种方位">
        <div class="popover-container">
          <div class="popover-grid">
            <!-- Top -->
            <div class="grid-cell top-start">
              <DedsiPopover title="Top Start" content="Content for Top Start" placement="top-start">
                <DedsiButton size="small">TS</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell top-center">
              <DedsiPopover title="Top" content="Content for Top" placement="top">
                <DedsiButton size="small">Top</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell top-end">
              <DedsiPopover title="Top End" content="Content for Top End" placement="top-end">
                <DedsiButton size="small">TE</DedsiButton>
              </DedsiPopover>
            </div>

            <!-- Left & Right -->
            <div class="grid-cell left-start">
              <DedsiPopover title="Left Start" content="Content for Left Start" placement="left-start">
                <DedsiButton size="small">LS</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell right-start">
              <DedsiPopover title="Right Start" content="Content for Right Start" placement="right-start">
                <DedsiButton size="small">RS</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell left-center">
              <DedsiPopover title="Left" content="Content for Left" placement="left">
                <DedsiButton size="small">Left</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell right-center">
              <DedsiPopover title="Right" content="Content for Right" placement="right">
                <DedsiButton size="small">Right</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell left-end">
              <DedsiPopover title="Left End" content="Content for Left End" placement="left-end">
                <DedsiButton size="small">LE</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell right-end">
              <DedsiPopover title="Right End" content="Content for Right End" placement="right-end">
                <DedsiButton size="small">RE</DedsiButton>
              </DedsiPopover>
            </div>

            <!-- Bottom -->
            <div class="grid-cell bottom-start">
              <DedsiPopover title="Bottom Start" content="Content for Bottom Start" placement="bottom-start">
                <DedsiButton size="small">BS</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell bottom-center">
              <DedsiPopover title="Bottom" content="Content for Bottom" placement="bottom">
                <DedsiButton size="small">Bottom</DedsiButton>
              </DedsiPopover>
            </div>
            <div class="grid-cell bottom-end">
              <DedsiPopover title="Bottom End" content="Content for Bottom End" placement="bottom-end">
                <DedsiButton size="small">BE</DedsiButton>
              </DedsiPopover>
            </div>
          </div>
        </div>
      </DedsiCard>

      <DedsiCard title="自定义内容 (Slots)">
        <DedsiSpace>
          <DedsiPopover placement="right" trigger="click">
            <DedsiButton>更多信息 (Slot)</DedsiButton>
            <template #title>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--dedsi-primary-color);">★</span>
                <span>自定义标题</span>
              </div>
            </template>
            <template #content>
              <div style="width: 200px">
                <p>可以在这里放置任何 HTML 或组件。</p>
                <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
                  <DedsiButton size="small" type="primary">确认</DedsiButton>
                </div>
              </div>
            </template>
          </DedsiPopover>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiPopover, DedsiButton, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
/* Reusing Popover Grid Layout */
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
