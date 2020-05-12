<template>
  <div>
    <Form
      :model="formItem"
      :label-width="80"
      style="margin-top:50px;"
    >
      <FormItem label="用户名">
        <Input
          v-model="formItem.User_name"
          placeholder="Enter something..."
          :disabled='!ifEdit'
          class="body_input"
        ></Input>
      </FormItem>
      <FormItem label="真实姓名">
        <Input
          v-model="formItem.User_realname"
          placeholder="Enter something..."
          :disabled='!ifEdit'
          class="body_input"
        ></Input>
      </FormItem>
      <FormItem label="手机号">
        <Input
          v-model="formItem.User_phone"
          placeholder="Enter something..."
          :disabled='!ifEdit'
          class="body_input"
        ></Input>
      </FormItem>
      <FormItem label="身份证号">
        <Input
          v-model="formItem.User_number"
          placeholder="Enter something..."
          :disabled='!ifEdit'
          class="body_input"
        ></Input>
      </FormItem>
      <FormItem label="密码">
        <Input
          v-model="formItem.User_psw"
          placeholder="Enter something..."
          :disabled='!ifEdit'
          class="body_input"
        ></Input>
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          v-show="!ifEdit"
          @click="edit"
        >修改</Button>
        <Button
          type="primary"
          v-show="ifEdit"
          @click="save"
        >保存</Button>
        <Button
          style="margin-left: 8px"
          v-show="ifEdit"
          @click="cancel"
        >取消</Button>
      </FormItem>

    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formItem: {
        User_realname: '王雨薇',
        User_name: 'vv',
        User_phone: 18845116640,
        User_sex: '女',
        User_number: '230202199705100026',
        User_psw: '123'
      },
      ifEdit: false,
      userMsg:{},
      userInfo:{},
      userData:{}
    }
  },
  methods: {
    edit () {
      this.ifEdit = !this.ifEdit
    },
    loadData(){
      // 获取所有用户基本信息
      this.$http.get('/ebook/getusermsg/',{params:{id:localStorage.getItem("Uid")}}).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.userMsg=resp.data
           // 获取所有用户详细信息
           this.$http.get('/ebook/getuserinfo/',{params:{id:localStorage.getItem("Uid")}}).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.userInfo=resp.data
          this.formItem=Object.assign(this.userMsg, this.userInfo)

        }
      })
        }
      })

    },
    save(){
      // console.log(this.formItem)
       this.$http.post('/ebook/updateuser/',this.formItem).then((resp) => {
          if (resp === null && resp.data === null) {
            this.$message({
              type: 'error',
              message: '服务端数据格式错误'
            })
            return
          } else {
            this.ifEdit=false
            this.loadData()
          }
        })
    },
    cancel(){
this.ifEdit=false
this.loadData()
    }
  },
  mounted(){
    this.loadData()
  }
}
</script>

<style  scoped>
.body_input {
  width: 400px;
}
</style>