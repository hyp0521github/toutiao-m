<template>
  <div class="follow-page">
    <!-- <div class="notFollowings" v-if="userfansInfo.length === 0">
      <span>还没有粉丝，赶快去枪一个吧!</span>
    </div> -->
    <van-cell-group>
      <van-cell center :title="11" :label="11">
        <van-image
          width="55"
          height="55"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          slot="icon"
          fit="cover"
        />
        <van-button
          type="danger"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          :class="{followStyle: !flag}"
          @click="flag = !flag"
        >
          {{flag ? '互相关注' : '关注'}}
        </van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// import { getUserFollowings } from '@/api/user.js'

export default {
  data () {
    return {
      // 粉丝用户信息
      // userfansInfo: []
      flag: false
    }
  }
  // created () {
  //   this.loadUserFollowings()
  // },
  // methods: {
  //   async loadUserFollowings () {
  //     try {
  //       const { data } = await getUserFollowings({
  //         page: 1,
  //         per_page: 10
  //       })
  //       this.userFollowingInfo = data.data.results
  //     } catch (error) {
  //       this.$toast('获取信息失败')
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
.follow-page {
  .notFollowings {
    height: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a5a5a5;
    font-size: 40px;
  }
  /deep/.van-image {
    padding-right: 25px;
    img {
      border-radius: 60px;
    }
  }
  /deep/.van-button {
    width: 130px;
    height: 66px;
    color: black !important;
    background: #fff !important;
    border: 1px solid #e8e8e8 !important;
    border-radius: 10px;
    line-height: 66px;
    word-break:keep-all;
    white-space:nowrap;
  }
  .followStyle {
    background: red !important;
    color: #fff !important;
  }
}
</style>
