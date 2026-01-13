<template>
  <div class="dedsi-message-demo">
    <h2 class="page-title">Dedsi Message 全局提示</h2>
    <p class="page-desc">轻量级的反馈提示，在页面顶部居中显示，并自动消失。</p>

    <DedsiSpace direction="vertical" :size="24" style="width: 100%">
      <DedsiCard title="基础用法">
        <DedsiSpace :size="16" wrap>
          <DedsiButton type="primary" @click="message.info('这是一条普通提示')">显示提示</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="提示类型">
        <DedsiSpace :size="16" wrap>
          <DedsiButton @click="message.success('恭喜你，操作成功！')">成功</DedsiButton>
          <DedsiButton @click="message.warning('请注意，这是一个警告！')">警告</DedsiButton>
          <DedsiButton @click="message.error('抱歉，出错了！')">错误</DedsiButton>
          <DedsiButton @click="message.info('这是普通信息')">信息</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="加载中">
        <DedsiSpace :size="16" wrap>
          <DedsiButton @click="handleLoading">显示加载中 (3秒后关闭)</DedsiButton>
        </DedsiSpace>
      </DedsiCard>

      <DedsiCard title="自定义时长与回调">
        <DedsiSpace :size="16" wrap>
          <DedsiButton @click="message.success({ content: '这条提示会显示 10 秒', duration: 10000, onClose: handleClose })">
            显示 10 秒并监听关闭
          </DedsiButton>
        </DedsiSpace>
      </DedsiCard>
    </DedsiSpace>
  </div>
</template>

<script setup lang="ts">
import { message, DedsiButton, DedsiSpace, DedsiCard } from '@/components'

const handleLoading = () => {
  const hide = message.loading('正在处理中...')
  setTimeout(() => {
    hide.close()
    message.success('处理完成')
  }, 3000)
}

const handleClose = () => {
  console.log('Message closed!')
}
</script>

<style scoped>
.dedsi-message-demo {
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
