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
      </template>
      </Table>
      <Modal
        v-model="showBook"
        title="书籍信息"
        @on-ok="ok"
        @on-cancel="cancel">
         <Form :model="formItem" :label-width="80">
        <FormItem label="书籍Isbn">
            <Input v-model="formItem.Isbn" placeholder=""></Input>
        </FormItem>
         <FormItem label="书名">
            <Input v-model="formItem.Name" placeholder=""></Input>
        </FormItem>
         <FormItem label="价格">
            <Input v-model="formItem.Price" placeholder=""></Input>
        </FormItem>
         <FormItem label="出版时间">
            <Input v-model="formItem.Publish_date" placeholder=""></Input>
        </FormItem>
         <FormItem label="出版社">
            <Input v-model="formItem.Publisher" placeholder=""></Input>
        </FormItem>
         <FormItem label="作者">
            <Input v-model="formItem.Writer" placeholder=""></Input>
        </FormItem>
         <FormItem label="页数">
            <Input v-model="formItem.Page" placeholder=""></Input>
        </FormItem>
         <FormItem label="购买次数">
            <Input v-model="formItem.Buy_times" placeholder=""></Input>
        </FormItem>
         <FormItem label="类别">
            <Input v-model="formItem.Category" placeholder=""></Input>
        </FormItem>

        </Form>

    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns1: [
        {
        title: '书籍Id',
        key: 'Id'
        },
        {
          title: 'ISBN',
          key: 'Isbn'
        },
        {
          title: '书籍名称',
          key: 'Name'
        },

        {
          title: '价格',
          key: 'Price'
        },
        {
          title: '出版时间',
          key: 'Publish_date'
        },
        {
          title: '出版社',
          key: 'Publisher'
        },
        {
          title: '作者',
          key: 'Writer'
        },
        {
          title: '页数',
          key: 'Page'
        },
        {
          title: '购买次数',
          key: 'Buy_times'
        },
        {
          title: '类别',
          key: 'Category'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data1: [],
      showBook:false,
      formItem:{
        Id:null,
        Isbn:null,
        Name:null,
        Price:null,
        Publish_date:null,
        Publisher:null,
        Writer:null,
        Page:null,
        Buy_times:null,
        Category:null
      },
      edit:false,
      add:false
    }
  },
   mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      // 获取全部订单信息
       this.$http.get('/ebook/msg/').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.data1=resp.data
        }
       })
    },
    ok(){
      if(this.edit===true&&this.add===false){
        console.log(this.formItem,'edit')
      //    var config={
      //   Id:this.data1[this.editIndex].Id,
      //   Ebook_id:log
      // }
      //修改书籍
       this.formItem.Isbn=parseInt(this.formItem.Isbn)
         this.formItem.Price=parseInt(this.formItem.Price)
          this.formItem.Page=parseInt(this.formItem.Page)
           this.formItem.Buy_times=parseInt(this.formItem.Buy_times)
       this.$http.post('/ebook/updatebook/',this.formItem).then((resp) => {
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
      }else{
        // 添加书籍
        delete this.formItem.Id
        this.formItem.Isbn=parseInt(this.formItem.Isbn)
         this.formItem.Price=parseInt(this.formItem.Price)
          this.formItem.Page=parseInt(this.formItem.Page)
           this.formItem.Buy_times=parseInt(this.formItem.Buy_times)
       this.$http.post('/ebook/addbook/',this.formItem).then((resp) => {
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
    show(index,val){
      if(val==='edit'){
         this.showBook=true
          this.formItem=this.data1[index]
          this.edit=true
          this.add=false
      }else if(val==='add'){
        this.showBook=true
        this.edit=false
        this.add=true
        this.formItem={
          Id:null,
          Isbn:null,
          Name:null,
          Price:null,
          Publish_date:null,
          Publisher:null,
          Writer:null,
          Page:null,
          Buy_times:null,
          Category:null
        }
      }
    },
    remove(index){
       // 删除书籍
       this.$http.get('/ebook/delbook/',{params:{id:this.data1[index].Id}}).then((resp) => {
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