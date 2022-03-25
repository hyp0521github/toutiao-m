<template>
  <div class="article-details-page">
    <div class="title">
      <van-nav-bar title="文章详情" left-arrow left-text="返回" @click-left="$router.back()"/>
    </div>
    <!-- 文章内容 -->
    <div class="article-content">
      <!-- 文章内容详情部分 -->
      <div class="article-content-details">
        <!-- 加载中 -->
        <van-loading size="24px" vertical color="#1989fa" text-color="red" v-if="loading">加载中...</van-loading>
        <!-- 加载中 end-->

        <!-- 加载成功 -->
        <div class="details-content" v-else-if="articleData.title">
          <!-- 文章内容头部 -->
          <div class="article-content-header">
            <div class="content-header-top">
              <h5>{{articleData.title}}</h5>
            </div>
            <div class="content-header-bottom">
              <div class="left">
                <div class="photo">
                  <van-image
                    round
                    fit="cover"
                    width="1.2rem"
                    height="1.2rem"
                    :src="articleData.aut_photo"
                  />
                </div>
                <div class="text">
                  <p>{{articleData.aut_name}}</p>
                  <p>{{articleData.pubdate | RelativeTime}}</p>
                </div>
              </div>
              <div class="right">
                <!-- 子组件传过来的值可以用$event接收
                组件上使用v-model
                当我们需要传值，并且需要修改传过去的值时，可以使用v-model
                eg:  :is_followed="articleData.is_followed"
                     @update-follow-view="articleData.is_followed = $event"
                这种情况可以使用v-model
                如果需要修改v-model的规则名称，可以使用子组件的model
                一个组件只能使用一次v-model，如果需要使用多次，可以使用.sync修饰符 -->
                <FollowBtn
                  :aut_id="articleData.aut_id"
                  v-model="articleData.is_followed"
                />
              </div>
            </div>
          </div>
          <!-- 文章内容头部 end-->
          <div class="details-title">
            <h4>{{articleData.title}}</h4>
          </div>
          <van-divider />
          <!-- 文章内容 -->
          <div class="details-content markdown-body" ref="content">
            <p v-html="articleData.content"></p>
            <img src="https://img01.yzcdn.cn/vant/apple-1.jpg">
            <img src="https://img01.yzcdn.cn/vant/apple-2.jpg">
            <img src="https://img01.yzcdn.cn/vant/apple-1.jpg">
            <img src="https://img01.yzcdn.cn/vant/apple-2.jpg">
          </div>
          <!-- 文章内容end -->
          <van-divider dashed>正文结束</van-divider>
          <!-- 文章内容底部评论区 -->
          <p style="font-size: 20px;">全部评论</p>
          <ConnentArea
            :source="articleData.art_id"
            :type="'a'"
            :setCommentAresText="list"
            @update-total_count="total_count=$event"
            @show-reply="onShowReply"
          />
          <van-divider dashed>已展示所有评论</van-divider>
          <!-- 文章内容底部评论区 end-->
          <!-- 底部功能 -->
          <div class="article-tabbar">
            <van-tabbar>
              <van-search
                shape="round"
                placeholder="写评论"
                @click="showPopup"
              />
              <van-popup v-model="isShowComment" position="bottom" :style="{ height: '20%' }">
                <PostComment :target="articleData.art_id" @post-comment="post_commentFn"/>
              </van-popup>
              <van-tabbar-item :badge="total_count">
                <van-icon slot="icon" name="comment-o" size="20"/>
              </van-tabbar-item>
              <van-tabbar-item>
                <CollectBtn slot="icon" v-model="articleData.is_collected" :art_id="articleData.art_id"/>
              </van-tabbar-item>
              <van-tabbar-item>
                <DianzanBtn slot="icon" v-model="articleData.attitude" :art_id="articleData.art_id"/>
              </van-tabbar-item>
            </van-tabbar>
          </div>
          <!-- 底部功能 end -->
        </div>
        <!-- 加载成功 end-->

        <!-- 错误信息 404-->
        <van-empty image="error" description="该资源不存在或已被删除" v-else-if="errorStatus === 404"/>
        <!-- 错误信息 404 end-->

        <!-- 网络错误或其他错误 -->
        <van-empty description="内容加载失败" v-else>
          <van-button round type="danger" class="bottom-button" @click="getDetailDowLoad()">点击重试</van-button>
        </van-empty>
        <!-- 网络错误或其他错误 end-->
      </div>
      <!-- 文章内容详情部分 end-->
    </div>
    <!-- 文章内容 end-->
    <!-- 回复的弹出层 -->
    <!-- 弹层是懒渲染的：只有在第一次展示的时候才会渲染里面的内容，之后的关闭和显示都是在简单切换内容的显示和隐藏
    也就是说第一次点击弹层出现，组件被渲染出来，关闭时组件依然还在，里面的数据也不会变，所以每次点击弹层，里面的数据
    都没有重新加载，里面也都是第一次点击的内容 -->
    <!-- 解决方法：我们希望每次弹层打开渲染组件，弹层关闭，组件销毁
    使用v-if -->
    <van-popup
      v-if="isShowReply"
      v-model="isShowReply"
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    >
      <ReplyComment :obj="setReplyText" :art_id="articleData.art_id"/>
    </van-popup>
    <!-- 回复的弹出层 end-->
  </div>
</template>

<script>
import { getNewDetail, getUserInfo } from '@/api/user.js'
import { mapState } from 'vuex'
import { ImagePreview } from 'vant'
import FollowBtn from '@/components/followBtn/index.vue'
import CollectBtn from '@/components/collectBtn/index.vue'
import DianzanBtn from '@/components/dianzanBtn/index.vue'
import ConnentArea from './components/comment-list.vue'
import PostComment from './components/comment-post.vue'
import ReplyComment from './components/comment-reply.vue'

