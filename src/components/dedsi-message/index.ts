import { render, h, type App } from 'vue'
import DedsiMessageComponent from './DedsiMessage.vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export interface MessageOptions {
    content: string
    type?: MessageType
    duration?: number
    onClose?: () => void
}

let container: HTMLElement | null = null

/**
 * 创建容器
 */
function createContainer() {
    if (container) return container
    container = document.createElement('div')
    container.className = 'dedsi-message-container'
    container.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 100%;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
    document.body.appendChild(container)
    return container
}

/**
 * 显示消息
 */
function show(options: MessageOptions | string, type: MessageType = 'info') {
    const container = createContainer()

    const userOptions = typeof options === 'string' ? { content: options } : options
    const props = {
        ...userOptions,
        type: userOptions.type || type,
        onClose: () => {
            if (userOptions.onClose) userOptions.onClose()
            // 延迟移除 DOM，给予动画时间
            setTimeout(() => {
                render(null, div)
                container.removeChild(div)
            }, 500)
        }
    }

    const div = document.createElement('div')
    container.appendChild(div)

    const vnode = h(DedsiMessageComponent, props)
    render(vnode, div)

    return {
        close: () => {
            const component = vnode.component as any
            if (component && component.exposed) {
                component.exposed.close()
            }
        }
    }
}

const DedsiMessage = {
    info: (options: MessageOptions | string) => show(options, 'info'),
    success: (options: MessageOptions | string) => show(options, 'success'),
    warning: (options: MessageOptions | string) => show(options, 'warning'),
    error: (options: MessageOptions | string) => show(options, 'error'),
    loading: (options: MessageOptions | string) => show(options, 'loading'),
}

// 供全局安装
export { DedsiMessage }

export default {
    install(app: App) {
        app.config.globalProperties.$message = DedsiMessage
    }
}
