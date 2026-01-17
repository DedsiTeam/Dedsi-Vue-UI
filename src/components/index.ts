import type { App } from 'vue'
import './theme.css'
import 'virtual:uno.css'

import { DedsiTable } from './dedsi-table'
import { DedsiButton } from './dedsi-button'
import { DedsiTag } from './dedsi-tag'
import { DedsiSplit } from './dedsi-split'
import { DedsiSpace } from './dedsi-space'
import { DedsiAlert } from './dedsi-alert'
import { DedsiTooltip } from './dedsi-tooltip'
import { DedsiTabs, DedsiTabPane } from './dedsi-tabs'
import { DedsiQRCode } from './dedsi-qrcode'
import { DedsiPopconfirm } from './dedsi-popconfirm'
import { DedsiPopover } from './dedsi-popover'
import { DedsiPopper } from './dedsi-popper'
import { DedsiImage } from './dedsi-image'
import { DedsiCard } from './dedsi-card'
import { DedsiBadge } from './dedsi-badge'
import { DedsiAvatar } from './dedsi-avatar'
import { DedsiBreadcrumb, DedsiBreadcrumbItem } from './dedsi-breadcrumb'
import { DedsiDivider } from './dedsi-divider'
import { DedsiSegmented } from './dedsi-segmented'
import { DedsiStatistic } from './dedsi-statistic'
import { DedsiNumberConverter } from './dedsi-number-converter'
import { DedsiTypography } from './dedsi-typography'
import { DedsiDropdown } from './dedsi-dropdown'
import { DedsiCountdown } from './dedsi-countdown'
import { DedsiEmpty } from './dedsi-empty'
import { DedsiDialog } from './dedsi-dialog'
import { DedsiDrawer } from './dedsi-drawer'
import { DedsiMarquee } from './dedsi-marquee'
import { DedsiScrollbar } from './dedsi-scrollbar'
import { DedsiSkeleton } from './dedsi-skeleton'
import { DedsiMenu } from './dedsi-menu'
import { DedsiMessage } from './dedsi-message'
import { DedsiModal } from './dedsi-modal'
import { DedsiMenuItem, DedsiSubMenu } from './dedsi-menu'
import { DedsiRow, DedsiCol } from './dedsi-row'
import { DedsiForm } from './dedsi-form'
import { DedsiFormItem } from './dedsi-form-item'
import { DedsiInput } from './dedsi-input'
import { DedsiInputNumber } from './dedsi-input-number'
import { DedsiTextarea } from './dedsi-textarea'
import { DedsiInputPassword } from './dedsi-input-password'
import { DedsiSelect } from './dedsi-select'
import { DedsiDatePicker } from './dedsi-date-picker'
import { DedsiTimePicker } from './dedsi-time-picker'
import { DedsiTimeRangePicker } from './dedsi-time-range-picker'
import { DedsiMonthPicker } from './dedsi-month-picker'
import { DedsiRangePicker } from './dedsi-range-picker'
import { DedsiRadio } from './dedsi-radio'
import { DedsiRadioGroup } from './dedsi-radio-group'
import { DedsiCheckbox } from './dedsi-checkbox'
import { DedsiCheckboxGroup } from './dedsi-checkbox-group'
import { DedsiSwitch } from './dedsi-switch'
import { DedsiSlider } from './dedsi-slider'
import { DedsiRate } from './dedsi-rate'
import { DedsiUpload } from './dedsi-upload'
import { DedsiTransfer } from './dedsi-transfer'
import { DedsiAutoComplete } from './dedsi-auto-complete'
import { DedsiCascader } from './dedsi-cascader'
import { DedsiTreeSelect } from './dedsi-tree-select'
import { DedsiMentions } from './dedsi-mentions'

