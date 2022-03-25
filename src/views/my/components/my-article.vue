<template>
  <div class="my-article-page">
    <div class="my-article-header">
      <van-nav-bar
        title="收藏/历史"
        left-arrow
        @click-left="$router.push({name: 'my'})"
      />
      <van-tabs line-width="60px" v-model="activeName">
        <van-tab title="我的收藏" name="collections">
          <CollectionsArticle />
        </van-tab>
        <van-tab title="我的历史" name="history">
          <HistoryArticle />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import HistoryArticle from './components/history-article.vue'
import CollectionsArticle from './components/collections-article.vue'

export default {
  data () {
    return {
      activeName: this.$route.query.activeName
    }
  },
  components: {
    HistoryArticle,
    CollectionsArticle
  }
}
</script>

<style lang="less" scoped>
.my-article-page {
  /deep/.my-article-header {
    // 固定头部
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    // 标题背景颜色
    .van-nav-bar {
      background-color: #3196fd;
      // 左侧返回按钮颜色
      .van-icon, .van-nav-bar__text {
        color: #fff
      }
      // 标题颜色
      .van-nav-bar__title {
        color: #fff
      }
      // 图标大小
      .van-nav-bar__arrow {
        font-size: 40px;
      }
    }

    .van-tab {
      color: black
    }

    .van-tab--active {
      color: #3296fa
    }

    .van-tabs__line {
      background-color: #3296fa;
    }
  }
}
</style>
