<template>
    <div class="p-6 max-w-7xl mx-auto">
        <div class="mb-10">
            <h1 class="font-extrabold text-gray-900 tracking-tight">Dedsi Vue Ui</h1>
            <h2 class="font-extrabold text-gray-900 tracking-tight">Component Overview</h2>
            <p class="text-gray-500 mt-2 text-lg">Explore our collection of {{ totalComponents }} specialized components.</p>
        </div>

        <div v-for="group in componentGroups" :key="group.title" class="mb-12">
            <div class="flex items-center mb-6 border-b border-gray-100">
                <h3 class="text-xl font-bold text-gray-800">{{ group.title }}</h3>
                <span class="ml-3 px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">{{ group.items.length }}</span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div
                    v-for="comp in group.items"
                    :key="comp.path"
                    class="group relative bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                    @click="$router.push(comp.path)"
                >
                    <div>
                        <div class="flex items-start justify-between mb-1">
                            <h4 class="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate pr-2" :title="comp.title">{{ comp.title }}</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        <code class="text-[10px] uppercase tracking-wider font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded mb-3 inline-block group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">{{ comp.name }}</code>
                        
                        <p class="text-gray-500 text-xs leading-relaxed line-clamp-2 group-hover:text-gray-600">
                            {{ comp.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ComponentItem {
    title: string;
    name: string;
    path: string;
    desc: string;
}

interface ComponentGroup {
    title: string;
    items: ComponentItem[];
}

const componentGroups: ComponentGroup[] = [
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
        title: 'Data Entry (数据录入)',
        items: [
            { title: 'Dedsi Input', name: 'DedsiInputDemo', path: '/components/dedsi-input', desc: '文本输入框，用于接收用户的文本输入' },
            { title: 'Dedsi Select', name: 'DedsiSelectDemo', path: '/components/dedsi-select', desc: '下拉选择器，提供一组选项供用户选择' },
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
             { title: 'Dedsi Badge', name: 'DedsiBadgeDemo', path: '/components/dedsi-badge', desc: '徽标数，出现在按钮、图标旁的数字或状态标记' },
             { title: 'Dedsi Avatar', name: 'DedsiAvatarDemo', path: '/components/dedsi-avatar', desc: '头像，用来代表用户或事物' },
             { title: 'Dedsi Statistic', name: 'DedsiStatisticDemo', path: '/components/dedsi-statistic', desc: '统计数值，用于展示统计数据' },
             { title: 'Dedsi Countdown', name: 'DedsiCountdownDemo', path: '/components/dedsi-countdown', desc: '倒计时，用于显示倒计时数值' },
             { title: 'Dedsi Marquee', name: 'DedsiMarqueeDemo', path: '/components/dedsi-marquee', desc: '跑马灯，用于滚动显示文本' },
             { title: 'Dedsi Empty', name: 'DedsiEmptyDemo', path: '/components/dedsi-empty', desc: '空状态，当数据为空时显示' },
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

const totalComponents = computed(() => {
    return componentGroups.reduce((acc, group) => acc + group.items.length, 0);
});
</script>
