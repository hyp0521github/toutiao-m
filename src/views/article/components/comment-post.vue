<template>
  <div class="tetxarea">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论会被优先显示"
      show-word-limit
    />
    <van-button type="default" @click="postBtn" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { releaseArticle } from '@/api/user.js'
export default {
  props: {
    target: {
      type: String,
      required: true
    },
    art_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async postBtn () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        const { data } = await releaseArticle({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message,
          art_id: this.art_id // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
        })

        this.message = ''
        this.$emit('post-comment', data.data)
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast('发布失败，请重新操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 评论弹出框样式
.tetxarea {
  margin: 32px 30px;
  width: 560px;
  height: 200px;
  background-color: #ebf0f5;
  .van-cell {
    background-color: #ebf0f5;
  }
  .van-button {
    top: -114px;
    right: -563px;
    border: 0;
  }
}

</style>
