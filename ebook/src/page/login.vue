<template>
  <div class="bg">
    <div class="check">
      <div
        class="login"
        @click="tologin"
      >登录</div>
      <div
        class="logon"
        @click="tologon"
      >注册</div>
      <!-- 登录 -->
      <i-form v-if="iflogin">
        <Form-item
          label="用户名"
          prop="age"
        >
          <i-input type="text"></i-input>
        </Form-item>
        <Form-item
          label="密码"
          prop="passwd"
        >
          <i-input type="password"></i-input>
        </Form-item>

        <Form-item>
          <i-button
            type="primary"
            size="large"
          >登录</i-button>
          <!-- <i-button
            style="margin-left: 8px"
            size="large"
          >重置</i-button> -->
        </Form-item>
      </i-form>
      <!-- 注册 -->
      <i-form v-if="!iflogin">
        <Form-item
          label="用户名"
          prop="age"
        >
          <i-input type="text"></i-input>
        </Form-item>
        <Form-item
          label="密码"
          prop="passwd"
        >
          <i-input type="password"></i-input>
        </Form-item>
        <Form-item
          label="手机号"
          prop="age"
        >
          <i-input
            type="text"
            number
          ></i-input>
        </Form-item>
        <Form-item>
          <i-button
            type="primary"
            size="large"
          >注册</i-button>
          <!-- <i-button
            style="margin-left: 8px"
            size="large"
          >重置</i-button> -->
        </Form-item>
      </i-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      single: false,
      iflogin: true
    }
  },
  methods: {
    loadData () {
      this.$http.get('/ebook/student').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        }
        // if (resp.data.code === 0 && resp.data.data != null) {
        //   this.rateList = resp.data.data
        //   this.getIspList()
        // }
        console.log(resp)
      })
      //   }
      // })
    },
    // 点击登录按钮
    tologin () {
      this.iflogin = true
    },
    // 点击注册按钮
    tologon () {
      this.iflogin = false
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
.bg {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(http://attach.bbs.miui.com/forum/201110/16/120919zmekwnjqwm2m77oo.jpg);
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  position: absolute;
}
.check {
  width: 400px;
  height: 400px;
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 30px;
  margin: 30px;
  position: relative;
  top: 100px;
}
.login {
  width: 150px;
  height: 50px;
  display: inline-block;
  border-right: 1px solid #fff;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  font-size: 15px;
}
.logon {
  width: 150px;
  height: 50px;
  display: inline-block;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  font-size: 15px;
}
</style>