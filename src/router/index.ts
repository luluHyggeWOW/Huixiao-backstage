import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  // 路由模式设置
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        title: '首页',
      }
    },
    {
      path: '/shop',
      component: () => import('@/pages/shop/index.vue')
      ,
      meta: {
        title: '市场管理',
      }
    },
    {
      path: '/news',
      component: () => import('@/pages/news/index.vue'),
      meta: {
        title: '新闻管理',
      }
    },
    {
      path: '/user',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '用户管理',
      }
    },
    {
      path: '/fankui',
      component: () => import('@/pages/fankui/index.vue'),
      meta: {
        title: '反馈管理',
      }
    },
    {
      path: '/forum',
      component: () => import('@/pages/forum/index.vue'),
      meta: {
        title: '论坛管理',
      }
    },
    {
      path: '/',
      redirect: '/home'
    },

  ],
  // 滚动行为 控制滚动条位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})