export default {
  // 父组件向所有的后代组件传值
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 文章数据
      articleData: '',
      // 用户信息
      setUserInfor: '',
      // 控制加载状态
      loading: true,
      // 错误状态码
      errorStatus: 0,
      // 评论框
      isShowComment: false,
      // 评论数量
      total_count: 0,
      // 评论区内容
      list: [],
      // 回复按钮弹出层
      isShowReply: false,
      // 存储回复评论内容
      setReplyText: {}
    }
  },
  components: {
    FollowBtn,
    CollectBtn,
    DianzanBtn,
    ConnentArea,
    PostComment,
    ReplyComment
  },
  created () {
    // 获取文章数据详情
    this.getDetailDowLoad()
    // 获取用户信息
    this.getUserDonLoad()
  },
  methods: {
    // 获取文章数据
    async getDetailDowLoad () {
      this.loading = true
      try {
        const { data } = await getNewDetail(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('faujfkjalf')
        // }
        this.articleData = data.data

        // 获取文章评论
        // 注意：这次的请求参数需要用到请求的文章数据里面的参数，不能在created里面再次请求
        // 文章评论，因为这样子获取不到请求的文章数据里面的参数，应该在请求文章数据成功后
        // 在请求获取文章评论

        setTimeout(() => {
          const arr = []
          this.$refs.content.querySelectorAll('img').forEach((item, index) => {
            arr.push(item.src)
            // 给每个img注册点击事件
            item.onclick = () => {
              ImagePreview({
                images: [
                  ...arr
                ],
                // 起始位置
                startPosition: index
              })
            }
          })
        }, 0)
        // 上面数据被更新了，但是视图层还没更新，得等视图层也跟新了才能获取
        // 2.数据驱动视图层不是立即的
        // this.$nextTick(function () {
        //   // 仅在整个视图都被渲染之后才会运行的代码
        // })

        this.$toast('获取文章数据成功')
      } catch (error) {
        // console.log(error.response)
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
          this.$toast('该资源不存在或已被删除')
        }
      }
      // 关闭加载状态
      this.loading = false
    },
    // 获取个人信息
    async getUserDonLoad () {
      try {
        // 有token在发起请求
        if (this.user) {
          const { data } = await getUserInfo()
          this.setUserInfor = data.data
        }
      } catch (error) {
        this.$toast('获取个人信息失败')
      }
    },
    // 评论区弹出层
    showPopup () {
      this.isShowComment = true
    },
    // 发布按钮
    post_commentFn (data) {
      this.isShowComment = false
      this.list.unshift(data.new_obj)
    },
    // 回复按钮弹出层
    onShowReply (comment) {
      // 显示弹出层
      this.isShowReply = true
      // 存储回复评论的内容
      this.setReplyText = comment
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
// 引入css文件
@import './github-markdown.css';
.article-details-page {
  // 头部样式
  /deep/.title {
    // 固定头部
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    .van-nav-bar {
      // 标题背景颜色
      background-color: #3196fd;
      // 左侧返回按钮颜色
      .van-icon, .van-nav-bar__text {
        color: #fff
      }
      // 标题颜色
      .van-nav-bar__title {
        color: #fff
      }
    }
  }
  .van-loading {
    padding-top: 180px;
  }
  // 中间内容样式
  /deep/.article-content {
    overflow-y: auto;
    height: 86vh;
    margin-top: 91px;
    margin-bottom: 100px;
    .article-content-header {
      .content-header-top {
      h5 {
        margin: 0;
      }
    }
      .content-header-bottom {
        padding: 40px 0 0 0;
        // 俩端对齐
        display: flex;
        justify-content: space-between;
        .left {
          // 俩端对齐
          display: flex;
          justify-content: space-between;
          .text {
            padding-left: 20px;
            display: flex;
            // 水平居中
            justify-content: center;
            // 垂直分布
            flex-direction: column;
            font-size: 28px;
            color: #b6a9a9;
            p {
              margin: 0;
            }
          }
        }
        .right {
          .van-loading {
            padding-top: 0;
          }
        }
      }
    }
    // 文章内容详情
    .article-content-details {
      padding: 30px 40px 0 40px;
      .details-title {
        width: fit-content;
        h4 {
          margin: 0;
        }
      }
      .details-content {
        padding-left: 30px;
        p {
          margin: 0;
        }
      }
      .van-divider {
        border-color:#b6bac2
      }
    }
  }
  // 底部内容样式
  /deep/.article-tabbar {
    // 底部上边框
    .van-tabbar {
      border-top: 1px solid #d8d8d8;
    }
    // 隐藏搜索框搜索图标
    .van-search {
      .van-icon {
        display: none;
      }
      // 评论框背景颜色
      .van-search__content {
        background-color: #fff;
      }
      // 评论框border
      .van-search__content--round {
        border: 1px solid #eeeeee;
      }
    }
    .van-tabbar-item {
      // 底部图标距离下边框距离
      margin-bottom: -10px;
      .toutiao {
        font-size: 40px;
        color: #5c5151;
        padding-top: 10px;
      }
      .toutiao-dianzan_kuai {
        color: red
      }
    }
  }
  .bottom-button {
    width: 260px;
    height: 80px;
  }
  .del-follow-btn {
    width: 230px;
    height: 66px;
    line-height: 66px;
    border-radius: 30px;
    background: #fff;
    color: black;
  }
  .add-follow-btn {
    width: 230px;
    height: 66px;
    line-height: 66px;
    border-radius: 30px;
  }
}
</style>
