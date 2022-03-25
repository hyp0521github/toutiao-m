<template>
  <div class="channels-editing">
    <!-- 频道标题 -->
    <van-nav-bar title="编辑频道"/>
    <!-- 频道标题 end-->
    <!-- 我的频道 -->
    <van-nav-bar>
      <div slot="left">
        <span class="title-text">我的频道</span>
        <span class="click-title-text">点击进入频道</span>
      </div>
      <van-button slot="right" round type="default" size="small" @click="editBtn">{{isEdit ? '编辑' : '完成'}}</van-button>
    </van-nav-bar>
    <div class="my-channels-list">
      <div class="my-channels-list-button">
        <van-row gutter="20">
          <van-col span="6" v-for="(obj, idx) in editList" :key="obj.id">
            <van-button type="default" class="van-ellipsis" @click="SorDchannels(obj.id,idx)" :class="{active: idx === active}">{{obj.name}}</van-button>
            <van-icon name="close" class="button-close" size="20" v-show="!isEdit && !fiexChannels.includes(obj.id)"/>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 我的频道 end-- -->
    <!-- 推荐频道 -->
    <div class="channel-recommendation">
      <van-nav-bar>
        <div slot="left">
          <span class="title-text">频道推荐</span>
          <span class="click-title-text">点击加入频道</span>
        </div>
      </van-nav-bar>
      <div class="channel-recommendation-btn">
        <van-row gutter="20">
          <van-col span="6" v-for="(obj, idx) in editChannels" :key="obj.id">
            <van-button type="default" @click="addBtn(idx, obj.id)" class="van-ellipsis">+{{obj.name}}</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 推荐频道 end-- -->
    <!-- 小三角 -->
    <div class="small-triangle">
      <i class="left-small-triangle"></i>
      <i class="right-small-triangle"></i>
    </div>
    <!-- 小三角end -->
  </div>
</template>

<script>
// 导入vuex中的mapState函数来获取user
import { mapState } from 'vuex'
import { addUserChannels, deleteUserChannels } from '@/api/user.js'
// 导入存储数据函数
import { setItem } from '@/utils/stroge.js'

export default {
  props: {
    // 我的频道
    editList: {
      type: Array,
      required: true
    },
    // 所有频道
    allList: {
      type: Array,
      required: true
    },
    // 首页频道对应的active 控制高亮样式
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 控制删除按钮的隐显
      isEdit: true,
      // 用来存储固定频道
      fiexChannels: [0, 6]
    }
  },
  methods: {
    // 点击添加频道
    async addBtn (index, id) {
      this.editList.push(this.editChannels[index])
      // 判断登录状态
      if (this.user) {
        // 已登录状态 将数据存储到后台
        try {
          await addUserChannels({
            id: id, // 频道id
            seq: this.editList.length // 频道序号
          })
        } catch (error) {
          this.$toast('获取信息失败，请稍后重试')
        }
      } else {
        // 未登录状态 将数据存储到本地
        setItem('SET_MYCHANNELS', this.editList)
      }
    },
    // 编辑按钮
    editBtn () {
      this.isEdit = !this.isEdit
    },
    // 点击我的频道按钮切换首页频道
    SorDchannels (id, index) {
      if (this.isEdit) {
        // 非编辑状态执行切换频道
        this.$emit('channels', index, false)
      } else {
        // 判断删除的频道是否是固定频道
        if (this.fiexChannels.includes(id)) {
          return
        }
        // 编辑状态执行删除频道
        // 调用接口删除频道，页面不会马上更新数据，要刷新之后才会更新，但是后台已经更新了，所以
        // 加个splice这样子页面才能立马更新
        this.editList.splice(index, 1)
        // 如果删除的频道是激活频道之前的频道, 则更新激动频道
        if (index <= this.active) {
          this.$emit('channels', this.active - 1, true)
        }
        this.delChannels(id)
      }
    },
    async delChannels (id) {
      try {
        if (this.user) {
          // 登录后
          await deleteUserChannels(id)
        } else {
          // 未登录
          setItem('SET_MYCHANNELS', this.editList)
        }
      } catch (error) {
        this.$toast('操作失败, 请重新操作')
      }
    }
  },
  // 计算属性会观测内部依赖数据的变化
  computed: {
    // 获取vuex的user
    ...mapState(['user']),
    // 计算推荐频道 = all - edit
    editChannels () {
      // // 第一种方法 定义一个空数组接收符合条件的值
      // const channels = []
      // this.allList.forEach(allChannels => {
      //   // 如果找到editList的数组元素，则find()立即返回找到的元素的值
      //   const editChannels = this.editList.find(myChannels => {
      //     // 如果俩个id相等就返回找到的editList里面的元素
      //     return myChannels.id === allChannels.id
      //   })
      //   // 如果不是找到的数组元素，就添加进channles
      //   if (!editChannels) {
      //     channels.push(allChannels)
      //   }
      // })
      // return channels
      // 第二种方法 filter方法
      // filter方法会创建一个新的数组, 把符合条件的元素存储到新数组
      return this.allList.filter(allChannels => {
        return !this.editList.find(editChannels => {
          return allChannels.id === editChannels.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .channels-editing {
    position: relative;
  }

  // 频道标题样式
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .click-title-text {
    padding-left: 20px;
    font-size: 16px;
    color: #efefef;
  }

  // 编辑按钮文字颜色
  .van-button--small {
    width: 104px;
    height: 48px;
    color: #f85959
  }

  // 按钮外边框颜色
  .van-button--round {
    border-color: #f85959;
  }

  // 去除van自带的下边框
  .van-hairline--bottom::after {
    border-bottom-width: 0
  }

  // 按钮背景颜色
  .van-row {
    .van-button {
      background: #f4f5f6;
      font-size: 30px;
    }
  }

  // 我的频道
  .my-channels-list {
    padding: 0 22px;
    .my-channels-list-button {
      // 按钮尺寸
      .van-button {
        width: 170px;
        height: 86px;
      }
      .van-col {
        position: relative;
        padding-left: 0!important;
        padding-right: 0!important;
      }
      .van-col--6:nth-child(n+5)  {
        padding-top: 31px;
      }
      // 删除图标按钮
      .button-close {
        position: absolute;
        right: 0px;
        top: 10px;
        z-index: 1;
      }
      // 改变前4个按钮的位置
      .van-col:nth-child(-n+4) {
        .button-close {
          top: -20px;
        }
      }
      // // 去除掉第一个按钮
      // .van-col:nth-child(1) {
      //   .button-close {
      //     display: none;
      //   }
      // }
    }
  }

  // 频道推荐
  .channel-recommendation {
    .channel-recommendation-btn {
      // 设置内容的左右边距
      padding: 0 22px;
      // 设置button按钮
      .van-button {
        width: 170px;
        height: 86px;
      }
      // 去除van-col的padding值
      .van-col {
        padding-left: 0!important;
        padding-right: 0!important;
      }
      // 选择从第5个元素开始算起
      .van-col--6:nth-child(n+5) {
        padding-top: 31px;
      }
    }
  }

  // 小三角样式
  .left-small-triangle, .right-small-triangle {
    position: absolute;
    top: -12px;
    left: -14px;
    width:0;
    height:0;
    overflow:hidden;
    font-size: 0;
    line-height: 0;
    border-width:15px;
    border-style:solid;
    border-color:#f30 transparent transparent transparent;
    transform:rotate(135deg);
    z-index: 1;
  }
  .right-small-triangle {
    left: 732px;
    transform:rotate(225deg);
  }

  // 高亮显示样式
  .active {
    color: red;
    font-weight: 600;
  }
</style>
