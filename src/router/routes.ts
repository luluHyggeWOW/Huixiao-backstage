

export const constantRoute = [
  // 路由模式设置
  {
    path: '/home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页',
      hidden: false,
      icon: 'Home'
    }
  },
  {
    path: '/404',
    component: () => import('@/pages/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'Sugar'
    }
  },
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: '404',
      hidden: true,
      icon: 'Home'
    }
  },
]

export const asnycRoute = [
  {
    path: '/shop',
    component: () => import('@/pages/shop/index.vue')
    ,
    meta: {
      title: '市场管理',
      hidden: false,
      icon: 'ShoppingCart'
    }
  },
  {
    path: '/news',
    component: () => import('@/pages/news/index.vue'),
    meta: {
      title: '新闻管理',
      hidden: false,
      icon: 'Document'
    }
  },
  {
    path: '/user',
    component: () => import('@/pages/user/index.vue'),
    meta: {
      title: '用户管理',
      hidden: false,
      icon: 'User'
    }
  },
  {
    path: '/fankui',
    component: () => import('@/pages/fankui/index.vue'),
    meta: {
      title: '反馈管理',
      hidden: false,
      icon: 'Wallet'
    }
  },
  {
    path: '/forum',
    component: () => import('@/pages/forum/index.vue'),
    meta: {
      title: '论坛管理',
      hidden: false,
      icon: 'Message'
    }
  }
]

export const anyRoute = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'ToiletPaper'
    }
  }

]