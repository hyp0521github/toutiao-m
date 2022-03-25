<template>
  <div class="user-profile-page">
    <div class="header">
      <van-nav-bar title="个人信息" left-arrow  @click-left="$router.back()"/>
    </div>
    <div class="content">
      <input type="file" hidden ref="file" @change="onChangeFile">
      <van-cell-group>
        <van-cell title="头像" value="" is-link @click="$refs.file.click()">
          <van-image
            :src="setUserProfile.photo"
            slot="default"
            class="img"
            round
            fit="cover"
          />
        </van-cell>
        <van-popup
          v-if="userPhotoPopup"
          v-model="userPhotoPopup"
          position="bottom"
          :style="{ height: '100%' }"
        >
          <UpdatePhoto :imgUrl="imgUrl" @close-popup="userPhotoPopup=false" @update-photo="setUserProfile.photo=$event"/>
        </van-popup>
        <!-- 修改昵称 -->
        <van-cell
          title="昵称"
          :value="setUserProfile.name"
          is-link
          @click="userNamePopup=true"
        />
        <!-- 弹出层随着显示而存在，关闭而销毁，这样子里面的数据才能同步更新 -->
        <van-popup
          v-if="userNamePopup"
          v-model="userNamePopup"
          position="bottom"
          :style="{ height: '100%' }"
        >
          <update-name
            @close-popup="userNamePopup=false"
            v-model="setUserProfile.name"
          />
        </van-popup>
        <!-- 修改性别 -->
        <van-cell title="性别" :value="setUserProfile.gender === 0 ? '男' : '女' " is-link @click="userSexPopup=true"/>
          <van-popup
            v-if="userSexPopup"
            v-model="userSexPopup"
            position="bottom"
            :style="{ height: '40%' }"
          >
            <update-sex
              @close-popup="userSexPopup=false"
              v-model="setUserProfile.gender"
            />
          </van-popup>
        <!-- 修改生日 -->
        <van-cell title="生日" :value="setUserProfile.birthday" is-link @click="userBirthdayPopup=true"/>
        <van-popup
          v-if="userBirthdayPopup"
          v-model="userBirthdayPopup"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <update-birthday
            @close-popup="userBirthdayPopup=false"
            v-model="setUserProfile.birthday"
          />
        </van-popup>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
// 引入修改昵称组件
import UpdateName from '../components/update-user-profile/update-name.vue'
// 引入修改性别组件
import UpdateSex from '../components/update-user-profile/update-sex.vue'
// 引入修改生日组件
import UpdateBirthday from '../components/update-user-profile/update-birthday.vue'
// 引入修改图片组件
import UpdatePhoto from './update-user-profile/update-photo.vue'

export default {
  data () {
    return {
      setUserProfile: {},
      // 控制修改昵称的弹出层
      userNamePopup: false,
      // 控制修改性别的弹出层
      userSexPopup: false,
      // 控制修改生日的弹出层
      userBirthdayPopup: false,
      // 控制修改图片的弹出层
      userPhotoPopup: false,
      imgUrl: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  components: {
    UpdateName,
    UpdateSex,
    UpdateBirthday,
    UpdatePhoto
  },
  methods: {
    // 获取数据
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.setUserProfile = data.data
      } catch (error) {
        this.$toast('获取失败， 请重新获取')
      }
    },
    // 图像发生改变
    onChangeFile () {
      // 获取文件对象
      const files = this.$refs.file.files[0]
      // 基于文件对象获取bolb数据
      const imgUrl = window.URL.createObjectURL(files)

      this.imgUrl = imgUrl

      // file-input如果选中了同一个文件就不会触发change事件
      // 解决办法就是每次使用完清空他的value
      this.$refs.file.value = ''

      // 打开弹出层
      this.userPhotoPopup = true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.header {
    // 固定头部
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    .van-nav-bar {
      // 标题背景颜色
      background-color: #3196fd;
      // 左侧返回按钮颜色
      .van-icon, .van-nav-bar__text {
        color: #fff
      }
      // 标题颜色
      .van-nav-bar__title {
        color: #fff
      }
    }
  }
/deep/ .content {
  margin-top: 90px;
  .img {
    width: 55px;
    height: 55px;
  }
  .van-cell {
    align-items: center;
    .van-cell__value {
      position: relative;
      .van-image {
        top: 6px;
        right: 0;
      }
    }
  }
  .van-popup {
    background-color: #f5f7f9;
    .van-cell {
      margin: 20px 0 0 20px;
    }
    .van-picker__cancel {
      color: red
    }
    .van-picker__confirm {
      color: red
    }
  }
}
</style>
