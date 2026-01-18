<template>
  <div class="component-demo">

      <h2>Result 结果</h2>
      <p class="description">用于反馈一系列操作任务的处理结果。当有重要操作反馈或需要引导用户进行下一步操作时，使用 Result。</p>
      
      <!-- 基础用法 -->
      <div class="demo-block">
        <h3>基础用法</h3>
        <p class="block-description">最简单的使用方式，传入 title 和 subTitle 即可。</p>
        <div class="demo-content">
          <DedsiResult title="成功页" subTitle="提交成功，可以点击按钮进行后续操作" />
        </div>
      </div>

      <!-- 成功状态 -->
      <div class="demo-block">
        <h3>成功状态</h3>
        <p class="block-description">使用 success 属性或 status="success" 设置成功状态。</p>
        <div class="demo-content">
          <DedsiResult 
            status="success" 
            title="操作成功" 
            subTitle="预期内的成功结果，感谢您的操作。" 
          >
            <template #extra>
              <DedsiButton type="primary">返回首页</DedsiButton>
              <DedsiButton>查看详情</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 信息状态 -->
      <div class="demo-block">
        <h3>信息状态</h3>
        <p class="block-description">使用 info 属性或 status="info" 设置信息状态。</p>
        <div class="demo-content">
          <DedsiResult 
            info 
            title="信息提示" 
            subTitle="一些提示信息，请注意查看。" 
          >
            <template #extra>
              <DedsiButton type="primary">我知道了</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 警告状态 -->
      <div class="demo-block">
        <h3>警告状态</h3>
        <p class="block-description">使用 warning 属性或 status="warning" 设置警告状态。</p>
        <div class="demo-content">
          <DedsiResult 
            warning 
            title="警告提示" 
            subTitle="请注意，您的操作可能会影响其他功能。" 
          >
            <template #extra>
              <DedsiButton type="primary">继续操作</DedsiButton>
              <DedsiButton>取消</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 错误状态 -->
      <div class="demo-block">
        <h3>错误状态</h3>
        <p class="block-description">使用 error 属性或 status="error" 设置错误状态。</p>
        <div class="demo-content">
          <DedsiResult 
            error 
            title="操作失败" 
            subTitle="抱歉，操作失败，请检查网络或稍后重试。" 
          >
            <template #extra>
              <DedsiButton type="primary">重试</DedsiButton>
              <DedsiButton>返回</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 404 页面 -->
      <div class="demo-block">
        <h3>404 页面</h3>
        <p class="block-description">使用 404 属性或 status="404" 展示页面未找到状态。</p>
        <div class="demo-content">
          <DedsiResult 
            status="404" 
            title="404" 
            subTitle="抱歉，您访问的页面不存在。" 
          >
            <template #extra>
              <DedsiButton type="primary">返回首页</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 403 页面 -->
      <div class="demo-block">
        <h3>403 页面</h3>
        <p class="block-description">使用 403 属性或 status="403" 展示无权限访问状态。</p>
        <div class="demo-content">
          <DedsiResult 
            403 
            title="403" 
            subTitle="抱歉，您无权访问此页面。" 
          >
            <template #extra>
              <DedsiButton type="primary">登录</DedsiButton>
              <DedsiButton>返回首页</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 500 页面 -->
      <div class="demo-block">
        <h3>500 页面</h3>
        <p class="block-description">使用 500 属性或 status="500" 展示服务器错误状态。</p>
        <div class="demo-content">
          <DedsiResult 
            500 
            title="500" 
            subTitle="抱歉，服务器出错了。" 
          >
            <template #extra>
              <DedsiButton type="primary">刷新页面</DedsiButton>
              <DedsiButton>联系客服</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 自定义图标 -->
      <div class="demo-block">
        <h3>自定义图标</h3>
        <p class="block-description">通过 icon 插槽可以完全自定义图标。</p>
        <div class="demo-content">
          <DedsiResult 
            title="自定义图标" 
            subTitle="可以传入自定义 SVG 图标或组件"
          >
            <template #icon>
              <svg viewBox="0 0 72 72" width="72" height="72">
                <circle cx="36" cy="36" r="36" fill="#722ed1" />
                <text x="36" y="46" text-anchor="middle" fill="#fff" font-size="32" font-weight="bold">★</text>
              </svg>
            </template>
            <template #extra>
              <DedsiButton type="primary">查看更多</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 支付成功示例 -->
      <div class="demo-block">
        <h3>支付成功示例</h3>
        <p class="block-description">一个完整的支付成功页面示例。</p>
        <div class="demo-content">
          <DedsiResult 
            success 
            title="支付成功" 
            subTitle="感谢您的购买，您的订单已生成"
          >
            <div class="result-content">
              <div class="content-item">
                <span class="label">订单编号：</span>
                <span class="value">20240101001</span>
              </div>
              <div class="content-item">
                <span class="label">支付金额：</span>
                <span class="value highlight">¥ 999.00</span>
              </div>
              <div class="content-item">
                <span class="label">支付时间：</span>
                <span class="value">2024-01-01 12:34:56</span>
              </div>
              <div class="content-item">
                <span class="label">支付方式：</span>
                <span class="value">微信支付</span>
              </div>
            </div>
            <template #extra>
              <DedsiButton type="primary" size="large">查看订单</DedsiButton>
              <DedsiButton size="large">再次购买</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 提交失败示例 -->
      <div class="demo-block">
        <h3>提交失败示例</h3>
        <p class="block-description">一个包含错误详情的表单提交失败页面。</p>
        <div class="demo-content">
          <DedsiResult 
            error 
            title="提交失败" 
            subTitle="请检查并修改以下信息后重新提交"
          >
            <div class="result-content error-content">
              <h4>错误详情：</h4>
              <ul>
                <li>用户名长度不能少于 6 个字符</li>
                <li>密码格式不正确，必须包含字母和数字</li>
                <li>邮箱地址无效，请输入正确的邮箱格式</li>
                <li>手机号格式不正确</li>
              </ul>
            </div>
            <template #extra>
              <DedsiButton type="primary">返回修改</DedsiButton>
              <DedsiButton>取消提交</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- 认证失败示例 -->
      <div class="demo-block">
        <h3>认证失败示例</h3>
        <p class="block-description">一个认证失败的提示页面。</p>
        <div class="demo-content">
          <DedsiResult 
            warning 
            title="认证失败" 
            subTitle="您的认证信息已过期，需要重新认证"
          >
            <div class="result-content">
              <p class="tips">为了保障您的账户安全，我们建议您：</p>
              <ul>
                <li>确保填写的信息真实有效</li>
                <li>上传的图片清晰可见</li>
                <li>等待审核结果通知</li>
              </ul>
            </div>
            <template #extra>
              <DedsiButton type="primary">重新认证</DedsiButton>
              <DedsiButton>联系客服</DedsiButton>
            </template>
          </DedsiResult>
        </div>
      </div>

      <!-- API 文档 -->
      <div class="demo-block">
        <h3>API 文档</h3>
        <div class="api-docs">
          <h4>Props</h4>
          <table class="api-table">
            <thead>
              <tr>
                <th>属性</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>status</td>
                <td>结果状态</td>
                <td><code>'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'</code></td>
                <td>'info'</td>
              </tr>
              <tr>
                <td>success</td>
                <td>成功状态（兼容旧版）</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>error</td>
                <td>错误状态（兼容旧版）</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>info</td>
                <td>信息状态（兼容旧版）</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>warning</td>
                <td>警告状态（兼容旧版）</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>title</td>
                <td>标题文本</td>
                <td>string</td>
                <td>根据 status 自动设置</td>
              </tr>
              <tr>
                <td>subTitle</td>
                <td>副标题文本</td>
                <td>string</td>
                <td>-</td>
              </tr>
              <tr>
                <td>icon</td>
                <td>自定义图标</td>
                <td>Component | string</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

          <h4>Slots</h4>
          <table class="api-table">
            <thead>
              <tr>
                <th>插槽名</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>icon</td>
                <td>自定义图标</td>
              </tr>
              <tr>
                <td>title</td>
                <td>自定义标题</td>
              </tr>
              <tr>
                <td>subTitle</td>
                <td>自定义副标题</td>
              </tr>
              <tr>
                <td>extra</td>
                <td>额外操作区域</td>
              </tr>
              <tr>
                <td>default</td>
                <td>默认内容区域</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { DedsiResult, DedsiButton } from '../../../components'
