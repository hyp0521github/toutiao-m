import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/stroge.js'

Vue.use(Vuex)

const TOKEN_KEY = 'user_TOKEN'

export default new Vuex.Store({
  state: {
    // 定义一个空属性来接收token
    user: getItem(TOKEN_KEY)
  },
  // 定义一个mutations函数来修改state的数据
  mutations: {
    setUser (state, data) {
      // 将获取过来的data数据赋值给user
      state.user = data
      // 给data数据进行处理，存储到浏览器中
      // 浏览器中只能存储字符串型的数据，所以要将data对象转化为字符串格式
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
