<template>
  <div class="home-interface">
    <div class="home-header">
      <van-nav-bar class="pag-nav-bar" fixed>
        <van-image
        width="80"
        height="30"
        :src="home_urlImg"
        class="imgPosition"
        slot="left"
        />
        <van-search
        v-model="value"
        placeholder="搜索"
        shape="round"
        input-align="center"
        slot="right"
        @click="clickFn('search')"
        >
          <template #left-icon>
            <i class="toutiao toutiao-sousuo"></i>
          </template>
        </van-search>
      </van-nav-bar>
    </div>
    <div class="navbar">
      <van-tabs v-model="active" animated swipeable>
        <van-tab v-for="obj in userList" :title="obj.name" :key="obj.id">
          <article-list :channels="obj"></article-list>
        </van-tab>
        <!-- 使用占位槽设置滚动未知 -->
        <div slot="nav-right" class="placeholder"></div>
      </van-tabs>
      <!-- 汉堡按钮 -->
      <div class="handler" @click="showPopup">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- 汉堡按钮 end-->
      <!-- 弹出层内容-->
      <van-popup v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left">
        <ChannelsEditing
        :editList="userList"
        :allList="list"
        @channels="channelsFn"
        :active="active"
        ></ChannelsEditing>
      </van-popup>
      <!-- 弹出层内容end-->
    </div>
  </div>
</template>

<script>
import urlImg from '@/assets/logo.png'
import { getChannels, userChannels } from '@/api/user.js'
import ArticleList from './components/alticle-list.vue'
import ChannelsEditing from '@/components/channel-editing/index.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/stroge.js'

export default {
  data () {
    return {
      home_urlImg: urlImg,
      value: '',
      active: 0,
      list: '',
      userList: '',
      show: false
    }
  },
  components: {
    ArticleList,
    ChannelsEditing
  },
  async created () {
    try {
      // 获取所有的频道列表
      const { data } = await getChannels()
      this.list = data.data.channels
      // 获取用户频道
      this.GetUserChannels()
    } catch (error) {
      this.toast('获取失败')
    }
  },
  methods: {
    // 点击进入搜索页面
    clickFn (targetName) {
      this.$router.push({
        name: targetName
      })
    },
    showPopup () {
      this.show = true
    },
    // 点击我的频道切换首页的频道
    // 没传值show就等于true，传值了就用传的值 俩个show要一样
    channelsFn (index, show = true) {
      // 切换频道
      this.active = index
      // 关闭弹出层
      this.show = show
    },
    // 获取用户频道
    async GetUserChannels () {
      // 定义一个空数组用来接收请求来的数据
      let channels = []
      if (this.user) {
        // 已登录 从后台获取数据
        try {
          const { data } = await userChannels()
          channels = data.data.channels
        } catch (error) {
          this.$toast('获取失败')
        }
      } else {
        // 未登录 从存储里面获取数据
        // 判断存储里面有无数据
        if (getItem('SET_MYCHANNELS')) {
          // 有数据就用
          channels = getItem('SET_MYCHANNELS')
        } else {
          // 没有就用默认数据
          const { data } = await userChannels()
          channels = data.data.channels
        }
      }
      this.userList = channels
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-interface {
  padding-bottom: 100px;
}
.imgPosition {
  position: absolute;
  left: 30px;
  top: 10px;
  z-index: 9999;
}
.van-search {
  position: absolute;
  right: 0px;
  top: 7px;
  width: 450px;
  height: 75px;
  background-color: #3899f3;
  z-index: 9999;
  .van-search__content {
    background-color: #5babfb;
  }
  .toutiao {
    position: absolute;
    top: 9px;
    left: 95px;
    color: white;
    font-size: 40px;
  }
}

// deep深度作用子节点的样式
/deep/ .navbar {
  padding-top: 184px;
  .van-tab__pane {
    span {
      padding-right: 20px;
    }
  }
  .placeholder {
    width: 84px;
    height: 82px;
    // 不参与前面几个盒子的计算
    flex-shrink: 0;
  }
  .handler {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 92px;
    left: 664px;
    width: 84px;
    height: 82px;
    background-color: white;
    opacity: 0.902;
    z-index: 1;
    .toutiao {
      font-size: 50px;
    }
    // &找到他的父元素
    &:before {
      content: "";
      position: absolute;
      left: 0px;
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      // 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。
      background-size: contain;
    }
  }
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    // 定位以后要left0，right0才能移得动
    left: 0;
    right: 0;
    height: 82px;
    z-index: 1;
  }
  .van-tabs__nav--line {
    display: flex;
    align-items: center;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    // 标题
    .van-tab {
      display: flex;
      align-items: center;
      width: 200px;
      height: 82px;
      font-size: 33px;
      color: #777777;
      border-right: 1px solid #edeff3;
      text-align: center;
      word-break:keep-all;
      white-space:nowrap;
    }
    // 选中标题
    .van-tab--active {
      color: #333333;
      font-weight: 600;
    }
    // 底部条
    .van-tabs__line {
      width: 31px;
      background-color: blue;
      bottom: 8px;
    }
  }
}

</style>
