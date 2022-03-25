<template>
  <div class="my-interface">
    <div class="header not-login" v-if="!user">
      <div class="login-btn">
        <img class="mobile-img" src="~@/assets/mobile.png">
        <span class="text" @click="loginBtn">点击登录</span>
      </div>
    </div>
    <div class="header logged-in" v-else>
      <div class="business-card">
        <div class="business-card-left">
          <van-image
            round
            :src="userInfo.photo"
            class="avatar"
          />
          <span class="text">{{userInfo.name}}</span>
        </div>
        <div class="business-card-right">
          <van-button
            type="default"
            size="mini"
            class="edit-data"
            :to="{
              name: 'profile'
            }"
          >编辑资料</van-button>
        </div>
      </div>
      <div class="interaction">
        <div class="items">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="items" @click="$router.push({name: 'focus', query: {activeName: 'follow'}})">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="items" @click="$router.push({name: 'focus', query: {activeName: 'fans'}})">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="items">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="my-article">
      <van-grid :column-num="2" class="grid-nav" clickable>
        <van-grid-item class="grid-item" @click="$router.push({name: 'myArticle', query: {activeName: 'collections'}})">
          <i class="toutiao toutiao-shoucang"></i>
          <span class="text" >收 藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item" @click="$router.push({name: 'myArticle', query: {activeName: 'history'}})">
          <i class="toutiao toutiao-lishi"></i>
          <span class="text">历 史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="小智同学" is-link style="margin-top: 5px"/>
    <van-cell title="消息通知" is-link style="margin-bottom: 5px"/>
    <van-cell value="退出登录" v-if="user" @click="notloginBtn"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'

export default {
  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户信息失败')
      }
    },
    loginBtn () {
      this.$router.push({
        name: 'login'
      })
    },
    notloginBtn () {
      this.$dialog.confirm({
        title: '退出登录？'
      }).then(() => {
        // null表示无效，相当于清除token
        this.$store.commit('setUser', null)
        // remove('user_TOKEN')
        // // 页面自动刷新
        // location.reload()
      }).catch(() => {
      })
    }
  },
  computed: {
    // 拿到vuex中user的值
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.my-interface {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    // 填充图片
    background-size: cover;
  }

  // 先让not-login里面的盒子在not-login里面水平垂直居中，再让
  // login-btn里面的的盒子在login-btn里面垂直居中
  .not-login {
    // 水平垂直居中
    display: flex;
    // 水平居中
    justify-content: center;
    // 垂直居中
    align-items: center;
    .login-btn {
      display: flex;
      // 垂直排列
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 131px;
        height: 131px;
        margin-bottom: 18px;
      }
      .text {
        font-size: 28px;
        color: white;
      }
    }
  }

  .logged-in {
    .business-card {
      display: flex;
      // 俩端对齐
      justify-content: space-between;
      height: 231px;
      padding: 75px 0 24px 32px;
      box-sizing: border-box;
      .business-card-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 1px solid white
        }
        .text {
          color: white;
          font-size: 28px;
          padding-left: 26px;
        }
      }
      .business-card-right {
        padding: 20px 32px 0 0;
        .edit-data {
          border-radius: 20px;
        }
      }
    }

    .interaction {
      height: 131px;
      display: flex;
      .items {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
}

.grid-nav {
  .grid-item {
    height: 145px;
    span.text {
      font-size: 23px;
      padding-top: 10px;
    }
    i.toutiao {
      font-size: 46px;
    }
    i.toutiao-shoucang {
      color: #eb5253;
    }
    i.toutiao-lishi {
      color: #ff9d1d;
    }
  }
}

.van-cell__value--alone {
  text-align: center;
  span {
    color: red;
  }
}
</style>
