import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import componentsRoutes from './components'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/components/overview',
        children: [
            componentsRoutes
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router