<template>
  <div>
    <div
      v-for="(item,index) in orderData"
      :key="index"
      class="order_body"
    >
      <Form
        :model="item"
        :label-width="80"
      >
        <FormItem
          label="收货人姓名"
          class="formitem"
        >
          <Input
            v-model="item.Order_name"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem>
        <FormItem
          label="收货人电话"
          class="formitem"
        >
          <Input
            v-model="item.Order_phone"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem>
        <!-- <FormItem
          label="省"
          class="formitem"
        >
          <Input
            v-model="item.Province"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem>
        <FormItem
          label="市"
          class="formitem"
        >
          <Input
            v-model="item.City"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem>
        <FormItem
          label="区"
          class="formitem"
        >
          <Input
            v-model="item.District"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem>
        <FormItem
          label="详细地址"
          class="formitem"
        >
          <Input
            v-model="item.Address"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem> -->
        <FormItem
          label="总价"
          class="formitem"
        >
          <Input
            v-model="item.Order_price"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem>
        <FormItem
          label="下单时间"
          class="formitem"
        >
          <Input
            v-model="item.Order_time"
            placeholder=""
            class="body_input"
            :disabled="disable"
          ></Input>
        </FormItem>
      </Form>
      <div class="table_title">
        <p class="table_title_p table_title_msg">商品信息</p>
        <p class="table_title_p table_title_price">价格（元）</p>
      </div>

      <div
        class="table_body"
        v-for="(items,index) in item.Book_list"
        :key="index"
      >
        <img
          :src="items.Pic"
          alt=""
          class="table_img"
        >
        <p class="table_name">{{items.Name}}</p>
        <p class="table_price">¥{{items.Price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderMsg: [],
      orderDetails: [],
      orderData: [],
      disable: true
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.orderData = []
      var config = []
      // 获取所有订单信息
      this.$http.get('/ebook/getordermsg/').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.orderMsg = resp.data
          this.$http.get('/ebook/getorderdetails/').then((resp) => {
            if (resp === null && resp.data === null) {
              this.$message({
                type: 'error',
                message: '服务端数据格式错误'
              })
              return
            } else {
              this.orderDetails = resp.data
              for (var j = 0; j < this.orderDetails.length; j++) {
                delete this.orderDetails[j].Id
              }
              // console.log(this.orderMsg,this.orderDetails)
              for (var i = 0; i < this.orderMsg.length; i++) {
                for (var j = 0; j < this.orderDetails.length; j++) {
                  if (this.orderMsg[i].Id === this.orderDetails[j].Order_id) {
                    var tag = Object.assign(this.orderMsg[i], this.orderDetails[j])
                    config.push(tag)
                  }
                }
              }
              for (var k = 0; k < config.length; k++) {
                if (config[k].User_id === parseInt(localStorage.getItem("Uid"))) {
                  config[k].Book_list = []
                  this.orderData.push(config[k])
                }
              }
              this.getbooklist()

            }
          })

        }
      })

    },
    getbooklist () {
      for (let t = 0; t < this.orderData.length; t++) {
        let bookIdList = this.orderData[t].Ebook_id.split(",")

        // this.orderData[t]["Book_list"] = []
        // this.orderData.forEach(item => {
        //   this.$set(item, 'Book_list', [])
        // })
        // 通过书籍id获取书籍信息
        for (let i = 0; i < bookIdList.length; i++) {
          this.$http.get('/ebook/getmsg/', { params: { id: bookIdList[i] } }).then((resp) => {
            if (resp === null && resp.data === null) {
              this.$message({
                type: 'error',
                message: '服务端数据格式错误'
              })
              return
            } else {
              resp.data.Pic = "https://images.weserv.nl/?url=" + resp.data.Pic
              // console.log(this.orderData[t])
              this.orderData[t].Book_list.push(resp.data)
              this.$set(this.orderData, t, this.orderData[t])
            }
          })
        }
        console.log(this.orderData)
      }
    }
  }
}
</script>

<style scoped>
.order_body {
  background-color: rgb(223, 215, 215);
  border-radius: 10px;
  border: 1px solid rgb(216, 221, 202);
  margin: 50px 20px 50px 0;
}
.table_title {
  width: 550px;
  height: 50px;
  margin: 0 auto;
  background-color: rgb(243, 229, 236);
}
.table_title_p {
  font-size: 16px;
  display: inline-block;
  color: rgb(133, 126, 126);
  line-height: 50px;
}
.table_title_msg {
  width: 100px;
  position: absolute;
  left: 100px;
  /* background-color: hotpink; */
}
.table_title_price {
  width: 100px;
  /* background-color: rgb(233, 255, 105); */
  margin-right: 50px;
  position: absolute;
  right: 50px;
}
.table_body {
  width: 550px;
  height: 150px;
  /* margin: 20px auto; */
  background-color: rgb(223, 215, 215);
  position: relative;
  line-height: 150px;
}
.table_checkbox {
  position: absolute;
  left: 5%;
  /* margin-left: 20px; */
}
.table_name {
  position: absolute;
  left: 35%;
  display: inline-block;
  font-size: 15px;
}
.table_img {
  position: absolute;
  width: 100px;
  height: 130px;
  left: 15%;
  display: inline-block;
  top: 50%;
  transform: translate(0, -50%);
}
.table_price {
  position: absolute;
  right: 25%;
  display: inline-block;
  color: red;
}
.body_input {
  width: 400px;
  float: left;
}
</style>