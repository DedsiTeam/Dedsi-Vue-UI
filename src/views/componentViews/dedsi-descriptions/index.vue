<template>
  <div class="dedsi-descriptions-demo">
    <h2 class="page-title">Dedsi Descriptions 描述列表</h2>
    <p class="page-desc">用于展示多组只读字段信息，支持边框、列数、尺寸、纵向布局和跨列配置。</p>

    <div class="demo-section">
      <h3 class="section-title">基础用法</h3>
      <DedsiDescriptions title="用户信息" :column="3">
        <DedsiDescriptionsItem label="用户名">cohen</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="手机号">138****6666</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="角色">管理员</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="邮箱">cohen@example.com</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="状态">启用</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="部门">研发中心</DedsiDescriptionsItem>
      </DedsiDescriptions>
    </div>

    <div class="demo-section">
      <h3 class="section-title">带边框 + 跨列</h3>
      <DedsiDescriptions title="订单信息" bordered :column="3">
        <DedsiDescriptionsItem label="订单号" :span="2">NO.20260214001</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="状态">已支付</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="收货人">张三</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="联系电话">188****1234</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="支付方式">微信支付</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="收货地址" :span="3">北京市朝阳区望京街道 XX 科技园 A 座 1208</DedsiDescriptionsItem>
      </DedsiDescriptions>
    </div>

    <div class="demo-section">
      <h3 class="section-title">小尺寸 + 不显示冒号</h3>
      <DedsiDescriptions title="系统配置" bordered size="small" :column="2" :colon="false">
        <DedsiDescriptionsItem label="运行环境">Production</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="版本号">v2.3.1</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="发布人">DevOps Bot</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="发布时间">2026-02-14 10:30:00</DedsiDescriptionsItem>
      </DedsiDescriptions>
    </div>

    <div class="demo-section">
      <h3 class="section-title">纵向布局</h3>
      <DedsiDescriptions title="服务器监控" bordered :column="3" layout="vertical">
        <DedsiDescriptionsItem label="CPU 使用率">42%</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="内存使用率">68%</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="磁盘使用率">55%</DedsiDescriptionsItem>
        <DedsiDescriptionsItem label="最新告警" :span="3">过去 24 小时无高危告警，2 条中危告警已自动恢复。</DedsiDescriptionsItem>
      </DedsiDescriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DedsiDescriptions, DedsiDescriptionsItem } from '@/components'
</script>

<style scoped>
.dedsi-descriptions-demo {
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

.demo-section {
  margin-bottom: 24px;
  padding: 20px;
  background: var(--dedsi-bg-color);
  border: 1px solid var(--dedsi-border-color);
  border-radius: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--dedsi-text-primary);
  margin-bottom: 12px;
}
</style>
