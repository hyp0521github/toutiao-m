<template>
  <div class="comment-liking">
    <van-icon
      :name="is_liking ? 'like' : 'like-o'"
      size="23"
      @click="dianzanBtn"
    />
    <span>{{like_count}}</span>
  </div>
</template>

<script>
import { likingsComment, cancelLikingsComment } from '@/api/user.js'

export default {
  model: {
    prop: 'is_liking',
    event: 'update-commentDz-view'
  },
  props: {
    is_liking: {
      type: Boolean,
      required: true
    },
    com_id: {
      type: String,
      required: true
    },
    like_count: {
      type: Number,
      required: true
    }
  },
  methods: {
    async dianzanBtn () {
      try {
        let count = this.like_count
        if (this.is_liking) {
          // 已点赞，取消点赞
          count--
          await cancelLikingsComment(this.com_id)
        } else {
          // 未点赞，点赞一下
          count++
          likingsComment(this.com_id)
        }
        // 更新视图变化, 上面是更新后台变化
        this.$emit('update-commentDz-view', !this.is_liking)
        // 更新点赞数量变化
        this.$emit('update-count', count)

        this.$toast.success(!this.is_liking ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast('操作失误，请重新')
      }
    }
  }
}
</script>

<style lang="less" scoped>
span {
  font-size: 40px;
}
</style>
