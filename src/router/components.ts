import { h } from 'vue'
import { AppstoreOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const componentsRoutes: RouteRecordRaw = {
    path: '/components',
    name: 'Components',
    meta: { title: '组件演示', icon: h(AppstoreOutlined) },
    children: [
        {
            path: '/components/overview',
            name: 'ComponentsOverview',
            component: () => import('@/views/componentViews/index.vue'),
            meta: { title: '组件首页' }
        },
        {
            path: '/components/dedsi-row',
            name: 'DedsiRowDemo',
            component: () => import('@/views/componentViews/dedsi-row/index.vue'),
            meta: { title: 'Dedsi Row/Col' }
        },
        {
            path: '/components/dedsi-table',
            name: 'DedsiTableDemo',
            component: () => import('@/views/componentViews/dedsi-table/index.vue'),
            meta: { title: 'Dedsi Table' }
        },
        {
            path: '/components/dedsi-button',
            name: 'DedsiButtonDemo',
            component: () => import('@/views/componentViews/dedsi-button/index.vue'),
            meta: { title: 'Dedsi Button' }
        },
        {
            path: '/components/dedsi-tag',
            name: 'DedsiTagDemo',
            component: () => import('@/views/componentViews/dedsi-tag/index.vue'),
            meta: { title: 'Dedsi Tag' }
        },
        {
            path: '/components/dedsi-split',
            name: 'DedsiSplitDemo',
            component: () => import('@/views/componentViews/dedsi-split/index.vue'),
            meta: { title: 'Dedsi Split(Left/Right)' }
        },
        {
            path: '/components/dedsi-space',
            name: 'DedsiSpaceDemo',
            component: () => import('@/views/componentViews/dedsi-space/index.vue'),
            meta: { title: 'Dedsi Space' }
        },
        {
            path: '/components/dedsi-alert',
            name: 'DedsiAlertDemo',
            component: () => import('@/views/componentViews/dedsi-alert/index.vue'),
            meta: { title: 'Dedsi Alert' }
        },
        {
            path: '/components/dedsi-tabs',
            name: 'DedsiTabsDemo',
            component: () => import('@/views/componentViews/dedsi-tabs/index.vue'),
            meta: { title: 'Dedsi Tabs' }
        },
        {
            path: '/components/dedsi-qrcode',
            name: 'DedsiQRCodeDemo',
            component: () => import('@/views/componentViews/dedsi-qrcode/index.vue'),
            meta: { title: 'Dedsi QRCode' }
        },
        {
            path: '/components/dedsi-tooltip',
            name: 'DedsiTooltipDemo',
            component: () => import('@/views/componentViews/dedsi-tooltip/index.vue'),
            meta: { title: 'Dedsi Tooltip' }
        },
        {
            path: '/components/dedsi-popconfirm',
            name: 'DedsiPopconfirmDemo',
            component: () => import('@/views/componentViews/dedsi-popconfirm/index.vue'),
            meta: { title: 'Dedsi Popconfirm' }
        },
        {
            path: '/components/dedsi-popover',
            name: 'DedsiPopoverDemo',
            component: () => import('@/views/componentViews/dedsi-popover/index.vue'),
            meta: { title: 'Dedsi Popover' }
        },
        {
            path: '/components/dedsi-image',
            name: 'DedsiImageDemo',
            component: () => import('@/views/componentViews/dedsi-image/index.vue'),
            meta: { title: 'Dedsi Image' }
        },
        {
            path: '/components/dedsi-card',
            name: 'DedsiCardDemo',
            component: () => import('@/views/componentViews/dedsi-card/index.vue'),
            meta: { title: 'Dedsi Card' }
        },
        {
            path: '/components/dedsi-descriptions',
            name: 'DedsiDescriptionsDemo',
            component: () => import('@/views/componentViews/dedsi-descriptions/index.vue'),
            meta: { title: 'Dedsi Descriptions' }
        },
        {
            path: '/components/dedsi-badge',
            name: 'DedsiBadgeDemo',
            component: () => import('@/views/componentViews/dedsi-badge/index.vue'),
            meta: { title: 'Dedsi Badge' }
        },
        {
            path: '/components/dedsi-avatar',
            name: 'DedsiAvatarDemo',
            component: () => import('@/views/componentViews/dedsi-avatar/index.vue'),
            meta: { title: 'Dedsi Avatar' }
        },
        {
            path: '/components/dedsi-breadcrumb',
            name: 'DedsiBreadcrumbDemo',
            component: () => import('@/views/componentViews/dedsi-breadcrumb/index.vue'),
            meta: { title: 'Dedsi Breadcrumb' }
        },
        {
            path: '/components/dedsi-divider',
            name: 'DedsiDividerDemo',
            component: () => import('@/views/componentViews/dedsi-divider/index.vue'),
            meta: { title: 'Dedsi Divider' }
        },
        {
            path: '/components/dedsi-segmented',
            name: 'DedsiSegmentedDemo',
            component: () => import('@/views/componentViews/dedsi-segmented/index.vue'),
            meta: { title: 'Dedsi Segmented' }
        },
        {
            path: '/components/dedsi-statistic',
            name: 'DedsiStatisticDemo',
            component: () => import('@/views/componentViews/dedsi-statistic/index.vue'),
            meta: { title: 'Dedsi Statistic' }
        },
        {
            path: '/components/dedsi-number-converter',
            name: 'DedsiNumberConverterDemo',
            component: () => import('@/views/componentViews/dedsi-number-converter/index.vue'),
            meta: { title: 'Dedsi Number Converter' }
        },
        {
            path: '/components/dedsi-typography',
            name: 'DedsiTypographyDemo',
            component: () => import('@/views/componentViews/dedsi-typography/index.vue'),
            meta: { title: 'Dedsi Typography' }
        },
        {
            path: '/components/dedsi-dropdown',
            name: 'DedsiDropdownDemo',
            component: () => import('@/views/componentViews/dedsi-dropdown/index.vue'),
            meta: { title: 'Dedsi Dropdown' }
        },
        {
            path: '/components/dedsi-countdown',
            name: 'DedsiCountdownDemo',
            component: () => import('@/views/componentViews/dedsi-countdown/index.vue'),
            meta: { title: 'Dedsi Countdown' }
        },
        {
            path: '/components/dedsi-empty',
            name: 'DedsiEmptyDemo',
            component: () => import('@/views/componentViews/dedsi-empty/index.vue'),
            meta: { title: 'Dedsi Empty' }
        },
        {
            path: '/components/dedsi-result',
            name: 'DedsiResultDemo',
            component: () => import('@/views/componentViews/dedsi-result/index.vue'),
            meta: { title: 'Dedsi Result' }
        },
        {
            path: '/components/dedsi-drawer',
            name: 'DedsiDrawerDemo',
            component: () => import('@/views/componentViews/dedsi-drawer/index.vue'),
            meta: { title: 'Dedsi Drawer' }
        },
        {
            path: '/components/dedsi-scrollbar',
            name: 'DedsiScrollbarDemo',
            component: () => import('@/views/componentViews/dedsi-scrollbar/index.vue'),
            meta: { title: 'Dedsi Scrollbar' }
        },
        {
            path: '/components/dedsi-message',
            name: 'DedsiMessageDemo',
            component: () => import('@/views/componentViews/dedsi-message/index.vue'),
            meta: { title: 'Dedsi Message' }
        },
        {
            path: '/components/dedsi-dialog',
            name: 'DedsiDialogDemo',
            component: () => import('@/views/componentViews/dedsi-dialog/index.vue'),
            meta: { title: 'Dedsi Dialog' }
        },
        {
            path: '/components/dedsi-modal',
            name: 'DedsiModalDemo',
            component: () => import('@/views/componentViews/dedsi-modal/index.vue'),
            meta: { title: 'Dedsi Modal' }
        },
        {
            path: '/components/dedsi-marquee',
            name: 'DedsiMarqueeDemo',
            component: () => import('@/views/componentViews/dedsi-marquee/index.vue'),
            meta: { title: 'Dedsi Marquee' }
        },
        {
            path: '/components/dedsi-skeleton',
            name: 'DedsiSkeletonDemo',
            component: () => import('@/views/componentViews/dedsi-skeleton/index.vue'),
            meta: { title: 'Dedsi Skeleton' }
        },
        {
            path: '/components/dedsi-menu',
            name: 'DedsiMenuDemo',
            component: () => import('@/views/componentViews/dedsi-menu/index.vue'),
            meta: { title: 'Dedsi Menu' }
        },
        // 数据录入组件
        {
            path: '/components/dedsi-form',
            name: 'DedsiFormDemo',
            component: () => import('@/views/componentViews/dedsi-form/index.vue'),
            meta: { title: 'Dedsi Form' }
        },
        {
            path: '/components/dedsi-form-item',
            name: 'DedsiFormItemDemo',
            component: () => import('@/views/componentViews/dedsi-form-item/index.vue'),
            meta: { title: 'Dedsi FormItem' }
        },
        {
            path: '/components/dedsi-input',
            name: 'DedsiInputDemo',
            component: () => import('@/views/componentViews/dedsi-input/index.vue'),
            meta: { title: 'Dedsi Input' }
        },
        {
            path: '/components/dedsi-input-number',
            name: 'DedsiInputNumberDemo',
            component: () => import('@/views/componentViews/dedsi-input-number/index.vue'),
            meta: { title: 'Dedsi InputNumber' }
        },
        {
            path: '/components/dedsi-textarea',
            name: 'DedsiTextareaDemo',
            component: () => import('@/views/componentViews/dedsi-textarea/index.vue'),
            meta: { title: 'Dedsi Textarea' }
        },
        {
            path: '/components/dedsi-input-password',
            name: 'DedsiInputPasswordDemo',
            component: () => import('@/views/componentViews/dedsi-input-password/index.vue'),
            meta: { title: 'Dedsi InputPassword' }
        },
        {
            path: '/components/dedsi-select',
            name: 'DedsiSelectDemo',
            component: () => import('@/views/componentViews/dedsi-select/index.vue'),
            meta: { title: 'Dedsi Select' }
        },
        {
            path: '/components/dedsi-option',
            name: 'DedsiOptionDemo',
            component: () => import('@/views/componentViews/dedsi-option/index.vue'),
            meta: { title: 'Dedsi Option' }
        },
        {
            path: '/components/dedsi-date-picker',
            name: 'DedsiDatePickerDemo',
            component: () => import('@/views/componentViews/dedsi-date-picker/index.vue'),
            meta: { title: 'Dedsi DatePicker' }
        },
        {
            path: '/components/dedsi-time-picker',
            name: 'DedsiTimePickerDemo',
            component: () => import('@/views/componentViews/dedsi-time-picker/index.vue'),
            meta: { title: 'Dedsi TimePicker' }
        },
        {
            path: '/components/dedsi-time-range-picker',
            name: 'DedsiTimeRangePickerDemo',
            component: () => import('@/views/componentViews/dedsi-time-range-picker/index.vue'),
            meta: { title: 'Dedsi TimeRangePicker' }
        },
        {
            path: '/components/dedsi-month-picker',
            name: 'DedsiMonthPickerDemo',
            component: () => import('@/views/componentViews/dedsi-month-picker/index.vue'),
            meta: { title: 'Dedsi MonthPicker' }
        },
        {
            path: '/components/dedsi-range-picker',
            name: 'DedsiRangePickerDemo',
            component: () => import('@/views/componentViews/dedsi-range-picker/index.vue'),
            meta: { title: 'Dedsi RangePicker' }
        },
        {
            path: '/components/dedsi-radio',
            name: 'DedsiRadioDemo',
            component: () => import('@/views/componentViews/dedsi-radio/index.vue'),
            meta: { title: 'Dedsi Radio' }
        },
        {
            path: '/components/dedsi-radio-group',
            name: 'DedsiRadioGroupDemo',
            component: () => import('@/views/componentViews/dedsi-radio-group/index.vue'),
            meta: { title: 'Dedsi RadioGroup' }
        },
        {
            path: '/components/dedsi-checkbox',
            name: 'DedsiCheckboxDemo',
            component: () => import('@/views/componentViews/dedsi-checkbox/index.vue'),
            meta: { title: 'Dedsi Checkbox' }
        },
        {
            path: '/components/dedsi-checkbox-group',
            name: 'DedsiCheckboxGroupDemo',
            component: () => import('@/views/componentViews/dedsi-checkbox-group/index.vue'),
            meta: { title: 'Dedsi CheckboxGroup' }
        },
        {
            path: '/components/dedsi-switch',
            name: 'DedsiSwitchDemo',
            component: () => import('@/views/componentViews/dedsi-switch/index.vue'),
            meta: { title: 'Dedsi Switch' }
        },
        {
            path: '/components/dedsi-slider',
            name: 'DedsiSliderDemo',
            component: () => import('@/views/componentViews/dedsi-slider/index.vue'),
            meta: { title: 'Dedsi Slider' }
        },
        {
            path: '/components/dedsi-rate',
            name: 'DedsiRateDemo',
            component: () => import('@/views/componentViews/dedsi-rate/index.vue'),
            meta: { title: 'Dedsi Rate' }
        },
        {
            path: '/components/dedsi-upload',
            name: 'DedsiUploadDemo',
            component: () => import('@/views/componentViews/dedsi-upload/index.vue'),
            meta: { title: 'Dedsi Upload' }
        },
        {
            path: '/components/dedsi-transfer',
            name: 'DedsiTransferDemo',
            component: () => import('@/views/componentViews/dedsi-transfer/index.vue'),
            meta: { title: 'Dedsi Transfer' }
        },
        {
            path: '/components/dedsi-auto-complete',
            name: 'DedsiAutoCompleteDemo',
            component: () => import('@/views/componentViews/dedsi-auto-complete/index.vue'),
            meta: { title: 'Dedsi AutoComplete' }
        },
        {
            path: '/components/dedsi-cascader',
            name: 'DedsiCascaderDemo',
            component: () => import('@/views/componentViews/dedsi-cascader/index.vue'),
            meta: { title: 'Dedsi Cascader' }
        },
        {
            path: '/components/dedsi-tree-select',
            name: 'DedsiTreeSelectDemo',
            component: () => import('@/views/componentViews/dedsi-tree-select/index.vue'),
            meta: { title: 'Dedsi TreeSelect' }
        },
        {
            path: '/components/dedsi-mentions',
            name: 'DedsiMentionsDemo',
            component: () => import('@/views/componentViews/dedsi-mentions/index.vue'),
            meta: { title: 'Dedsi Mentions' }
        }
    ]
}

export default componentsRoutes
