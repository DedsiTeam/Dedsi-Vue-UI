# Dedsi-Vue-UI 数据录入组件

基于 Ant Design Vue 4.x 封装的组件库，提供统一的前缀命名和导出方式。

## 📦 已创建的数据录入组件（共24个）

### 表单相关（2个）
- `DedsiForm` - 表单组件
- `DedsiFormItem` - 表单项组件

### 输入相关（4个）
- `DedsiInput` - 输入框组件
- `DedsiInputNumber` - 数字输入框组件
- `DedsiTextarea` - 文本域组件
- `DedsiInputPassword` - 密码输入框组件

### 选择相关（5个）
- `DedsiSelect` - 选择器组件
- `DedsiOption` - 选项组件
- `DedsiAutoComplete` - 自动完成组件
- `DedsiCascader` - 级联选择器组件
- `DedsiTreeSelect` - 树选择组件

### 日期时间（5个）
- `DedsiDatePicker` - 日期选择器组件
- `DedsiTimePicker` - 时间选择器组件
- `DedsiMonthPicker` - 月份选择器组件
- `DedsiRangePicker` - 日期范围选择器组件

### 选项相关（4个）
- `DedsiRadio` - 单选框组件
- `DedsiRadioGroup` - 单选框组组件
- `DedsiCheckbox` - 复选框组件
- `DedsiCheckboxGroup` - 复选框组组件

### 其他数据录入（4个）
- `DedsiSwitch` - 开关组件
- `DedsiSlider` - 滑动条组件
- `DedsiRate` - 评分组件
- `DedsiUpload` - 上传组件
- `DedsiTransfer` - 穿梭框组件
- `DedsiMentions` - 提及组件

## 🚀 使用方法

### 方式一：从主入口引入（推荐）

```typescript
import {
  DedsiForm,
  DedsiFormItem,
  DedsiInput,
  DedsiSelect,
  DedsiDatePicker
} from 'dedsi-vue-ui'
```

### 方式二：单独引入

```typescript
import DedsiForm from 'dedsi-vue-ui/src/components/dedsi-form'
import DedsiFormItem from 'dedsi-vue-ui/src/components/dedsi-form-item'
import DedsiInput from 'dedsi-vue-ui/src/components/dedsi-input'
```

### 方式三：全局注册

在 `main.ts` 中：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import DedsiVueUI from 'dedsi-vue-ui'

const app = createApp(App)

app.use(DedsiVueUI)
app.mount('#app')
```

## 💡 使用示例

```vue
<template>
  <DedsiForm :model="formData" :rules="rules" layout="vertical">
    <DedsiFormItem label="用户名" name="username">
      <DedsiInput
        v-model:value="formData.username"
        placeholder="请输入用户名"
        allow-clear
      />
    </DedsiFormItem>

    <DedsiFormItem label="年龄" name="age">
      <DedsiInputNumber
        v-model:value="formData.age"
        :min="0"
        :max="100"
        style="width: 100%"
      />
    </DedsiFormItem>

    <DedsiFormItem label="性别" name="gender">
      <DedsiSelect v-model:value="formData.gender" placeholder="请选择性别">
        <DedsiOption value="male">男</DedsiOption>
        <DedsiOption value="female">女</DedsiOption>
      </DedsiSelect>
    </DedsiFormItem>

    <DedsiFormItem label="生日" name="birthday">
      <DedsiDatePicker
        v-model:value="formData.birthday"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        style="width: 100%"
      />
    </DedsiFormItem>

    <DedsiFormItem label="个人简介" name="bio">
      <DedsiTextarea
        v-model:value="formData.bio"
        placeholder="请输入个人简介"
        :rows="4"
      />
    </DedsiFormItem>

    <DedsiFormItem label="是否同意" name="agreed">
      <DedsiSwitch v-model:checked="formData.agreed" />
    </DedsiFormItem>

    <DedsiFormItem label="评分" name="rating">
      <DedsiRate v-model:value="formData.rating" allow-half />
    </DedsiFormItem>

    <DedsiFormItem label="爱好" name="hobbies">
      <DedsiCheckboxGroup v-model:value="formData.hobbies">
        <DedsiCheckbox value="reading">阅读</DedsiCheckbox>
        <DedsiCheckbox value="music">音乐</DedsiCheckbox>
        <DedsiCheckbox value="sports">运动</DedsiCheckbox>
      </DedsiCheckboxGroup>
    </DedsiFormItem>

    <DedsiFormItem label="满意度" name="satisfaction">
      <DedsiRadioGroup v-model:value="formData.satisfaction">
        <DedsiRadio value="very-satisfied">非常满意</DedsiRadio>
        <DedsiRadio value="satisfied">满意</DedsiRadio>
        <DedsiRadio value="neutral">一般</DedsiRadio>
        <DedsiRadio value="dissatisfied">不满意</DedsiRadio>
      </DedsiRadioGroup>
    </DedsiFormItem>
  </DedsiForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FormData {
  username: string
  age: number | null
  gender: string | null
  birthday: string | null
  bio: string
  agreed: boolean
  rating: number
  hobbies: string[]
  satisfaction: string
}

const formData = ref<FormData>({
  username: '',
  age: null,
  gender: null,
  birthday: null,
  bio: '',
  agreed: false,
  rating: 0,
  hobbies: [],
  satisfaction: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
}
</script>
```

## ✨ 特性

- ✅ 统一的前缀命名 `Dedsi`
- ✅ 完全兼容 Ant Design Vue 的所有功能
- ✅ 支持 TypeScript 类型推导
- ✅ 提供多种引入方式
- ✅ 支持全局注册
- ✅ 代码简洁，易于维护
- ✅ 所有组件都已注册到主入口文件

## 📝 组件文件结构

每个数据录入组件都遵循相同的结构：

```
src/components/dedsi-xxx/
└── index.ts
```

`index.ts` 文件内容模板：

```typescript
import { ComponentName as DedsiComponentName } from 'ant-design-vue'

export { DedsiComponentName }
export default DedsiComponentName
```

## 📚 详细文档

所有组件都是 Ant Design Vue 的直接封装，使用方式与 Ant Design Vue 完全一致。详细的 props、events 和插槽请参考 [Ant Design Vue 官方文档](https://antdv.com/)。

## 🔗 相关资源

- [Ant Design Vue 官方文档](https://antdv.com/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
