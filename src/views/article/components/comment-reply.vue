<template>
  <div class="reply-comment-page">
    <van-nav-bar :title="`${obj.reply_count}条回复`"/>
    <!-- 当前评论项 -->
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
      </div>
    </div>
    <!-- 当前评论项 end-->
    <!-- 评论区内容 end-->
    <p>全部评论</p>
    <CommentArea :type="'c'" :source="obj.com_id" :setCommentAresText="replyText"/>
    <van-divider dashed>已展示所有评论</van-divider>
    <!-- 发布框 -->
    <div class="bottom-comment-box">
      <van-tabbar>
        <van-search
          shape="round"
          placeholder="写评论"
          @click="showPopup"
        />
        <van-popup v-model="isShowReply" position="bottom" :style="{ height: '20%' }">
          <PostComment :target="obj.com_id" :art_id="art_id" @post-comment="postFn"/>
        </van-popup>
      </van-tabbar>
    </div>
    <!-- 发布框 按钮-->
  </div>
</template>

<script>
import CommentDz from '@/components/commentDz/index.vue'
import PostComment from './comment-post.vue'
import CommentArea from './comment-list.vue'

export default {
  components: {
    CommentDz,
    PostComment,
    CommentArea
  },
  data () {
    return {
      isShowReply: false,
      // 评论回复的回复
      replyText: []
    }
  },
  inject: {
    articleId: {
      type: String,
      default: null
    }
  },
  props: {
    obj: {
      type: Object,
      required: true
    },
    art_id: {
      type: String,
      required: true
    }
  },
  methods: {
    // 发布框弹出层
    showPopup () {
      this.isShowReply = true
    },
    // 发布按钮
    postFn (data) {
      // 关闭弹出层
      this.isShowReply = false
      // 更新回复数量 因为传过来的是对象或数组，可以直接修改里面的值，父组件
      // 的值也会发生改变
      this.obj.reply_count++
      // 更新最新的回复消息
      this.replyText.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.reply-comment-page {
  p {
    padding-left: 30px;
    font-size: 30px;
  }
  .comment-area-content {
    padding: 30px 0 0 40px;
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
          padding-left: 0;
        }
        // vertical只对于行内块有效
        .name{
          padding-bottom: 30px;
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
        right: 30px;
        span {
          font-size: 33px;
        }
      }
    }
    .comment-area-content-bottom {
      width: 380px;
      display: flex;
      justify-content: space-between;
      padding: 40px 0 0 145px;
      .timer {
        font-size: 30px;
        color: #222222;
        font-weight: 600;
      }
    }
    .van-divider {
      margin-top: 0;
    }
  }
  .van-search {
    padding: 12px 154px;
  }
}
.article-content-comment-area {
  padding: 20px 30px 0 40px;
}
</style>
