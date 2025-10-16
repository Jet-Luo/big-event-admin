<script setup>
// import { useUserStore } from '@/stores/modules/user.js'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>

<template>
  <!--  路由测试-->
  <el-button @click="$router.push('/login')">go login</el-button>
  <el-button @click="$router.push('/article/manage')">go article manage</el-button>
  <el-button @click="$router.push('/article/channel')">go article channel</el-button>
  <el-button @click="$router.push('/user/profile')">go user profile</el-button>
  <el-button @click="$router.push('/user/avatar')">go user avatar</el-button>
  <el-button @click="$router.push('/user/password')">go user password</el-button>
  <router-view></router-view>
  <hr />
  <hr />
  <hr />

  <div>app</div>
  <!-- 测试element-plus -->
  <el-button>test</el-button>
  <!--  测试userStore-->
  <el-button>{{ userStore.token }}</el-button>
  <el-button @click="userStore.setToken('test token')">login</el-button>
  <el-button @click="userStore.removeToken()">logout</el-button>
</template>

<style scoped></style>
