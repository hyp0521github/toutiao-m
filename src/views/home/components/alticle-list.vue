<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
    success-duration="1500">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      >
        <!-- 必须要在外面循环，不然会一直触发load事件 -->
        <article-list-item
        v-for="article in list"
        :key="article.id"
        :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/user'
import ArticleListItem from '@/components/article-list-item/index.vue'

export default {
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      isLoading: false // 控制下拉刷新，不设置成false圈圈就会一直转
    }
  },
  components: {
    ArticleListItem
  },
  methods: {
    // 页面初始化会触发该事件，页面滚动到底部也会触发该事件
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now()
        })

        // 模拟随机失败情况
        // if (Math.random() > 0.5) {
        // 将其转换为 JavaScript 对象， 如果里面不是JSON字符串格式就会报错
        //   JSON.parse('fjdkfjdak')
        // }

        const { results } = data.data
        // 滚动到页面底部时都会重新请求新的10条数据，没有数据了就代表数据全部加载完毕
        this.list.push(...results)

        // 加载状态结束
        this.loading = false
        // 判断数据是否全部加载完毕
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // 请求失败展示错误信息
        this.error = true
        // 请求失败了loading也需要关闭
        this.loading = false
      }
    },
    // 当下拉刷新会触发该事件
    async onRefresh () {
      try {
        // // 模拟随机失败情况
        // if (Math.random() > 0.1) {
        // // 将其转换为 JavaScript 对象， 如果里面不是JSON字符串格式就会报错
        //   JSON.parse('fjdkfjdak')
        // }
        // 1.获取数据
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: Date.now()
        })
        // 2.将数据重新加载
        this.list = data.data.results
        // 3.刷新成功
        this.isLoading = false
        this.$toast('刷新成功')
      } catch (error) {
        // 刷新失败关闭isloading
        this.isLoading = false
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 记住列表滚动位置
// 原理：为什么列表滚动会相互影响，因为是整个body在滚动
// 视口单位vw和vh，何为视口，就是根据你浏览器窗口的大小的单位，不受父元素影响
// ps:在移动端，视口单位相对于布局视口
// 1vw=可视窗口宽度的百分之一，窗口宽度750，则1vw750，则1vh=7.5px
// 1vh=可视窗口宽度的百分之一，窗口高度750，则1vh750，则1vh=7.5px
.article-list{
  overflow-y: auto;
  height: 76vh;
}
</style>
