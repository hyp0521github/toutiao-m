<template>
  <div class="login-interface">
      <van-nav-bar title="登录" class="pag-nav-bar" left-arrow>
        <!-- .back()返回上一级 -->
        <van-icon slot="left" name="cross" size="20" color="white" @click="$router.back()"/>
      </van-nav-bar>
      <van-form @submit="onSubmit" ref="user_form">
        <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
        v-model="user.code"
        name="code"
        center
        clearable
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-button size="mini" type="primary" color="#bfbfbf" @click="codeBtn" native-type="button" v-if="isCountDownShow">获取验证码</van-button>
            <van-count-down :time="time" v-else @finish="finishFn">
              <template #default="timeData">
                <span class="block">{{ timeData.seconds }} s</span>
              </template>
            </van-count-down>
          </template>
        </van-field>
        <div class="padding-btn">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { userAPI, codeAPI } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 表单验证
      // 当表单验证不通过时不触发表单提交
      // 通过时才触发表单提交
      userFormRules: {
        mobile: [{
          required: true,
          message: '请输入手机号'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '请填写正确的手机号码'
        }],
        code: [{
          required: true,
          message: '请输入验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '请填写正确的验证码'
        }]
      },
      // 1000*60表示60秒
      time: 1000 * 5,
      isCountDownShow: true
    }
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const users = this.user
      // 2.验证规则
      // 加载提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        // 设置加载事件默认2000,如果为 0 没成功前就会一直加载
        duration: 0
      })
      // 3.后台验证登录 成功or失败
      try {
        const { data } = await userAPI(users)
        // 通过解构赋值获取token等数据存储到vuex中的mutations函数中的data
        this.$store.commit('setUser', data.data)
        // totast在另一个toast加载完成时，自动关闭上一个toast
        this.$toast.success('登录成功')
        // this.$router.push({
        //   name: 'my'
        // })
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败,密码或验证码输入错误')
        } else {
          this.$toast.fail('服务器错误或网络异常')
        }
        this.$toast.fail('登录失败,密码或验证码输入错误')
      }
    },
    async codeBtn () {
      // 1.校验手机号
      try {
        // validate里面是name属性对应的值
        await this.$refs.user_form.validate('mobile')
      } catch (err) {
        // 打印了err.message, return 表示退出操作，下面的123打印不了
        return this.$toast('请填写正确的手机号')
      }
      // console.log(123)
      // 2.开启倒计时
      this.isCountDownShow = false
      // 3.接收验证码
      try {
        await codeAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 关闭倒计时
        this.isCountDownShow = true
        // 判断是否是在1分钟之内再次发送的
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
        } else {
          this.$toast('获取验证码失败')
        }
      }
    },
    // 倒计时结束
    finishFn () {
      this.isCountDownShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.van-button--normal,
.van-button {
    border-radius: 10px;
}

.login-interface {
  .toutiao {
    font-size: 40px;
  }
  .padding-btn {
    padding: 53px 33px;
  }
}

.block {
  display: inline-block;
  width: 140px;
  height: 45px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 10px;
  line-height: 45px;
}
</style>
