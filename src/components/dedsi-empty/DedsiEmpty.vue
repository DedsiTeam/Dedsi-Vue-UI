<template>
  <div class="dedsi-empty">
    <div class="dedsi-empty-image" :style="imageStyle">
      <slot name="image">
        <svg
          v-if="!image"
          width="184"
          height="152"
          viewBox="0 0 184 152"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                fill-opacity=".8"
                fill="#F5F5F7"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              ></ellipse>
              <path
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                fill="#D9E1E7"
              ></path>
              <path
                d="M101.537 86.214L129.63 35.337a4.03 4.03 0 0 1 3.515-2.091h40.407a4.03 4.03 0 0 1 3.514 2.091l28.093 50.877v7.87H101.537v-7.87z"
                fill="#F0F5F9"
              ></path>
              <path
                d="M122.034 69.674l-23.925-29.445c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                fill="#FAFCFE"
              ></path>
              <path
                d="M101.537 86.214L73.444 35.337a4.03 4.03 0 0 0-3.515-2.091H29.522a4.03 4.03 0 0 0-3.514 2.091L-2.085 86.214v7.87H101.537v-7.87z"
                fill="#F0F5F9"
              ></path>
              <path
                d="M31.144 79.147c0-2.437 1.975-4.412 4.412-4.412h62.88c2.437 0 4.412 1.975 4.412 4.412v12.448H31.144V79.147z"
                fill="#D9E1E7"
              ></path>
            </g>
          </g>
        </svg>
        <img v-else :src="image" alt="empty" />
      </slot>
    </div>
    <div class="dedsi-empty-description">
      <slot name="description">
        {{ description || '暂无数据' }}
      </slot>
    </div>
    <div v-if="$slots.default" class="dedsi-empty-footer">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  image?: string
  imageSize?: number | string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageSize: 120
})

const imageStyle = computed(() => {
  const size = typeof props.imageSize === 'number' ? `${props.imageSize}px` : props.imageSize
  return {
    height: size,
    width: 'auto'
  }
})
</script>

<style scoped>
.dedsi-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  text-align: center;
}

.dedsi-empty-image {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dedsi-empty-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.dedsi-empty-image svg {
  width: 100%;
  height: 100%;
}

.dedsi-empty-description {
  color: var(--dedsi-text-secondary);
  font-size: 14px;
  margin-bottom: 16px;
}

.dedsi-empty-footer {
  margin-top: 8px;
}
</style>
