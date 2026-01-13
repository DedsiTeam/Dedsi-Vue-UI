<template>
  <div class="dedsi-tooltip-demo">
    <h2 class="page-title">Dedsi Tooltip 文字提示</h2>
    <p class="page-desc">简单、轻量的文字提示组件。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace>
          <DedsiTooltip content="This is a tooltip">
            <DedsiButton>Hover me</DedsiButton>
          </DedsiTooltip>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="位置 (12 种方向)">
        <div class="tooltip-container">
          <div class="tooltip-grid">
            <!-- Top -->
            <div class="grid-cell top-start">
              <DedsiTooltip content="Top Start" placement="top-start">
                <DedsiButton size="small">TS</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell top-center">
              <DedsiTooltip content="Top" placement="top">
                <DedsiButton size="small">Top</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell top-end">
              <DedsiTooltip content="Top End" placement="top-end">
                <DedsiButton size="small">TE</DedsiButton>
              </DedsiTooltip>
            </div>

            <!-- Left & Right -->
            <div class="grid-cell left-start">
              <DedsiTooltip content="Left Start" placement="left-start">
                <DedsiButton size="small">LS</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell right-start">
              <DedsiTooltip content="Right Start" placement="right-start">
                <DedsiButton size="small">RS</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell left-center">
              <DedsiTooltip content="Left" placement="left">
                <DedsiButton size="small">Left</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell right-center">
              <DedsiTooltip content="Right" placement="right">
                <DedsiButton size="small">Right</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell left-end">
              <DedsiTooltip content="Left End" placement="left-end">
                <DedsiButton size="small">LE</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell right-end">
              <DedsiTooltip content="Right End" placement="right-end">
                <DedsiButton size="small">RE</DedsiButton>
              </DedsiTooltip>
            </div>

            <!-- Bottom -->
            <div class="grid-cell bottom-start">
              <DedsiTooltip content="Bottom Start" placement="bottom-start">
                <DedsiButton size="small">BS</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell bottom-center">
              <DedsiTooltip content="Bottom" placement="bottom">
                <DedsiButton size="small">Bottom</DedsiButton>
              </DedsiTooltip>
            </div>
            <div class="grid-cell bottom-end">
              <DedsiTooltip content="Bottom End" placement="bottom-end">
                <DedsiButton size="small">BE</DedsiButton>
              </DedsiTooltip>
            </div>
          </div>
        </div>
      </DedsiCard>

      <DedsiCard title="禁用状态">
        <DedsiSpace>
          <DedsiTooltip content="You won't see me" disabled>
            <DedsiButton disabled>Disabled Tooltip</DedsiButton>
          </DedsiTooltip>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { DedsiTooltip, DedsiButton, DedsiCard, DedsiSpace } from '@/components'
</script>

<style scoped>
.dedsi-tooltip-demo {
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

/* Tooltip Grid Layout */
.tooltip-container {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.tooltip-grid {
  display: grid;
  grid-template-columns: repeat(5, 80px);
  grid-template-rows: repeat(5, 40px);
  gap: 10px;
}

.grid-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Positioning */
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

.tooltip-grid :deep(.dedsi-button) {
  width: 70px;
}
</style>
