<template>
  <van-button
    v-if="!is_followed"
      type="primary"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      @click="followedBtn"
      :loading="Loading"
      loading-type="spinner"
      class="add-follow-btn"
    >
    关注
  </van-button>
  <van-button
    v-else
    type="primary"
    @click="followedBtn"
    :loading="Loading"
    loading-type="spinner"
    class="del-follow-btn van-ellipsis"
  >
    {{mutual_follow ? '互相关注' : '已关注'}}
  </van-button>
</template>

<script>
import { focusUser, notFocusUser } from '@/api/user.js'
export default {
  data () {
    return {
      Loading: false
    }
  },
  // model可以修改定制 prop 和 event
  model: {
    prop: 'is_followed',
    event: 'update-follow-view'
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: String,
      required: true
    },
    mutual_follow: {
      type: Boolean
    }
  },
  methods: {
    // 关注按钮
    async followedBtn () {
      this.Loading = true
      let message
      try {
        if (this.is_followed) {
          // 已关注，取消关注用户
          await notFocusUser(this.aut_id)
          message = '取消关注'
        } else {
          // 未关注，关注用户
          await focusUser(this.aut_id)
          message = '关注成功'
        }
        // 更新视图状态
        this.$emit('update-follow-view', !this.is_followed)
        this.$toast(message)
      } catch (error) {
        let message = '操作失败，请重新操作'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.Loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
