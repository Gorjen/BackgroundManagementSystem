import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: "Main",
        redirect: "/home", // 首页重定向
        component: () => import('../views/Main.vue'),
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/home')
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../views/user')
            // },
            // {
            //     path: "/mall",
            //     name: "mall",
            //     component: () => import('../views/mall')
            // },
            // {
            //     path: "/page1",
            //     name: "page1",
            //     component: () => import('../views/pageone')
            // },
            // {
            //     path: "/page2",
            //     name: "page2",
            //     component: () => import('../views/pagetwo')
            // }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../views/login/LogIn.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router