---
name: Dedsi Vue UI 指南
description: Dedsi Vue UI 组件库的详细文档和使用指南。
---

# Dedsi Vue UI 指南

本技能 (Skill) 提供了关于 `Dedsi-Vue-UI` 组件库的全面信息，列出了所有可用组件及其一般用途。

## 使用方法

### 全局注册

你可以在 Vue 应用中全局注册所有组件：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import DedsiVueUI from 'dedsi-vue-ui'

const app = createApp(App)
app.use(DedsiVueUI)
app.mount('#app')
```

### 按需引入

你也可以根据需要单独引入组件：

```typescript
import { DedsiButton, DedsiInput } from 'dedsi-vue-ui'
```

## 组件参考

本库包含以下组件，按其主要功能分类。

### 布局 (Layout)
帮助在页面上排列元素的组件。

- **DedsiRow**: 栅格系统中的行。
- **DedsiCol**: 栅格系统中的列。
- **DedsiSpace**: 设置元素之间的统一间距。
- **DedsiSplit**: 分割视图或内容区域。
- **DedsiDivider**: 用于分隔内容的分割线。
- **DedsiScrollbar**: 自定义滚动条容器。

### 通用 (General)
基础 UI 构建块。

- **DedsiButton**: 用于触发操作的交互式按钮。
- **DedsiTypography**: 文本样式和排版。

### 导航 (Navigation)
帮助用户在应用中导航的组件。

- **DedsiBreadcrumb / DedsiBreadcrumbItem**: 显示层级结构的面包屑导航。
- **DedsiDropdown**: 用于操作或选择的下拉菜单。
- **DedsiMenu / DedsiMenuItem / DedsiSubMenu**: 用于站点导航或上下文菜单的多功能菜单。
- **DedsiTabs / DedsiTabPane**: 用于在不同视图间切换的标签页界面。

### 数据录入 (Data Entry)
收集用户输入的组件。

- **DedsiForm / DedsiFormItem**: 用于验证和布局的表单容器及表单项。
- **DedsiInput**: 基础文本输入框。
- **DedsiSelect**: 下拉选择输入框。

### 数据展示 (Data Display)
以各种格式展示数据的组件。

- **DedsiTable**: 展示行列数据。
- **DedsiTag**: 标签或分类标记。
- **DedsiCard**: 包含头部和底部的卡片容器。
- **DedsiBadge**: 小型状态指示器或徽标数。
- **DedsiAvatar**: 用户头像或首字母缩写。
- **DedsiImage**: 带预览等可选功能的图片容器。
- **DedsiQRCode**: 渲染二维码。
- **DedsiSegmented**: 用于切换视图或状态的分段控制器。
- **DedsiStatistic**: 展示统计数据。
- **DedsiNumberConverter**: 数字格式化工具/组件。
- **DedsiCountdown**: 倒计时组件。
- **DedsiEmpty**: 空状态占位符。
- **DedsiMarquee**: 滚动文本或内容 (跑马灯)。
- **DedsiSkeleton**: 加载状态占位符 (骨架屏)。

### 反馈 (Feedback)
向用户提供反馈的组件。

- **DedsiAlert**: 横幅式反馈消息。
- **DedsiMessage**: 全局提示消息 (通过 `$message` 或导入调用)。
- **DedsiModal**: 模态对话框。
- **DedsiDialog**: 对话框 (类似于 Modal)。
- **DedsiDrawer**: 从屏幕边缘滑出的抽屉面板。
- **DedsiPopconfirm**: 点击确认对话框。
- **DedsiPopover**: 悬停/点击时显示的浮层内容。
- **DedsiPopper**: 基础定位组件 (通常用于内部或高级用途)。
- **DedsiTooltip**: 悬停时显示的文字提示。

## 类型 (Types)

本库还导出了一些 TypeScript 类型以提供更好的类型检查：

- `Column`: 用于 DedsiTable 配置。
- `SelectOption`: 用于 DedsiSelect 选项。
- `DropdownMenuItem`: 用于 DedsiDropdown以此类推菜单项。
- `MenuItem`: 用于 DedsiMenu 菜单项。
