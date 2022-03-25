<template>
  <van-icon
    :name="is_collected ? 'star' : 'star-o'"
    :class="{collectStyle: is_collected}"
    @click="collectionsBtn"
    size="23"
  />
</template>

<script>
import { collectionsArticle, cancelCollectionsArticle } from '@/api/user.js'

export default {
  model: {
    prop: 'is_collected',
    event: 'update-collect-view'
  },
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    art_id: {
      type: String,
      required: true
    }
  },
  methods: {
    // 收藏按钮
    async collectionsBtn () {
      try {
        if (this.is_collected) {
          // 已收藏, 取消收藏
          await cancelCollectionsArticle(this.art_id)
        } else {
          // 未收藏, 点击收藏
          await collectionsArticle(this.art_id)
        }
        // 更新视图变化
        // 更新视图变化不会立马生效：自定义事件不是立即的，会比下面慢一步
        this.$emit('update-collect-view', !this.is_collected)
        // 所以下面的判断数据应该是更新之后的
        this.$toast.success(!this.is_collected ? '已收藏' : '取消收藏')
      } catch (error) {
        let message = '操作失败，请重新操作'

        if (error.response && error.response.status === 400) {
          message = '你不能收藏自己的文章'
        }

        this.$toast(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collectStyle {
  color: yellow
}
</style>
