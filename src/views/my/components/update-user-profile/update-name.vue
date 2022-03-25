<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close-popup')"
      @click-right="onClickRight"
    />
    <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="13"
      show-word-limit
      placeholder="请输入昵称"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'

export default {
  props: {
    value: {
      type: String,
      deault: '',
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    // 完成按钮
    async onClickRight () {
      const localName = this.localName
      if (!localName.length) {
        this.$toast('昵称不能为空')
        return
      }

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      // 发送请求
      try {
        await updateUserProfile({
          name: localName
        })
      } catch (error) {
        this.$toast('修改失败， 请重新操作')
      }
      // 修改视图变化
      this.$emit('input', localName)
      this.$toast('修改成功')
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
