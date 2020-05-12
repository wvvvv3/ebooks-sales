<template>
  <div>
<!--
    <Button
      :size="buttonSize"
      icon="md-add"
      type="primary"
      shape="circle"
      class="add_button"
      size="large"
    ></Button> -->
    <Table
      border
      :columns="columns1"
      :data="data1"
      style="positon:absolute;top:50px;"
    >
      <!-- <template
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
      </template> -->
      </Table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns1: [
        {
        title: '订单Id',
        key: 'Id'
        },
        {
          title: '订单编号',
          key: 'Order_number'
        },
        {
          title: '用户id',
          key: 'User_id'
        },

        {
          title: '收货人姓名',
          key: 'Order_name'
        },
        {
          title: '省',
          key: 'Province'
        },
        {
          title: '市',
          key: 'City'
        },
        {
          title: '区',
          key: 'District'
        },
        {
          title: '地址',
          key: 'Address'
        },
        {
          title: '订单金额',
          key: 'Order_price'
        },
        {
          title: '订单交易时间',
          key: 'Order_time'
        },
        // {
        //   title: '操作',
        //   slot: 'action',
        //   width: 150,
        //   align: 'center'
        // }
      ],
      data1: [

      ]
    }
  },
   mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      // 获取全部订单信息
       this.$http.get('/ebook/getordermsg/').then((resp) => {
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