</script>

<style scoped>
.component-demo {
  padding: 2rem 0;
}

h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
}

.description {
  color: var(--dedsi-text-secondary, rgba(0, 0, 0, 0.45));
  font-size: 14px;
  margin-bottom: 48px;
  line-height: 1.6;
}

.demo-block {
  margin-bottom: 48px;
  background-color: var(--dedsi-bg-color-page, #f0f2f5);
  border-radius: 8px;
}

.demo-block h3 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
}

.block-description {
  color: var(--dedsi-text-secondary, rgba(0, 0, 0, 0.45));
  font-size: 14px;
  margin-bottom: 16px;
}

.demo-content {
  background-color: #fff;
  padding: 48px 32px;
  border-radius: 4px;
  border: 1px solid var(--dedsi-border-color, #d9d9d9);
}

.result-content {
  margin-top: 24px;
  padding: 24px;
  background-color: var(--dedsi-bg-color-page, #f0f2f5);
  border-radius: 4px;
  text-align: left;
  width: 100%;
}

.content-item {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--dedsi-border-color-lighter, #f0f0f0);
}

.content-item:last-child {
  border-bottom: none;
}

.label {
  color: var(--dedsi-text-secondary, rgba(0, 0, 0, 0.45));
  min-width: 100px;
  font-weight: 500;
}

.value {
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
}

.value.highlight {
  color: #ff4d4f;
  font-weight: 600;
  font-size: 16px;
}

.error-content {
  max-width: 480px;
  margin: 0 auto;
}

.error-content h4 {
  margin-bottom: 12px;
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
  font-size: 16px;
}

.error-content ul {
  margin: 0;
  padding-left: 20px;
}

.error-content li {
  color: var(--dedsi-text-secondary, rgba(0, 0, 0, 0.45));
  margin: 8px 0;
  line-height: 1.6;
}

.tips {
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
  margin-bottom: 12px;
  font-weight: 500;
}

/* API 文档样式 */
.api-docs {
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
}

.api-docs h4 {
  font-size: 16px;
  font-weight: 500;
  margin: 24px 0 16px 0;
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
}

.api-docs h4:first-child {
  margin-top: 0;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.api-table th,
.api-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--dedsi-border-color-lighter, #f0f0f0);
}

.api-table th {
  background-color: var(--dedsi-bg-color-page, #f0f2f5);
  font-weight: 500;
  color: var(--dedsi-text-primary, rgba(0, 0, 0, 0.85));
}

.api-table td {
  color: var(--dedsi-text-secondary, rgba(0, 0, 0, 0.45));
}

.api-table code {
  background-color: var(--dedsi-bg-color-page, #f0f2f5);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  color: #eb2f96;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .component-demo {
    padding: 16px;
  }

  .demo-content {
    padding: 32px 16px;
  }

  .content-item {
    flex-direction: column;
    text-align: left;
  }

  .label {
    min-width: auto;
    margin-bottom: 4px;
  }

  .api-table {
    font-size: 12px;
  }

  .api-table th,
  .api-table td {
    padding: 8px;
  }
}
</style>
