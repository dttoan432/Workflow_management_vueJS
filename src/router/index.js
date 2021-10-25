import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../layouts/Admin'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: 'user',
                component: () => import('../views/Manage/User'),
            },
            {
                path: 'workflow',
                component: () => import('../views/Manage/Workflow'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../layouts/Login')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
