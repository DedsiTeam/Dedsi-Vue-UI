import type { InjectionKey, Ref } from 'vue'

export interface DedsiDescriptionsContext {
  bordered: Ref<boolean>
  colon: Ref<boolean>
  layout: Ref<'horizontal' | 'vertical'>
  size: Ref<'default' | 'middle' | 'small'>
}

export const descriptionsContextKey: InjectionKey<DedsiDescriptionsContext> = Symbol('dedsi-descriptions-context')
