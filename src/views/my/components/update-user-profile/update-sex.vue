<template>
  <div class="update-sex">
    <van-area
      title="性别"
      :area-list="areaList"
      :columns-num="1"
      @cancel="$emit('close-popup')"
      @confirm="confirmBtn"
      :value="`${value}`"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      areaList: {
        province_list: {
          0: '男',
          1: '女'
        }
      }
    }
  },
  methods: {
    async confirmBtn (sex) {
      const gender = sex[0].name === '男' ? 0 : 1

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        await updateUserProfile({
          gender
        })
      } catch (error) {
        this.$toast('修改失败，请重新操作')
      }

      this.$emit('input', gender)
      this.$toast('修改成功')
      this.$emit('close-popup')
    }
  }
}
</script>

<style>

</style>
