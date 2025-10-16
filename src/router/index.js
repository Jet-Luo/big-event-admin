import { createRouter, createWebHistory } from 'vue-router'

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

export default router
