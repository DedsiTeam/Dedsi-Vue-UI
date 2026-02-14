export interface ComponentItem {
    title: string;
    name: string;
    path: string;
    desc: string;
}

export interface ComponentGroup {
    title: string;
    items: ComponentItem[];
}

export const componentGroups: ComponentGroup[] = [
    {
        title: 'General (通用)',
        items: [
            { title: 'Dedsi Button', name: 'DedsiButtonDemo', path: '/components/dedsi-button', desc: '按钮组件，用于触发操作或跳转' },
            { title: 'Dedsi Typography', name: 'DedsiTypographyDemo', path: '/components/dedsi-typography', desc: '排版，用于展示标题、段落、文本等' },
        ]
    },
    {
        title: 'Layout (布局)',
        items: [
            { title: 'Dedsi Row/Col', name: 'DedsiRowDemo', path: '/components/dedsi-row', desc: '栅格布局系统，用于通过行和列来构建页面布局' },
            { title: 'Dedsi Split', name: 'DedsiSplitDemo', path: '/components/dedsi-split', desc: '分割面板，将区域分割为左右或上下两部分' },
            { title: 'Dedsi Space', name: 'DedsiSpaceDemo', path: '/components/dedsi-space', desc: '间距组件，用于设置组件之间的间距' },
            { title: 'Dedsi Divider', name: 'DedsiDividerDemo', path: '/components/dedsi-divider', desc: '分割线，用于区分不同内容段落' },
        ]
    },
    {
        title: 'Navigation (导航)',
        items: [
            { title: 'Dedsi Breadcrumb', name: 'DedsiBreadcrumbDemo', path: '/components/dedsi-breadcrumb', desc: '面包屑，显示当前页面在系统层级结构中的位置' },
            { title: 'Dedsi Dropdown', name: 'DedsiDropdownDemo', path: '/components/dedsi-dropdown', desc: '下拉菜单，向下弹出的列表' },
            { title: 'Dedsi Menu', name: 'DedsiMenuDemo', path: '/components/dedsi-menu', desc: '导航菜单，为网站提供导航功能的菜单' },
            { title: 'Dedsi Tabs', name: 'DedsiTabsDemo', path: '/components/dedsi-tabs', desc: '标签页，用于在不同的内容区域间进行切换' },
            { title: 'Dedsi Segmented', name: 'DedsiSegmentedDemo', path: '/components/dedsi-segmented', desc: '分段控制器，用于切换显示视图' },
        ]
    },
    {
        title: 'Data Display (数据展示)',
        items: [
            { title: 'Dedsi Table', name: 'DedsiTableDemo', path: '/components/dedsi-table', desc: '表格组件，用于展示行列数据' },
            { title: 'Dedsi Tag', name: 'DedsiTagDemo', path: '/components/dedsi-tag', desc: '标签组件，用于标记和分类' },
            { title: 'Dedsi QRCode', name: 'DedsiQRCodeDemo', path: '/components/dedsi-qrcode', desc: '二维码组件，用于生成二维条形码' },
            { title: 'Dedsi Image', name: 'DedsiImageDemo', path: '/components/dedsi-image', desc: '图片组件，支持预览等功能' },
            { title: 'Dedsi Card', name: 'DedsiCardDemo', path: '/components/dedsi-card', desc: '卡片组件，包含标题、内容和操作区域的容器' },
            { title: 'Dedsi Descriptions', name: 'DedsiDescriptionsDemo', path: '/components/dedsi-descriptions', desc: '描述列表组件，用于展示多组只读字段信息' },
            { title: 'Dedsi Badge', name: 'DedsiBadgeDemo', path: '/components/dedsi-badge', desc: '徽标数，出现在按钮、图标旁的数字或状态标记' },
            { title: 'Dedsi Avatar', name: 'DedsiAvatarDemo', path: '/components/dedsi-avatar', desc: '头像，用来代表用户或事物' },
            { title: 'Dedsi Statistic', name: 'DedsiStatisticDemo', path: '/components/dedsi-statistic', desc: '统计数值，用于展示统计数据' },
            { title: 'Dedsi Countdown', name: 'DedsiCountdownDemo', path: '/components/dedsi-countdown', desc: '倒计时，用于显示倒计时数值' },
            { title: 'Dedsi Marquee', name: 'DedsiMarqueeDemo', path: '/components/dedsi-marquee', desc: '跑马灯，用于滚动显示文本' },
            { title: 'Dedsi Empty', name: 'DedsiEmptyDemo', path: '/components/dedsi-empty', desc: '空状态，当数据为空时显示' },
            { title: 'Dedsi Result', name: 'DedsiResultDemo', path: '/components/dedsi-result', desc: '结果，用于反馈一系列操作任务的处理结果' },
        ]
    },
    {
        title: 'Data Entry (数据录入)',
        items: [
            { title: 'Dedsi Form', name: 'DedsiFormDemo', path: '/components/dedsi-form', desc: '表单组件，用于数据收集、验证和提交' },
            { title: 'Dedsi Input', name: 'DedsiInputDemo', path: '/components/dedsi-input', desc: '输入框组件，用于文本输入' },
            { title: 'Dedsi InputNumber', name: 'DedsiInputNumberDemo', path: '/components/dedsi-input-number', desc: '数字输入框组件，用于数值输入' },
            { title: 'Dedsi Textarea', name: 'DedsiTextareaDemo', path: '/components/dedsi-textarea', desc: '文本域组件，用于多行文本输入' },
            { title: 'Dedsi Input Password', name: 'DedsiInputPasswordDemo', path: '/components/dedsi-input-password', desc: '密码输入框组件，用于密码输入' },
            { title: 'Dedsi Select', name: 'DedsiSelectDemo', path: '/components/dedsi-select', desc: '选择器组件，用于选择一个或多个选项' },
            { title: 'Dedsi DatePicker', name: 'DedsiDatePickerDemo', path: '/components/dedsi-date-picker', desc: '日期选择器组件，用于选择日期' },
            { title: 'Dedsi TimePicker', name: 'DedsiTimePickerDemo', path: '/components/dedsi-time-picker', desc: '时间选择器组件，用于选择时间' },
            { title: 'Dedsi TimeRangePicker', name: 'DedsiTimeRangePickerDemo', path: '/components/dedsi-time-range-picker', desc: '时间范围选择器组件，用于选择时间范围' },
            { title: 'Dedsi MonthPicker', name: 'DedsiMonthPickerDemo', path: '/components/dedsi-month-picker', desc: '月份选择器组件，用于选择月份' },
            { title: 'Dedsi RangePicker', name: 'DedsiRangePickerDemo', path: '/components/dedsi-range-picker', desc: '日期范围选择器组件，用于选择日期范围' },
            { title: 'Dedsi Radio', name: 'DedsiRadioDemo', path: '/components/dedsi-radio', desc: '单选框组件，用于单选操作' },
            { title: 'Dedsi Checkbox', name: 'DedsiCheckboxDemo', path: '/components/dedsi-checkbox', desc: '复选框组件，用于多选操作' },
            { title: 'Dedsi Switch', name: 'DedsiSwitchDemo', path: '/components/dedsi-switch', desc: '开关组件，用于切换状态' },
            { title: 'Dedsi Slider', name: 'DedsiSliderDemo', path: '/components/dedsi-slider', desc: '滑动条组件，用于数值滑块选择' },
            { title: 'Dedsi Rate', name: 'DedsiRateDemo', path: '/components/dedsi-rate', desc: '评分组件，用于评分操作' },
            { title: 'Dedsi Upload', name: 'DedsiUploadDemo', path: '/components/dedsi-upload', desc: '上传组件，用于文件上传' },
            { title: 'Dedsi Transfer', name: 'DedsiTransferDemo', path: '/components/dedsi-transfer', desc: '穿梭框组件，用于数据穿梭选择' },
            { title: 'Dedsi AutoComplete', name: 'DedsiAutoCompleteDemo', path: '/components/dedsi-auto-complete', desc: '自动完成组件，用于输入自动补全' },
            { title: 'Dedsi Cascader', name: 'DedsiCascaderDemo', path: '/components/dedsi-cascader', desc: '级联选择器组件，用于级联数据选择' },
            { title: 'Dedsi TreeSelect', name: 'DedsiTreeSelectDemo', path: '/components/dedsi-tree-select', desc: '树选择组件，用于树形数据选择' },
            { title: 'Dedsi Mentions', name: 'DedsiMentionsDemo', path: '/components/dedsi-mentions', desc: '提及组件，用于提及功能' },
        ]
    },
    {
        title: 'Feedback (反馈)',
        items: [
            { title: 'Dedsi Alert', name: 'DedsiAlertDemo', path: '/components/dedsi-alert', desc: '警告提示，用于显示重要提示信息' },
            { title: 'Dedsi Popconfirm', name: 'DedsiPopconfirmDemo', path: '/components/dedsi-popconfirm', desc: '气泡确认框，点击操作前进行二次确认' },
            { title: 'Dedsi Message', name: 'DedsiMessageDemo', path: '/components/dedsi-message', desc: '全局提示，页面顶部显示的轻量级反馈' },
            { title: 'Dedsi Dialog', name: 'DedsiDialogDemo', path: '/components/dedsi-dialog', desc: '对话框，覆盖在页面上的模态框' },
            { title: 'Dedsi Modal', name: 'DedsiModalDemo', path: '/components/dedsi-modal', desc: '模态框，用于重要信息的展示或操作确认' },
            { title: 'Dedsi Drawer', name: 'DedsiDrawerDemo', path: '/components/dedsi-drawer', desc: '抽屉，从屏幕边缘滑出的浮层面板' },
            { title: 'Dedsi Skeleton', name: 'DedsiSkeletonDemo', path: '/components/dedsi-skeleton', desc: '骨架屏，在内容加载过程中展示的占位图形' },
            { title: 'Dedsi Tooltip', name: 'DedsiTooltipDemo', path: '/components/dedsi-tooltip', desc: '文字提示，鼠标移入时显示辅助信息' },
            { title: 'Dedsi Popover', name: 'DedsiPopoverDemo', path: '/components/dedsi-popover', desc: '气泡卡片，点击或移入时显示更多内容' },
        ]
    },
    {
        title: 'Other (其他)',
        items: [
            { title: 'Dedsi Scrollbar', name: 'DedsiScrollbarDemo', path: '/components/dedsi-scrollbar', desc: '滚动条，自定义样式的滚动条组件' },
            { title: 'Dedsi Number Converter', name: 'DedsiNumberConverterDemo', path: '/components/dedsi-number-converter', desc: '数字转换，用于数字的格式化或转换' },
        ]
    }
];
