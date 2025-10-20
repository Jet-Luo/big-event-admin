import request from '@/utils/request'

// 用户注册
// export const userRegisterService = ({ username, password, repassword }) => {
//   return request({
//     method: 'POST',
//     url: '/api/reg',
//     data: {
//       username,
//       password,
//       repassword
//     }
//   })
// }

// 简略写法
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 用户登录
export const userLoginService = ({ username, password }) =>
  request.post('api/login', { username, password })
