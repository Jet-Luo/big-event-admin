import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login', // 登录页
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: 'article/manage', // 文章管理
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: 'article/channel', // 频道管理
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: 'user/profile', // 个人中心
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: 'user/avatar', // 头像设置
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: 'user/password', // 密码设置
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 全局前置导航守卫，作用：拦截未登录用户，跳转到登录页
// Vue Router 4 中，默认（undefined）直接放行，是否拦截由返回值决定
// 返回值：
// 1. false：取消当前导航，拦回到from路由
// 2. undefined/true：放行
// 3. 具体路径 '/login' / 路径对象 { name: 'login' }：跳转到对应的路由
router.beforeEach((to) => {
  // 1. 获取用户状态：是否登录（是否有token）
  const userStore = useUserStore()
  const token = userStore.token

  // 2. 判断是否登录
  if (!token && to.path !== '/login') {
    // 未登录，且访问的不是登录页，跳转到登录页
    return '/login'
  }
  // 已登录，或者访问的是登录页，放行
})

export default router
