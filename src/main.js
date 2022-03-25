import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入css
import './style/index.less'

// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入amfe-flexible
import 'amfe-flexible'

// 引入封装的axios
import './utils/request.js'

// 引入处理时间的库 dayjs
import '@/utils/dayjs.js'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
