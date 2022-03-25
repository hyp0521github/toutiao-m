<template>
  <div class="follow-page">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group v-for="obj in userFollowingInfo" :key="obj.id" >
        <van-cell center :title="obj.name" :label="`粉丝数: ${obj.fans_count}`">
          <van-image
            width="55"
            height="55"
            :src="obj.photo"
            slot="icon"
            fit="cover"
          />
          <FollowBtn
            :mutual_follow="obj.mutual_follow"
            :aut_id="obj.id"
            v-model="is_followed"
          />
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { getUserFollowings } from '@/api/user.js'
import FollowBtn from '@/components/followBtn/index.vue'

export default {
  data () {
    return {
      // 关注的用户信息
      userFollowingInfo: [],
      loading: false,
      finished: false,
      is_followed: true
    }
  },
  components: {
    FollowBtn
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getUserFollowings({
          page: 1,
          per_page: 10
        })
        this.userFollowingInfo = data.data.results

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (data.data.results.length <= 10) {
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follow-page {
  /deep/.van-image {
    padding-right: 25px;
    img {
      border-radius: 60px;
    }
  }
  .add-follow-btn {
    width: 130px;
    height: 66px;
    background-color: red;
    color: white
  }
  .del-follow-btn {
    width: 130px;
    height: 66px;
    background: #fff;
    color: black;
    line-height: 66px;
    border-radius: 10px;
    border: 1px solid #e8e8e8;
  }
}
</style>
