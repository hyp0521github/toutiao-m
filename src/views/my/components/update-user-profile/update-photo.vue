<template>
  <div class="update-photo">
    <img
      :src="imgUrl"
      class="imgs"
      ref="img"
    />
    <van-nav-bar
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close-popup')"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'

export default {
  data () {
    return {
      cropper: null
    }
  },
  props: {
    imgUrl: {
      type: [String, Object],
      required: true
    }
  },
  methods: {
    onClickRight () {
      // 如果是基于服务端的裁切，则使用getData方法，获取参数
      // console.log(this.cropper.getData())
      // 如果是客户端自己剪切
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.onLoadCropper(blob)
      })
    },
    async onLoadCropper (blob) {
      try {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          duration: 0
        })
        // 因为Content-Type为multipart/form-data类型，则需要传递FormData对象
        // 如果Content-Type为application/json类型，则需要传递javascript对象
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)

        // 更新视图变化
        // console.log(blob)
        // console.log(window.URL.createObjectURL(blob))
        // console.log(data.data.photo)
        this.$emit('update-photo', data.data.photo)
        this.$toast('图片修改成功')
        this.$emit('close-popup')
      } catch (error) {
        this.$toast('保存失败，请重新操作')
      }
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      // 配置文件
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      ropBoxResizable: false,
      background: false
    })
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  height: 92%;
  background-color: black;
  .imgs {
    display: block;
    max-width: 100%;
  }
  /deep/.van-nav-bar {
    background-color: black;
    bottom: 6px;
    .van-nav-bar__text {
      color: #fff;
      font-size: 26px;
    }
  }
}
</style>
