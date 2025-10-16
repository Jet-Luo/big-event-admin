<script setup>
// import { useUserStore } from '@/stores/modules/user.js'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>

<template>
  <div>app</div>
  <!-- 测试element-plus -->
  <el-button>test</el-button>
  <!--  测试userStore-->
  <el-button>{{ userStore.token }}</el-button>
  <el-button @click="userStore.setToken('test token')">login</el-button>
  <el-button @click="userStore.removeToken()">logout</el-button>
</template>

<style scoped></style>
