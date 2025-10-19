<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isRegister = ref(true)

// 整个用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 表单校验规则对象
// 1. 非空校验 required: true
// 2. 提示信息 message: '请输入用户名'
// 3. 触发时机 trigger: 'change'（内容变化时触发校验）/ 'blur'（失去焦点时触发校验）
// 4. 长度校验 min: 5, max: 10
// 5. 正则校验 pattern: /^[a-zA-Z0-9_]+$/：只能包含字母、数字和下划线； /^\S{6,15}$/：6-15位的非空字符
// 6. 自定义校验 validator: (rule, value, callback) => {}
//    - rule：当前校验规则的对象
//    - value：当前输入框的值
//    - callback：回调函数，必须调用，校验通过时调用 callback()，校验失败时调用 callback(new Error('错误信息'))
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 5, max: 10, message: '用户名长度在5-10个字符之间', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含字母、数字和下划线',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/, message: '密码是6-15位的非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/, message: '密码是6-15位的非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 判断value和formModel.password是否相等
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback() // 校验成功，也要调用callback
        }
      },
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <!-- 1. 结构相关
       el-row表示一行，一行分成24份
       el-col表示列
       - :span="12" 代表在一行中，占12份（50%）
       - :offset="3" 代表在一行中，左侧margin占3份（12.5%）
       这样，左侧占12份，中间占3份，右侧占3份，剩下的6份给中间的表单

       el-form 整个表单组件
       el-form-item 表单中的每一项
       el-input 输入框组件

       2. 校验相关
       el-form :model="formModel" 绑定整个表单数据对象
       el-form :rules="rules" 绑定整个表单校验规则对象
       el-form-item :prop="username" 配置生效的是rules中对应的username字段的校验规则
       el-input v-model="formModel.username" 绑定当前输入框对应的数据字段
  -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space> 注册 </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录 -->
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
