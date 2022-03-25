<template>
  <div class="item-article">
    <van-cell-group>
      <van-cell
      :to="{
        name: 'details',
        params: {
          // 路由路径中设计的动态参数名
          articleId: article.art_id
        }
      }">
        <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
        <div slot="label">
          <div v-if="article.cover.type === 3" class="cover-top">
            <div class="cover-top-item" v-for="(img, idx) in article.cover.images" :key="idx">
              <van-image
                class="cover-top-item-img"
                :src="img"
                fit="cover"
              />
            </div>
          </div>
          <div class="cover-bottom-text" v-if="article.cover.type === 3 || article.cover.type === 0">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}评论</span>
            <span>{{article.pubdate | RelativeTime}}</span>
          </div>
          <!-- &&：2个条件都满足 ||：只需满足其中一个条件 -->
          <div class="cover-bottom-text" v-if="article.cover.type === 1 && article.title.length > 13">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}评论</span>
            <span>{{article.pubdate | RelativeTime}}</span>
          </div>
          <div class="cover-bottom-text-1" v-if="article.cover.type === 1 && article.title.length <= 13">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}评论</span>
            <span>{{article.pubdate | RelativeTime}}</span>
          </div>
        </div>
        <div slot="default" v-if="article.cover.type === 1">
          <van-image
            :src="article.cover.images[0]"
            fit="cover"
            class="cover-right"
          />
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.item-article {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .cover-img {
    width: 232px;
    height: 146px;
  }
  .van-cell__value {
    // 清除flex:1的布局
    flex: unset;
    // 设置右侧内容的宽高
    width: 232px;
    height: 146px;
    padding-left: 30px;
  }
  .cover-top {
    // 三张图片在同一行
    display: flex;
    padding: 30px 0;
    .cover-top-item {
      // 三张图片平均分布
      flex: 1;
      // 给他们一个高度
      height: 146px;
      // 选取除了最后一个的元素
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-top-item-img {
        width: 232px;
        height: 146px;
      }
    }
  }

  .cover-bottom-text-1 {
    color: red;
    padding-top: 50px;
  }
}
</style>
