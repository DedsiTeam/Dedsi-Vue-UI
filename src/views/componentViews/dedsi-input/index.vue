<template>
  <div class="dedsi-input-demo">
    <div class="header">
      <h1>Dedsi Input 输入框</h1>
      <p class="description">
        通过鼠标或键盘输入内容，是最基础的表单域的包装。
      </p>
    </div>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基本使用">
        <p>基本使用。</p>
        <div class="demo-box">
          <DedsiInput v-model="value1" placeholder="Basic usage" />
          <div class="value-display">Value: {{ value1 }}</div>
        </div>
      </DedsiCard>

      <DedsiCard title="三种大小">
        <p>我们为 <code>DedsiInput</code> 输入框定义了三种尺寸（大、默认、小），高度分别为 <code>40px</code>、<code>32px</code> 和 <code>24px</code>。</p>
        <div class="demo-box">
          <DedsiSpace direction="vertical" :size="24" style="width: 100%">
            <DedsiInput v-model="value2" size="large" placeholder="Large size" />
            <DedsiInput v-model="value3" placeholder="Default size" />
            <DedsiInput v-model="value4" size="small" placeholder="Small size" />
          </DedsiSpace>
        </div>
      </DedsiCard>

      <DedsiCard title="文本域">
        <p>用于多行输入。</p>
        <div class="demo-box">
            <!-- DedsiInput currently only supports single line input, showcasing standard usage for now -->
             <DedsiInput v-model="value5" placeholder="Text input" />
        </div>
      </DedsiCard>

      <DedsiCard title="带移除图标">
        <p>带移除图标的输入框，点击图标删除所有内容。</p>
        <div class="demo-box">
          <DedsiInput v-model="value6" allow-clear placeholder="Input with clear icon" />
        </div>
      </DedsiCard>

      <DedsiCard title="密码框">
        <p>密码框。</p>
        <div class="demo-box">
          <DedsiInput v-model="value7" type="password" placeholder="Input password" />
        </div>
      </DedsiCard>
      
       <DedsiCard title="与按钮组合">
        <p>输入框与按钮组合使用。</p>
        <div class="demo-box">
          <div style="display: flex; gap: 8px;">
             <DedsiInput v-model="value8" placeholder="Please input" />
             <DedsiButton type="primary">Search</DedsiButton>
          </div>
        </div>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiInput, DedsiSpace, DedsiButton, DedsiCard } from '@/components'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')
const value8 = ref('')
</script>

<style scoped>
.dedsi-input-demo {
  padding: 24px;
}

.header {
  margin-bottom: 40px;
}

.header h1 {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f1f1f;
}

.description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.demo-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.demo-card {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s;
}

.demo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.demo-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f1f1f;
}

.demo-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.demo-box {
  border: 1px solid #f0f0f0;
  padding: 24px;
  border-radius: 4px;
}

.value-display {
  margin-top: 12px;
  font-size: 12px;
  color: #999;
  font-family: monospace;
}
</style>
