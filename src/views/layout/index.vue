<template>
  <div class="layoutIndex">
    <div class="main">
      <!-- 子路由出口 -->
      <router-view />
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home">
        <span>首页</span>
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/problem">
        <span>问答</span>
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/video">
        <span>视频</span>
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/my">
        <span>{{$store.state.user ? '我的' : '未登录'}}</span>
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex'
}
</script>

<style lang="less" scoped>
.toutiao {
  font-size: 35px;
}
</style>
