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
        <Form-item label="用户名">
          <i-input
            v-model="username"
            type="text"
          ></i-input>
        </Form-item>
        <Form-item label="密码">
          <i-input
            v-model="password"
            type="password"
          ></i-input>
        </Form-item>

        <Form-item>
          <i-button
            type="primary"
            size="large"
            @click="login"
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
      iflogin: true,
      username: "",
      password: ""
    }
  },
  methods: {
    loadData () {
      // this.$http.get('/ebook/login',{param:{u}}).then((resp) => {
      //   if (resp === null && resp.data === null) {
      //     this.$message({
      //       type: 'error',
      //       message: '服务端数据格式错误'
      //     })
      //     return
      //   }
      //   // if (resp.data.code === 0 && resp.data.data != null) {
      //   //   this.rateList = resp.data.data
      //   //   this.getIspList()
      //   // }
      //   console.log(resp)
      // })

    },
    // 点击选择登录按钮
    tologin () {
      this.iflogin = true
    },
    // 点击选择注册按钮
    tologon () {
      this.iflogin = false
    },
    // 点击登录按钮
    login () {
      var config = {
        username: this.username,
        password: this.password
      }
      this.$http.get('/ebook/login', { params: config }).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        }
        if (resp.data !== -1) {
          console.log(resp.data)
          //设置Vuex登录标志为true，默认userLogin为false
          this.$store.dispatch("userLogin", true);
          //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
          //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
          localStorage.setItem("Flag", "isLogin");
          localStorage.setItem("Uid", resp.data);
          //iViewUi的友好提示
          // this.$Message.success(data.data.message);
          //登录成功后跳转到指定页面
          this.$router.push("/");
          this.$store.commit('setUserId', resp.data)
        }
      })
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