<template>
  <div>
    <Button
      icon="md-add"
      type="primary"
      shape="circle"
      class="add_button"
      size="large"
      @click="show(0,'add')"
    ></Button>
    <Table
      border
      :columns="columns1"
      :data="data1"
      style="positon:absolute;top:50px;"
    >
      <template
        slot-scope="{ row, index }"
        slot="action"
      >
        <Button
          type="primary"
          size="default"
          style="margin-right: 5px"
          @click="show(index,'edit')"
          icon="md-create"
        ></Button>
        <Button
          type="error"
          size="default"
          @click="remove(index)"
          icon="md-trash"
        ></Button>
      </template></Table>
       <Modal
        v-model="showUser"
        title="用户信息"
        @on-ok="ok"
        @on-cancel="cancel">
         <Form :model="formItem" :label-width="80">
        <FormItem label="用户名">
            <Input v-model="formItem.User_name" placeholder=""></Input>
        </FormItem>
         <FormItem label="密码">
            <Input v-model="formItem.User_psw" placeholder=""></Input>
        </FormItem>
         <FormItem label="真实姓名">
            <Input v-model="formItem.User_realname" placeholder=""></Input>
        </FormItem>
         <FormItem label="身份证号">
            <Input v-model="formItem.User_number" placeholder=""></Input>
        </FormItem>
         <FormItem label="电话号">
            <Input v-model="formItem.User_phone" placeholder=""></Input>
        </FormItem>
         <FormItem label="性别">
            <Input v-model="formItem.User_sex" placeholder=""></Input>
        </FormItem>
<FormItem label="级别">
            <Input v-model="formItem.User_level" placeholder=""></Input>
        </FormItem>
        </Form>

    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns1: [{
          title: '用户Id',
          key: 'Id'
        },
        {
          title: '用户名',
          key: 'User_name'
        },
        {
          title: '密码',
          key: 'User_psw'
        },

        {
          title: '真实姓名',
          key: 'User_realname'
        },
        {
          title: '身份证号',
          key: 'User_number'
        },
        {
          title: '电话号',
          key: 'User_phone'
        },
        {
          title: '性别',
          key: 'User_sex'
        },
        {
          title: '级别',
          key: 'User_level'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data1: [],
      userMsg:[],
      userinfo:[],
      showUser:false,
      formItem:{
        User_name:null,
        User_psw:null,
        User_realname:null,
        User_phone:null,
        User_number:null,
        User_sex:null,
        User_level:null
      },
      addUser:false,
      editUser:false,
      editIndex:null
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData(){
      // 获取所有用户基本信息
      this.$http.get('/ebook/usermsg/').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.userMsg=resp.data
           // 获取所有用户详细信息
           this.$http.get('/ebook/userinfo/').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.userinfo=resp.data
          this.data1=[]
          for(var i=0;i<this.userMsg.length;i++){
            for(var j=0;j<this.userinfo.length;j++){

              if(this.userMsg[i].Id===this.userinfo[j].User_id){
                var tag= Object.assign(this.userMsg[i], this.userinfo[j])
                if(tag.User_level!==1){
                  this.data1.push(tag)
                }

              }
            }
          }
        }
      })
        }
      })

    },
    show(index,val){
      this.showUser=true
      switch (val) {
        case 'edit':
          this.formItem=this.data1[index]
          this.addUser=false
          this.editUser=true
          this.editIndex=index
          break;
        case 'add':
            this.formItem={
          User_name:null,
          User_psw:null,
          User_realname:null,
          User_phone:null,
          User_number:null,
          User_sex:null,
          User_level:null
        }
        this.addUser=true
          this.editUser=false
          break;

      }
    },
    ok(){
      if(this.addUser===true&&this.editUser===false){
        this.formItem.User_level=parseInt(this.formItem.User_level)
        this.$http.post('/ebook/logon/',this.formItem).then((resp) => {
          if (resp === null && resp.data === null) {
            this.$message({
              type: 'error',
              message: '服务端数据格式错误'
            })
            return
          } else {
            this.loadData()
          }
        })
      }
      else if(this.addUser===false&&this.editUser===true){
        this.formItem.Id=this.data1[this.editIndex].User_id
        this.formItem.User_id=this.data1[this.editIndex].User_id
        this.formItem.User_level=parseInt(this.formItem.User_level)
        this.$http.post('/ebook/updateuser/',this.formItem).then((resp) => {
          if (resp === null && resp.data === null) {
            this.$message({
              type: 'error',
              message: '服务端数据格式错误'
            })
            return
          } else {
            this.loadData()
          }
        })
      }
    },
    cancel(){

    },
    remove(index){
      this.$http.get('/ebook/deluser/',{params:{id:this.data1[index].User_id}}).then((resp) => {
          if (resp === null && resp.data === null) {
            this.$message({
              type: 'error',
              message: '服务端数据格式错误'
            })
            return
          } else {
            this.loadData()
          }
        })
    }
  }
}
</script>

<style scoped>
.add_button {
  position: absolute;
  right: 80px;
  /* background-color:#d03d3d; */
  border: 0;
  /* font-size:25px; */
}
</style>