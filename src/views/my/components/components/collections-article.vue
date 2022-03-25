<template>
  <div class="collections-article-page">
    <div class="collections-article-item" v-for="(obj, index) in collectionsArticleData" :key="index">
      <ArticleListItem :article="obj"/>
      <van-grid direction="horizontal" :column-num="3" clickable>
        <van-grid-item text="评论">
          <i slot="icon" class="toutiao toutiao-pinglun"></i>
        </van-grid-item>
        <van-grid-item text="点赞">
          <i slot="icon" class="toutiao toutiao-dianzan"></i>
          <i slot="icon" class="toutiao toutiao-dianzan_kuai"></i>
        </van-grid-item>
        <van-grid-item text="收藏">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <i slot="icon" class="toutiao toutiao-shoucang1"></i>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import ArticleListItem from '@/components/article-list-item/index.vue'
import { getCollectionsArticle } from '@/api/user.js'
export default {
  data () {
    return {
      collectionsArticleData: []
    }
  },
  components: {
    ArticleListItem
  },
  created () {
    this.loadCollectionsArticle()
  },
  methods: {
    async loadCollectionsArticle () {
      const { data } = await getCollectionsArticle({
        page: 1,
        per_page: 10
      })
      this.collectionsArticleData = data.data.results
    }
  }
}
</script>

<style lang="less" scoped>
.collections-article-page {
  /deep/.collections-article-item {
    padding-top: 10px;
    .cover-bottom-text {
      span {
        padding-right: 10px;
      }
    }

    .van-cell__label {
      margin-top: 30px;
    }

    .toutiao {
      font-size: 40px;
    }

    .van-grid-item__content {
      padding: 20px 20px
    }

    // 图标和字体之间的间隔
    .van-grid-item__text {
      font-size: 30px;
      padding-left: 15px;
      padding-top: 6px;
    }
  }
}
</style>
