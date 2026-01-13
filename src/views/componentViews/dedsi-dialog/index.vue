<template>
  <div class="dedsi-dialog-demo">
    <h2 class="page-title">Dedsi Dialog 对话框</h2>
    <p class="page-desc">在保留当前页面状态的情况下，告知用户出现操作反馈、确认信息或展示更多内容。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="16" wrap>
          <DedsiButton type="primary" @click="visible1 = true">打开基本对话框</DedsiButton>
          <DedsiDialog v-model:visible="visible1" title="基本对话框" @ok="visible1 = false">
            <p>这是一段对话框内容...</p>
            <p>这是一段对话框内容...</p>
            <p>这是一段对话框内容...</p>
          </DedsiDialog>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="垂直居中">
        <DedsiSpace :size="16" wrap>
          <DedsiButton @click="visible2 = true">垂直居中对话框</DedsiButton>
          <DedsiDialog v-model:visible="visible2" title="居中对话框" centered @ok="visible2 = false">
            <p>这个对话框会在视口中心垂直居中展示。</p>
          </DedsiDialog>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自定义宽度与异步关闭">
        <DedsiSpace :size="16" wrap>
          <DedsiButton @click="visible3 = true">异步确认 (1000px 宽度)</DedsiButton>
          <DedsiDialog 
            v-model:visible="visible3" 
            title="异步处理" 
            width="1000px"
            :confirm-loading="loading"
            @ok="handleAsyncOk"
          >
            <p>点击确定后，1.5 秒后关闭。</p>
            <div style="height: 100px; background: var(--dedsi-bg-secondary); border-radius: 4px; display: flex; align-items: center; justify-content: center;">
               内容撑开区域 (1000px 宽度测试)
            </div>
          </DedsiDialog>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="信息反馈与确认 (带有语义图标)">
        <DedsiSpace :size="16" wrap>
          <DedsiButton @click="visible5 = true">成功提示</DedsiButton>
          <DedsiButton @click="visible6 = true">警告确认</DedsiButton>
          <DedsiButton @click="visible7 = true">错误详情</DedsiButton>

          <DedsiDialog v-model:visible="visible5" title="操作成功" type="success" @ok="visible5 = false">
            <p>项目已成功创建并同步到云端。</p>
          </DedsiDialog>

          <DedsiDialog 
            v-model:visible="visible6" 
            title="安全删除确认" 
            type="warning" 
            ok-text="确认删除" 
            cancel-text="不，保留它"
            @ok="visible6 = false"
          >
            <p>确定要删除该项吗？此操作执行后将无法撤销，请谨慎操作。</p>
          </DedsiDialog>

          <DedsiDialog v-model:visible="visible7" title="权限校验失败" type="error" @ok="visible7 = false">
            <p>对不起，您没有足够的权限访问该财务模块。请联系管理员获取授权。</p>
          </DedsiDialog>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="完全定制化插槽">
        <DedsiSpace :size="16" wrap>
          <DedsiButton @click="visible4 = true">自定义标题与页脚</DedsiButton>
          <DedsiDialog v-model:visible="visible4">
            <template #title>
              <span style="color: var(--dedsi-primary-color)">
                <InfoCircleOutlined /> 系统提示
              </span>
            </template>
            
            <DedsiEmpty description="对话框内甚至可以嵌套其他组件" />

            <template #footer>
              <DedsiSpace>
                  <DedsiButton @click="visible4 = false">我知道了</DedsiButton>
                  <DedsiButton type="primary" danger @click="visible4 = false">残忍拒绝</DedsiButton>
              </DedsiSpace>
            </template>
          </DedsiDialog>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DedsiDialog, DedsiButton, DedsiEmpty, DedsiSpace, DedsiCard } from '@/components'
import { InfoCircleOutlined } from '@ant-design/icons-vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
const visible6 = ref(false)
const visible7 = ref(false)

const loading = ref(false)

const handleAsyncOk = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    visible3.value = false
  }, 1500)
}
</script>

<style scoped>
.dedsi-dialog-demo {
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
</style>
