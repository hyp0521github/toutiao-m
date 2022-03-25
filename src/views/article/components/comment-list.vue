<template>
  <div class="article-content-comment-area">
    <!-- 只有list在可是范围内，才会检查滚动触发onload事件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      :immediate-check="false"
    >
      <comment-item v-for="(obj, index) in setCommentAresText" :key="index" :obj="obj" @show-reply="$emit('show-reply', $event)"/>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/user.js'
import CommentItem from './comment-item.vue'

export default {
  props: {
    source: {
      type: String,
      required: true
    },
    // 评论区内容
    setCommentAresText: {
      type: Array,
      // 默认值
      default: () => []
    },
    type: {
      type: String,
      validator: (value) => {
        // 传的值必须是a 或 c
        return ['a', 'c'].includes(value)
      },
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      // 获取评论数据的偏移量,值为评论id
      offset: null,
      limit: 10
    }
  },
  components: {
    CommentItem
  },
  created () {
    // onload事件当页面滚动到底部才会触发，在这里调用是要在
    // 页面一加载就调用,total——count数据才能同步更新
    // if (this.type === 'a') {
    this.loading = true
    this.onLoad()
    // }
  },
  methods: {
    async onLoad () {
      try {
        // 获取数据
        const { data } = await getComments({
          source: this.source,
          type: this.type,
          offset: this.offset,
          limit: this.limit
        })

        this.setCommentAresText.push(...data.data.results)
        this.$emit('update-total_count', data.data.total_count)

        // 加载完毕关闭loading
        this.loading = false

        // 判断是否加载完毕
        if (data.data.results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-content-comment-area {
  padding: 20px 30px 0 0;
}
</style>
