<template>
  <div>

    <Button

      icon="md-add"
      type="primary"
      shape="circle"
      class="add_button"
      size="large"
      @click="clickAdd"
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
          @click="show(index)"
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
        v-model="showEdit"
        title="修改书籍列表"
        @on-ok="editOk"
        @on-cancel="editCancel">

        <Select v-model="editList" filterable multiple>
                <Option v-for="item in bookList" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
            </Select>
    </Modal>
     <Modal
        v-model="showAdd"
        title="添加书籍列表"
        @on-ok="addOk"
        @on-cancel="addCancel">
        <Input v-model="addListName" placeholder="添加书单名" style="width: 300px" />
        <Select v-model="addList" filterable multiple>
                <Option v-for="item in bookList" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
        </Select>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns1: [{
        title: '书单Id',
        key: 'Id'
      },
      {
        title: '书单名',
        key: 'List_name'
      },
      {
        title: '书籍名',
        key: 'EbookList',
        render: (h, params) => {
          return h('span', {
            style: {
            display: 'inline-block',
            width: '100%',
            margin: '10px',
            overflow: 'hidden',
            textOverflow: 'hiddden'
            }
          }, params.row.EbookList.join('\n'))
          }
      },
      {
        title: '操作',
        slot: 'action',
        width: 150,
        align: 'center'
      }
      ],
      data1: [],
      showEdit:false,
      showAdd:false,
      editList:[],
      editIndex:null,
      addListName:'',
      addList:[],
      bookList:[]
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      // 获取全部书单信息
       this.$http.get('/ebook/list/').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.data1=resp.data
          for(let i=0;i<this.data1.length;i++){
            // this.data1[i].Ebook_id= this.data1[i].Ebook_id.split(",")
            this.data1[i].Ebook_id= this.data1[i].Ebook_id.split(",")
            for(var t=0;t<this.data1[i].Ebook_id.length;t++){
              this.data1[i].Ebook_id[t]=parseInt(this.data1[i].Ebook_id[t])
            }
            this.data1[i].EbookList=[]
            for(let j=0;j<5;j++){

              this.$http.get('/ebook/getmsg/',{params:{id:this.data1[i].Ebook_id[j]}}).then((resp) => {
                if (resp === null && resp.data === null) {
                  this.$message({
                    type: 'error',
                    message: '服务端数据格式错误'
                  })
                return
                } else {
                  this.data1[i].EbookList.push(resp.data.Name)
                  this.$set(this.data1,i,this.data1[i])
                }
              })
            }

          }
        }
       })
      //  获取全部书籍信息
       this.$http.get('/ebook/msg/').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.bookList=resp.data
        }
       })
    },
    show(index){
      this.showEdit=true
      this.editIndex=index
      this.editList=this.data1[index].Ebook_id
    },
    remove(index){
      // 删除书单
       this.$http.get('/ebook/dellist/',{params:{id:this.data1[index].Id}}).then((resp) => {
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
    },
    editOk(){
      var log=''
      for(var y=0;y<this.editList.length;y++){
        if(y!==this.editList.length-1){
           log=log+this.editList[y]+','
        }else{
           log=log+this.editList[y]
        }

      }
      var config={
        Id:this.data1[this.editIndex].Id,
        Ebook_id:log
      }
      // 修改书单
       this.$http.post('/ebook/updatelist/',config).then((resp) => {
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
    },
  editCancel(){

    },
    addOk(){
var log=''
      for(var y=0;y<this.addList.length;y++){
        if(y!==this.addList.length-1){
           log=log+this.addList[y]+','
        }else{
           log=log+this.addList[y]
        }

      }
      var config={
List_name:this.addListName,
        ebook_id:log
      }
      // 添加书单
       this.$http.post('/ebook/addlist/',config).then((resp) => {
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
    },
    addCancel(){

    },
    clickAdd(){
      this.showAdd=true
       this.addListName=''
      this.addList=[]
    }
  },

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