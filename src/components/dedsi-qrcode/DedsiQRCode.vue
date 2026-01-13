<template>
  <div class="dedsi-qrcode" :style="containerStyle">
    <canvas ref="canvasRef"></canvas>
    <div v-if="loading" class="dedsi-qrcode-loading">
      <slot name="loading">
        <div class="dedsi-qrcode-spinner"></div>
      </slot>
    </div>
    <div v-if="error" class="dedsi-qrcode-error">
      <slot name="error">加载失败</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import QRCode from 'qrcode'

interface Props {
  value: string
  size?: number
  color?: string
  backgroundColor?: string
  margin?: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
}

const props = withDefaults(defineProps<Props>(), {
  size: 160,
  color: '#000000',
  backgroundColor: '#ffffff',
  margin: 2,
  errorCorrectionLevel: 'M'
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const error = ref(false)

const containerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  position: 'relative' as const
}))

const renderQRCode = async () => {
  if (!canvasRef.value) return
  
  loading.value = true
  error.value = false
  
  try {
    await QRCode.toCanvas(canvasRef.value, props.value, {
      width: props.size,
      margin: props.margin,
      color: {
        dark: props.color,
        light: props.backgroundColor
      },
      errorCorrectionLevel: props.errorCorrectionLevel
    })
  } catch (err) {
    console.error('Failed to generate QR code:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(() => [props.value, props.size, props.color, props.backgroundColor, props.margin, props.errorCorrectionLevel], renderQRCode)

onMounted(renderQRCode)
</script>

<style scoped>
.dedsi-qrcode {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 4px;
}

.dedsi-qrcode-loading,
.dedsi-qrcode-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.dedsi-qrcode-error {
  color: var(--dedsi-danger-color);
}

.dedsi-qrcode-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--dedsi-divider-color);
  border-top-color: var(--dedsi-primary-color);
  border-radius: 50%;
  animation: dedsi-qrcode-spin 1s linear infinite;
}

@keyframes dedsi-qrcode-spin {
  to { transform: rotate(360deg); }
}
</style>
