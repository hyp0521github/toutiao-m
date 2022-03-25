import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'layout',
    redirect: '/layout/home',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('../views/my/index.vue')
      },
      {
        path: 'problem',
        name: 'problem',
        component: () => import('../views/problem/index.vue')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('../views/video/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/serch/index.vue')
  },
  {
    // 动态路由 / 后面的:articleId就是再点击跳转要传递的参数，
    // 这个参数要用params传递，用query会警告
    path: '/details/:articleId',
    name: 'details',
    component: () => import('@/views/article/index.vue'),
    // 跳转的时候可以把传递的参数转化为props传过去
    props: true
  },
  {
    path: '/my/focus',
    name: 'focus',
    component: () => import('../views/my/components/focus-list.vue')
  },
  {
    path: '/my-article',
    name: 'myArticle',
    component: () => import('../views/my/components/my-article.vue')
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('../views/my/components/user-profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
