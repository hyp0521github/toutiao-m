<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close-popup')"
      @confirm="confirmBtn"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import dayjs from 'dayjs'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1949, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async confirmBtn (currentDate) {
      const date = dayjs(currentDate).format('YYYY-MM-DD')

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        await updateUserProfile({
          birthday: date
        })
      } catch (error) {
        this.$toast('修改失败，请重新操作')
      }

      this.$emit('input', date)
      this.$toast('修改成功')
      this.$emit('close-popup')
    }
  }
}
</script>

<style>

</style>
