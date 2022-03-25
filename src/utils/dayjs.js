import Vue from 'vue'
// 引入dayjs
import dayjs from 'dayjs'
// 加载语言环境
import 'dayjs/locale/zh-cn'
// 配置需要使用的插件
import RelativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(RelativeTime)
// 改变全局语言环境
dayjs.locale('zh-cn')

// 注册全局过滤器处理时间
// value就是管道运算符前面的传过来的参数
Vue.filter('RelativeTime', value => {
  // 使用插件处理相对时间
  var a = dayjs()
  var b = dayjs(value)
  return a.to(b)
})

// 使用
// console.log(dayjs('Sat Jul 17 2021 00:00:00 GMT+0800 (中国标准时间)').$y)

// var d = new Date(2018, 8, 18)
// var day = dayjs(d)
// console.log(day)
