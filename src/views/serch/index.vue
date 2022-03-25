<template>
  <div class="search-page">
    <!-- 搜索头部 -->
    <div class="search-header">
      <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
      <form action="/">
        <van-search v-model="searchText"
          placeholder="请输入搜索关键词"
          background="#3296fa"
          show-action
          autofocus
          @search="onSearch"
          @cancel="onCancel"
          @input="onInput"
          @focus="onFocus"
      />
      </form>
    </div>
    <!-- 搜索头部end -->
    <div class="search-content">
      <!-- v-if v-else-if v-else 如果v-if为true,下面的俩个就不走了
      如果v-if为false,继续走下面一个,v-else-if成立,v-else就不走了
      以此类推 -->
      <!-- 搜索结果 -->
      <div class="search-page-details" v-if="showResults">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <SearchDetails v-for="obj in results" :key="obj.id" :results="obj"></SearchDetails>
        </van-list>
      </div>
      <!-- 搜索结果 end-->
      <!-- 搜索联想建议 -->
      <div class="search-suggest" v-else-if="searchText">
        <van-cell-group>
          <van-cell
            v-for="(obj, idx) in suggest"
            :key="idx"
            icon="search"
            @click="onClick(idx)"
          >
            <div slot="title" v-html="highlright(obj)"></div>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 搜索联想建议  end -->
      <!-- 搜索记录 -->
      <div class="search-records" v-else>
        <van-cell-group>
          <van-cell title="历史记录">
            <i slot="default" class="toutiao toutiao-shanchu" @click="delRecords"></i>
          </van-cell>
          <van-cell
            :title="obj"
            v-for="(obj, idx) in records"
            :key="idx" @click="onClickRecords(obj)"
          ></van-cell>
        </van-cell-group>
      </div>
      <!-- 搜索记录 end -->
    </div>
  </div>
</template>

<script>
import { getSearchResults, getSearchSuggestion } from '@/api/user.js'
import SearchDetails from './components/search-details.vue'
import { setItem, getItem, remove } from '@/utils/stroge.js'
import { debounce } from 'lodash'

