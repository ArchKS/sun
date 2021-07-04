import Vue from 'vue'
import VueRouter from 'vue-router'
import api from '@/api/index.js'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'page',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/*webpackChunkName: "page" */ '@/views/index.vue')
    },
    {
        path: '/article',
        name: 'article',
        component: () => import( /* webpackChunkName: "article" */ '@/components/article/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "article" */ '@/views/login.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import( /* webpackChunkName: "article" */ '@/views/admin.vue')
    },

]



const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if (to.path === '/admin' && from.path !== '/login') {
        let cookiePool = document.cookie.split(';');
        let key = "isVisit" + "=";
        let flag = false;
        let cookies = '';
        for (let item of cookiePool) {
            if (item.indexOf(key) === 0) {
                flag = true;
                cookies = item.slice(key.length);
                break;
            }
        }
        // api.verify(cookies).then(res => {
        //     if (res.data == 200) {
        //         flag = true;
        //     } else {
        //         flag = false;
        //     }
        //     if (!flag) {
        //         next('/login');
        //     } else {
        //         next();
        //     }

        // }).catch(err => {
        //     alert("request ERROR!")
        // });

        if (!flag) {
            next('/login');
        } else {
            next();
        }

    } else {
        next();
    }
})




export default router