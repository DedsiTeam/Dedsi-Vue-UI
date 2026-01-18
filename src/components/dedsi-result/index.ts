import DedsiResult from './DedsiResult.vue'

export { DedsiResult }
export default DedsiResult

// 导出类型定义
export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'

export interface ResultProps {
  /** 结果状态，决定图标和颜色 */
  status?: ResultStatus
  /** 成功状态（兼容旧版） */
  success?: boolean
  /** 错误状态（兼容旧版） */
  error?: boolean
  /** 信息状态（兼容旧版） */
  info?: boolean
  /** 警告状态（兼容旧版） */
  warning?: boolean
  /** 404 状态（兼容旧版） */
  '404'?: boolean
  /** 403 状态（兼容旧版） */
  '403'?: boolean
  /** 500 状态（兼容旧版） */
  '500'?: boolean
  /** 标题文本 */
  title?: string
  /** 副标题文本 */
  subTitle?: string
  /** 自定义图标 */
  icon?: any
}

// 插槽定义
export interface ResultSlots {
  /** 自定义图标 */
  icon?: () => any
  /** 自定义标题 */
  title?: () => any
  /** 自定义副标题 */
  subTitle?: () => any
  /** 额外操作区域 */
  extra?: () => any
  /** 默认内容区域 */
  default?: () => any
}