export default {
  // props 数据
  // 1.如果数据是普通类型 eg: number,String,boolean 绝对不能修改，即使修改了
  // 父组件数据也不会发生变化
  // 2.如果数据是引用类型 eg: Array, Object 可以修改里面的数据，但是不能重新赋值，
  // 修改了里面的数据，父组件的数据也会更新
  data () {
    return {
      searchText: '',
      // 搜索结果
      results: [],
      // 搜索记录
      records: getItem('RECORDS'),
      // 搜索联想建议
      suggest: [],
      // 控制搜索结果隐显
      showResults: false,
      // 控制数据更新完毕
      loading: false,
      // 控制数据全部加载完毕
      finished: false,
      // 控制页数
      page: 1,
      error: false
    }
  },
  components: {
    SearchDetails
  },
  watch: {
    records: {
      handler (val) {
        setItem('RECORDS', val)
      }
    }
  },
  methods: {
    // 点击键盘上的搜索或回车按钮触发
    onSearch () {
      if (this.searchText.trim() === '') {
        this.$toast('不输入内容，搜索个屁')
      }

      // 每次重新搜索要把页面归为1
      this.page = 1

      // indexof findIndex 找出符合条件的第一个元素，并返回他的索引值，可以用一个参数来接收，找不到返回-1
      // find 找出符合条件的第一个元素 并返回他的值 可以用一个参数来接收，找不到返回undefined
      // filter 找出符合条件的所有元素 并返回一个新数组来接收符合条件的值，找不到则返回空数组

      // 将输入框的文字添加进搜索记录
      const index = this.records.findIndex(item => {
        return item === this.searchText
      })
      if (index !== -1) {
        this.records.splice(index, 1)
      }
      this.records.unshift(this.searchText)
      // 数组去重
      // this.records = [...new Set([...this.records])]
      // 显示搜索结果
      this.showResults = true
    },
    // 输入框内容发生改变时
    onInput: debounce(function () {
      // 判断当输入框的值不为空时
      if (this.searchText) {
        this.page = 1
        this.getSuggestion()
      }
    }, 80),
    // 取消按钮
    onCancel () {
      // 从哪里来回哪里去
      this.$router.back()
    },
    // 删除历史记录
    delRecords () {
      remove('RECORDS')
      this.records = []
    },
    // 输入框获得焦点时
    onFocus () {
      // 隐藏搜索结果，搜索联想建议就会显示出来
      this.showResults = false
      // 有数据在获取
      if (this.searchText.trim() !== '') {
        // 再次获取联想建议
        this.getSuggestion()
      }
      // 扩展运算符
      // const arr = [1, 2, 3]
      // function set (a, b, c) {
      //   console.log(a)
      //   console.log(b)
      //   console.log(c)
      // }
      // set(...arr)
      // rest运算符 把逗号隔开的值序列组合成一个数组
      // function fn (a, ...b) {
      //   console.log(a) // 1
      //   console.log(b) // [2, 3, 4]
      // }
      // fn(1, 2, 3, 4)
      // const str = 'hello, world!'
      // // console.log(str.startsWith('ell', 0)) // 找以str字符串开头的参数
      // console.log(str.includes('ell', 0))
      // for (let i = 0; i < 10; i++) {
      //   console.log(i)
      // }
      // // 循环遍历字符串
      // const str = 'string'
      // let b
      // for (b of str) {
      //   console.log(b)
      // }
      // const re = Symbol('111')
      // const rs = Symbol('111')
      // console.log(re === rs)

      // const imgs = new Set()
      // imgs.add(1)
      // imgs.add(2)
      // imgs.add(1)
      // console.log(imgs)
      // const arr = [1, 1, 2, 2]
      // console.log(new Set(arr)) // {1, 2}
      // console.log(...new Set(arr)) // 1, 2
      // // 数组去重
      // const newArr = [...new Set(arr)]// [1, 2]
      // console.log(newArr)
      // const imgs = new Set(1) // 里面必须是数组
      // console.log(imgs)
      // const arr = ['1', '2', 3, 4]
      // const newArr = new Set(arr)
      // for (const item of newArr.entries()) {
      //   console.log(item)
      // Map集合,即映射
      // const map = new Map()
      // map.set('s11', '小黄')
      // map.set('s22', '小阿')
      // map.set('s33', '小李')
      // console.log(map)
      // console.log(map.get('s11')) // 小黄
      // for (const item of map) {
      //   console.log(item) // 3个数组
      // }
      // for (const [key, value] of map) {
      //   console.log(key, value)
      // }
    },
    // 点击搜索联想建议进入搜索结果页面
    onClick (index) {
      // 显示搜索结果
      this.showResults = true
      // 每次重新点击标题时要把页面归为1
      this.page = 1
      // 将点击的联想建议赋值给输入框，再发起请求
      this.searchText = this.suggest[index]
      // 将点击的联想建议赋值给搜索记录
      this.records.unshift(this.suggest[index])
      this.records = [...new Set([...this.records])]
    },
    // 加载更多
    async onLoad () {
      try {
        console.log(1)
        // if (Math.random() > 0.5) {
        //   JSON.parse('djcfa')
        // }
        // 发起请求获取数据
        const { data } = await getSearchResults(this.searchText, this.page)
        // 把第二页数据加入到第一页数据里面
        this.results.push(...data.data.results)
        // 加载完成
        this.loading = false
        // console.log(data.data.results.length)
        // 判断是否加载完毕
        if (data.data.results.length) {
          // 未加载完毕，继续加载
          this.page++
        } else {
          // 加载完毕
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    // 获取搜索联想建议方法
    async getSuggestion () {
      try {
        const { data } = await getSearchSuggestion(this.searchText)
        if (data.data.options[0] === null || data.data.options.length === 0) {
          this.suggest = [this.searchText]
        } else {
          this.suggest = data.data.options
        }
      } catch (error) {
        this.$toast('获取失败')
      }
    },
    // 点击搜索记录进入页面
    onClickRecords (obj) {
      // 显示搜索结果
      this.showResults = true
      // 每次重新点击标题时要把页面归为1
      this.page = 1
      // 将点击的搜索记录赋值给输入框，再发起请求
      this.searchText = obj
    },
    highlright (text) {
      // 第一种方法
      // 1.正则表达式/ /中间的内容都会当作匹配字符串来使用，而不是数据变量
      // 2.如果需要根据数据变量动态的创建正则表达式，则手动new RegExp
      //   参数一：匹配模式的动态字符串 /aaa/gi
      //   参数二：匹配模式，g表示全局的aaa都要匹配到，i表示忽虐大小写
      // const res = new RegExp(this.searchText, 'gi')
      // 把text里面的searchText替换成有span标签的searchText
      // replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
      // const htmlStr = `<span style="color: red; font-weight: 700">${this.searchText}</span>`
      // return text.replace(res, htmlStr)
      // 第二种方法
      // split 分割字符串形成数组，里面传的参数就是分割的字符 eg：str = 'hello', str.split("h") => ['', 'ello']
      // 里面也可以传正则表达式 如上面
      // join 使用您选择的分隔符将一个数组合并为一个字符串
      // join + split 相当于替换
      // const str = 'hello world'
      // console.log(str.split("l").join("L")) // heLLo world
      return text.split(this.searchText).join(`<span style="color: red; font-weight: 700">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.search-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .van-search {
    .van-search__content {
      border-radius: 7px;
      .van-icon {
        font-size: 40px;
        color: #9a9a9a;
      }
    }
    .van-search__action {
      color: white;
    }
  }
}
.search-content {
  padding-top: 112px;
}
.search-records {
  .toutiao {
    font-size: 30px;
  }
}
</style>
