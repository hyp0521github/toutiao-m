import axios from 'axios'
import store from '@/store/index.js'
// import JSONBigInt from 'json-bigint'

// JSONBigInt可以处理数据中超过js安全整数范围的问题
// const obj = '{"name": 1243243275732856823}'
// console.log(JSON.parse(obj).name)
// 用join方法将数组里面的元素连接
// console.log(JSONBigInt.parse(obj).name.c.join('')) // 1243243275732856823
// console.log(JSONBigInt.parse(obj).name)
// console.log(JSONBigInt.parse(obj).name.toString()) // 1243243275732856823

// const newObj = JSON.parse(obj)
// const newObj1 = JSONBigInt.parse(obj)
// console.log(newObj)
// console.log(JSON.stringify(newObj))

// console.log(newObj1)
// console.log(JSONBigInt.stringify(newObj1))

// 创建axios实例
const request = axios.create({
  // 接口的基本路径
  baseURL: 'http://toutiao.itheima.net'
})

// axios请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  // console.log(user)
  // console.log(store.state.user)
  // 需要判断是否存在user和user.token
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
