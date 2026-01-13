# Dedsi Admin AI

<p align="center">
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite" />
  <img alt="UnoCSS" src="https://img.shields.io/badge/UnoCSS-Preset-333333?style=flat-square&logo=unocss" />
</p>

**Dedsi Admin AI** 是一个现代化的后台管理系统解决方案，基于 **Vue 3** + **TypeScript** + **Vite** 构建。项目摒弃了传统的重量级 UI 框架依赖，采用 **UnoCSS** 结合自研的 **Dedsi UI** 组件库，提供了轻量、高性能且高度可定制的开发体验。

它内置了 AI 对话、工作流引擎、权限管理等复杂的业务模块（Mock数据），适合作为构建企业级 AI 应用或复杂中后台系统的基础框架。

## ✨ 核心特性

- **🚀 前沿技术栈**: 采用最新的 Vue 3.5, Vite 6, TypeScript 5.9 等前沿技术。
- **🎨 Dedsi UI 组件库**: 内置 30+ 纯原生、轻量级自定义组件（无需 ElementUI/AntDesign），包含表格、表单、弹窗、抽屉等核心交互组件。
- **🤖 AI 能力集成**: 预置 AI Chat 界面，支持流式对话交互体验。
- **⚡ 原子化 CSS**: 使用 **UnoCSS** 进行极速样式开发，减少 CSS 体积。
- **🔐 权限管理系统**: 完善的基于 RBAC（Role-Based Access Control）的用户、角色、权限管理体系。
- **🔄 工作流引擎**: 内置工作流配置与管理模块。
- **🛠️ 完善的工程化**: TypeScript 全量覆盖，模块化 API 服务 (`apiServices`)，Pinia 状态管理。

## 🛠️ 技术栈

| 领域 | 技术方案 | 说明 |
| --- | --- | --- |
| **核心框架** | Vue 3.5 | 组合式 API (Composition API) |
| **构建工具** | Vite | 极速冷启动与热更新 |
| **编程语言** | TypeScript | 强类型支持 |
| **样式引擎** | UnoCSS | 原子化 CSS 引擎 |
| **状态管理** | Pinia | 官方推荐的状态管理库 |
| **路由管理** | Vue Router 4 | 路由配置与守卫 |
| **网络请求** | Axios | 统一拦截器封装 |
| **图表库** | @antv/g2 | 可视化图表支持 |
| **图标库** | @ant-design/icons-vue | 高质量图标资源 |

## 📂 目录结构

```text
dedsi-admin-ai/
├── public/              # 静态资源
├── src/
│   ├── apiServices/     # API 服务模块（按业务领域划分）
│   │   ├── identitys/   # 身份认证相关 API
│   │   └── ...
│   ├── components/      # Dedsi UI 自定义组件库
│   │   ├── dedsi-button/
│   │   ├── dedsi-table/
│   │   ├── dedsi-form/
│   │   └── ...
│   ├── configs/         # 全局配置
│   ├── layouts/         # 布局组件 (BasicLayout)
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态仓库
│   ├── utils/           # 工具函数 (Axios 封装等)
│   ├── views/           # 页面视图
│   │   ├── ai-chat/     # AI 对话模块
│   │   ├── dashboard/   # 仪表盘
│   │   ├── workflow/    # 工作流模块
│   │   └── user/        # 用户管理
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   └── style.css        # 全局样式
├── uno.config.ts        # UnoCSS 配置
├── vite.config.ts       # Vite 配置
└── package.json         # 项目依赖与脚本
```

## 📦 组件库概览 (Dedsi UI)

项目内置了一套轻量级组件库，位于 `src/components`：

- **通用**: Button, Icon (AntD), Typography
- **布局**: Layout, Divider, Space, Row, Split
- **导航**: Menu, Breadcrumb, Dropdown, Tabs
- **数据录入**: Form, Input, Select, NumberConverter
- **数据展示**: Table, Card, List, Tree, Avatar, Badge, Tag, Image, QRCode, Statistic
- **反馈**: Alert, Modal, Drawer, Message, Popconfirm, Popover, Skeleton, Tooltip

## 🚀 快速开始

### 环境准备

确保你的本地环境已安装 [Node.js](https://nodejs.org/) (推荐 v18+) 和 [pnpm](https://pnpm.io/)。

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```

访问 `http://localhost:5173` 即可预览项目。

### 构建生产环境

```bash
pnpm build
```

构建产物将输出到 `dist` 目录。

### 本地预览构建产物

```bash
pnpm preview
```