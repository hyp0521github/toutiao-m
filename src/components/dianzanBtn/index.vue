<template>
  <van-icon
    :name="attitude === 1 ? 'like' : 'like-o'"
    size="23"
    @click="dianzanBtn"
  />
</template>

<script>
import { likingsArticle, cancelLikingsArticle } from '@/api/user.js'

export default {
  model: {
    prop: 'attitude',
    event: 'update-dianzan-view'
  },
  props: {
    attitude: {
      type: [Number, Boolean],
      required: true
    },
    art_id: {
      type: String,
      required: true
    }
  },
  methods: {
    async dianzanBtn () {
      try {
        let status = -1
        if (this.attitude === 1) {
          // 已点赞，取消点赞
          await cancelLikingsArticle(this.art_id)
        } else {
          // 未点赞，点赞一下
          status = 1
          likingsArticle(this.art_id)
        }
        // 更新视图变化
        this.$emit('update-dianzan-view', status)

        this.$toast.success(this.attitude === -1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast('操作失误，请重新')
      }
    }
  }
}
</script>

<style>

</style>
