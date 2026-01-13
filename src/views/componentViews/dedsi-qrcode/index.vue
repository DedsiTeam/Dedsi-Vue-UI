<template>
  <div class="dedsi-qrcode-demo">
    <h2 class="page-title">Dedsi QRCode 二维码</h2>
    <p class="page-desc">生成的二维码组件，支持多种配置。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiQRCode value="https://github.com/DedsiTeam" />
      </DedsiCard>

      <DedsiCard title="自定义尺寸与颜色">
        <DedsiSpace align="end" :size="24">
          <div class="qr-item">
            <p>Size: 100</p>
            <DedsiQRCode value="Dedsi Admin" :size="100" />
          </div>
          <div class="qr-item">
            <p>Color: Primary</p>
            <DedsiQRCode value="Dedsi Admin" color="var(--dedsi-primary-color)" />
          </div>
          <div class="qr-item">
            <p>Custom Colors</p>
            <DedsiQRCode 
              value="Dedsi Admin" 
              color="#52c41a" 
              backgroundColor="#f6ffed" 
            />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="纠错级别">
        <DedsiSpace :size="24">
          <div class="qr-item">
            <p>Level L (7%)</p>
            <DedsiQRCode value="https://dedsi.com" errorCorrectionLevel="L" />
          </div>
          <div class="qr-item">
            <p>Level H (30%)</p>
            <DedsiQRCode value="https://dedsi.com" errorCorrectionLevel="H" />
          </div>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="实时更新">
        <DedsiSpace direction="vertical" :size="16">
          <DedsiInput 
            v-model="text" 
            placeholder="输入内容实时转换" 
            style="width: 240px"
          />
          <DedsiQRCode :value="text || '请输入'" />
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiQRCode, DedsiSpace, DedsiCard, DedsiInput } from '@/components'

const text = ref('https://github.com/DedsiTeam')
</script>

<style scoped>
.qr-item {
  text-align: center;
}

.qr-item p {
  font-size: 12px;
  color: var(--dedsi-text-secondary);
  margin-bottom: 8px;
}
</style>
