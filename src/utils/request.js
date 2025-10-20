import axios from 'axios'
import { useUserStore } from '@/stores'
// 因为使用了插件实现自动导入，所以不需要手动导入 ElMessage 组件
// import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 1. 基础地址，超时时间
  baseURL,
  timeout: 10000 // 10秒
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 3. 处理业务失败
    // 4. 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // 处理业务失败，提示错误，抛出错误
    ElMessage.error(res.data.message || '请求失败')
    return Promise.reject(res.data)
  },
  (err) => {
    // 5. 处理401错误
    // 401错误：权限不足或token过期，拦截到登录页
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 其他错误：提示错误，抛出错误
    ElMessage.error(err.response.data.message || '请求失败')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