const components = [
    { name: 'dedsi-table', component: DedsiTable },
    { name: 'dedsi-button', component: DedsiButton },
    { name: 'dedsi-tag', component: DedsiTag },
    { name: 'dedsi-split', component: DedsiSplit },
    { name: 'dedsi-space', component: DedsiSpace },
    { name: 'dedsi-alert', component: DedsiAlert },
    { name: 'dedsi-tooltip', component: DedsiTooltip },
    { name: 'dedsi-tabs', component: DedsiTabs },
    { name: 'dedsi-tab-pane', component: DedsiTabPane },
    { name: 'dedsi-qrcode', component: DedsiQRCode },
    { name: 'dedsi-popconfirm', component: DedsiPopconfirm },
    { name: 'dedsi-popover', component: DedsiPopover },
    { name: 'dedsi-popper', component: DedsiPopper },
    { name: 'dedsi-image', component: DedsiImage },
    { name: 'dedsi-card', component: DedsiCard },
    { name: 'dedsi-badge', component: DedsiBadge },
    { name: 'dedsi-avatar', component: DedsiAvatar },
    { name: 'dedsi-breadcrumb', component: DedsiBreadcrumb },
    { name: 'dedsi-breadcrumb-item', component: DedsiBreadcrumbItem },
    { name: 'dedsi-divider', component: DedsiDivider },
    { name: 'dedsi-segmented', component: DedsiSegmented },
    { name: 'dedsi-statistic', component: DedsiStatistic },
    { name: 'dedsi-number-converter', component: DedsiNumberConverter },
    { name: 'dedsi-typography', component: DedsiTypography },
    { name: 'dedsi-dropdown', component: DedsiDropdown },
    { name: 'dedsi-countdown', component: DedsiCountdown },
    { name: 'dedsi-empty', component: DedsiEmpty },
    { name: 'dedsi-dialog', component: DedsiDialog },
    { name: 'dedsi-modal', component: DedsiModal },
    { name: 'dedsi-marquee', component: DedsiMarquee },
    { name: 'dedsi-scrollbar', component: DedsiScrollbar },
    { name: 'dedsi-skeleton', component: DedsiSkeleton },
    { name: 'dedsi-menu', component: DedsiMenu },
    { name: 'dedsi-drawer', component: DedsiDrawer },
    { name: 'dedsi-menu-item', component: DedsiMenuItem },
    { name: 'dedsi-sub-menu', component: DedsiSubMenu },
    { name: 'dedsi-row', component: DedsiRow },
    { name: 'dedsi-col', component: DedsiCol },
    // 数据录入组件
    { name: 'dedsi-form', component: DedsiForm },
    { name: 'dedsi-form-item', component: DedsiFormItem },
    { name: 'dedsi-input', component: DedsiInput },
    { name: 'dedsi-input-number', component: DedsiInputNumber },
    { name: 'dedsi-textarea', component: DedsiTextarea },
    { name: 'dedsi-input-password', component: DedsiInputPassword },
    { name: 'dedsi-select', component: DedsiSelect },
    { name: 'dedsi-date-picker', component: DedsiDatePicker },
    { name: 'dedsi-time-picker', component: DedsiTimePicker },
    { name: 'dedsi-time-range-picker', component: DedsiTimeRangePicker },
    { name: 'dedsi-month-picker', component: DedsiMonthPicker },
    { name: 'dedsi-range-picker', component: DedsiRangePicker },
    { name: 'dedsi-radio', component: DedsiRadio },
    { name: 'dedsi-radio-group', component: DedsiRadioGroup },
    { name: 'dedsi-checkbox', component: DedsiCheckbox },
    { name: 'dedsi-checkbox-group', component: DedsiCheckboxGroup },
    { name: 'dedsi-switch', component: DedsiSwitch },
    { name: 'dedsi-slider', component: DedsiSlider },
    { name: 'dedsi-rate', component: DedsiRate },
    { name: 'dedsi-upload', component: DedsiUpload },
    { name: 'dedsi-transfer', component: DedsiTransfer },
    { name: 'dedsi-auto-complete', component: DedsiAutoComplete },
    { name: 'dedsi-cascader', component: DedsiCascader },
    { name: 'dedsi-tree-select', component: DedsiTreeSelect },
    { name: 'dedsi-mentions', component: DedsiMentions }
]

const install = (app: App) => {
    components.forEach(item => {
        app.component(item.name, item.component)
    })
    app.config.globalProperties.$message = DedsiMessage
}

// 导出插件对象
export default {
    install
}

// 同时导出 install 方法作为 use 的别名形式（如果用户习惯这么调用）
export const useDedsiComponents = (app: App) => {
    install(app)
}

// 导出单个组件，方便按需引入
export {
    DedsiRow,
    DedsiCol,
    DedsiTable,
    DedsiButton,
    DedsiTag,
    DedsiSplit,
    DedsiSpace,
    DedsiAlert,
    DedsiTooltip,
    DedsiTabs,
    DedsiTabPane,
    DedsiQRCode,
    DedsiPopconfirm,
    DedsiPopover,
    DedsiPopper,
    DedsiImage,
    DedsiCard,
    DedsiBadge,
    DedsiAvatar,
    DedsiBreadcrumb,
    DedsiBreadcrumbItem,
    DedsiDivider,
    DedsiSegmented,
    DedsiStatistic,
    DedsiNumberConverter,
    DedsiTypography,
    DedsiDropdown,
    DedsiCountdown,
    DedsiEmpty,
    DedsiDialog,
    DedsiDrawer,
    DedsiModal,
    DedsiMarquee,
    DedsiScrollbar,
    DedsiSkeleton,
    DedsiMenu,
    DedsiMenuItem,
    DedsiSubMenu,
    DedsiMessage,
    DedsiForm,
    DedsiFormItem,
    DedsiInput,
    DedsiInputNumber,
    DedsiTextarea,
    DedsiInputPassword,
    DedsiSelect,
    DedsiDatePicker,
    DedsiTimePicker,
    DedsiTimeRangePicker,
    DedsiMonthPicker,
    DedsiRangePicker,
    DedsiRadio,
    DedsiRadioGroup,
    DedsiCheckbox,
    DedsiCheckboxGroup,
    DedsiSwitch,
    DedsiSlider,
    DedsiRate,
    DedsiUpload,
    DedsiTransfer,
    DedsiAutoComplete,
    DedsiCascader,
    DedsiTreeSelect,
    DedsiMentions
}

// 导出类型
export type { Column } from './dedsi-table'
export type { DropdownMenuItem } from './dedsi-dropdown'
export type { MenuItem } from './dedsi-menu'
