<template>
  <div class="foucsList-page">
    <div class="focusList-header">
      <van-tabs v-model="activeName" line-width="23px">
        <span slot="nav-left">
          <van-icon name="arrow-left" @click="$router.back()" color="white"/>
        </span>
        <van-tab title="关注" name="follow">
          <Follow></Follow>
        </van-tab>
        <van-tab title="粉丝" name="fans">
          <Fans></Fans>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Follow from './components/follow.vue'
import Fans from './components/fans.vue'
export default {
  data () {
    return {
      activeName: this.$route.query.activeName
    }
  },
  components: {
    Follow,
    Fans
  }
}
</script>

<style lang="less" scoped>
.foucsList-page {
  /deep/.focusList-header {
    .van-tabs__nav {
      background-color: #3296fa;
      .van-icon {
        top: 18px;
        left: 22px;
      }
      .van-tab {
        left: 180px;
        display: flex;
        flex: none;
        width: 136px;
        color: white
      }
      .van-tabs__line {
        bottom: 42px;
        background-color: #fff;
      }
      .van-tab--active {
        font-size: 30px;
        font-weight: 600;
      }
    }
  }
}
</style>
