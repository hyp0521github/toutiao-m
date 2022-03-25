<template>
  <div class="comment-area-content">
    <div class="comment-area-content-top">
      <div class="left">
        <van-image
          round
          fit="cover"
          :src="obj.aut_photo"
          class="img"
        />
        <div class="text-name">
          <p class="name">{{obj.aut_name}}</p>
          <p class="text van-multi-ellipsis--l2">
            {{obj.content}}
          </p>
        </div>
      </div>
      <div class="right">
        <CommentDz
          slot="icon"
          v-model="obj.is_liking"
          :com_id="obj.com_id"
          :like_count="obj.like_count"
          @update-count="obj.like_count=$event"
        />
      </div>
    </div>
    <div class="comment-area-content-bottom">
      <div class="timer">
        <span>{{obj.pubdate | RelativeTime}}</span>
      </div>
      <div class="reply">
        <van-button type="primary" class="van-ellipsis" @click="$emit('show-reply', obj)">{{obj.reply_count}}回复</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentDz from '@/components/commentDz/index.vue'
export default {
  data () {
    return {
    }
  },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentDz
  }
}
</script>

<style lang="less" scoped>
.comment-area-content {
  padding-bottom: 80px;
  .comment-area-content-top {
        position: relative;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          justify-content: space-between;
          p {
            margin: 0;
          }
          .img {
            width: 110px;
            height: 96px;
          }
          .text-name {
            padding-left: 30px;
          }
          // vertical只对于行内块有效
          .name{
            padding-bottom: 10px;
            color: #406599;
            font-size: 30px;
            font-weight: 600;
            vertical-align: top;
            letter-spacing: 2px;
          }
          .text {
            width: 606px;
            font-size: 40px;
            // 设置相邻文字之间的间距
            letter-spacing: 2px;
          }
        }
        .right {
          position: absolute;
          top: -10px;
          right: 0;
          span {
            font-size: 33px;
          }
        }
  }
  .comment-area-content-bottom {
        width: 380px;
        display: flex;
        justify-content: space-between;
        padding: 30px 0 0 145px;
        .timer {
          font-size: 30px;
          color: #222222;
          font-weight: 600;
        }
        .reply {
          margin-top: -20px;
          .van-button {
            width: 172px;
            height: 60px;
            color: #222222;
            font-size: 30px;
            background-color: #d7dde2;
            border-radius: 50px;
            line-height: 60px;
            border: 0;
          }
        }
  }
}

</style>
