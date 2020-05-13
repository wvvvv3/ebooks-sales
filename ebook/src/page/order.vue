<template>
  <div class="bg">
    <!-- 置顶用户信息 -->
    <div class="header">

      <Head class="user_menu"></Head>
    </div>
    <div class="bg_body">

      <div class="cart_title">
        <p class="cart_title_p">订单信息</p>
      </div>
      <Form
        :model="formItem"
        :label-width="80"
      >
        <FormItem
          label="收货人姓名"
          class="formitem"
        >
          <Input
            v-model="formItem.Order_name"
            placeholder=""
            class="body_input"
          ></Input>
        </FormItem>
        <FormItem
          label="收货人电话"
          class="formitem"
        >
          <Input
            v-model="formItem.Order_phone"
            placeholder=""
            class="body_input"
          ></Input>
        </FormItem>
        <!-- <FormItem
          label="省"
          class="formitem"
        >
          <Input
            v-model="formItem.Province"
            placeholder=""
            class="body_input"
          ></Input>
        </FormItem>
        <FormItem
          label="市"
          class="formitem"
        >
          <Input
            v-model="formItem.City"
            placeholder=""
            class="body_input"
          ></Input>
        </FormItem>
        <FormItem
          label="区"
          class="formitem"
        >
          <Input
            v-model="formItem.District"
            placeholder=""
            class="body_input"
          ></Input>
        </FormItem>
        <FormItem
          label="详细地址"
          class="formitem"
        >
          <Input
            v-model="formItem.Address"
            placeholder=""
            class="body_input"
          ></Input>
        </FormItem> -->

      </Form>
      <div class="table_title">
        <p class="table_title_p table_title_msg">商品信息</p>
        <p class="table_title_p table_title_price">价格（元）</p>
      </div>

      <div
        class="table_body"
        v-for="(item,index) in bookMsg"
        :key="index"
      >
        <img
          :src="item.Pic"
          alt=""
          class="table_img"
        >
        <p class="table_name">{{item.Name}}</p>
        <p class="table_price">¥{{item.Price}}</p>
      </div>
      <div class="cart_bottom">
        <p class="cart_bottom_total">合计: ¥{{total}}</p>

        <Button
          type="error"
          class="cart_bottom_button"
          @click="pay"
        >付款</Button>
      </div>
      <Modal
        v-model="showPay"
        title="支付"
        @on-ok="payOk"
      >
        <div
          id="qrcode"
          v-show="pay1"
        >

        </div>
        <p
          style="color:green;font-size:25px;"
          v-show="pay2"
        >下载成功!</p>
        <button
          @click="download"
          style="border:0px;background-color:white;cursor:default;"
        > <a
            href="../../static/xx.txt"
            download="xx.txt"
            style="color:white;cursor:default;"
          >xx</a>
        </button>
      </Modal>

    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import head from '@/components/head.vue'
export default {
  components: {
    'Head': head
  },
  data () {
    return {
      bookId: '',
      bookMsg: [],
      total: 0,
      formItem: {
        Order_name: '',
        Order_phone: '',
        Province: '',
        City: '',
        District: '',
        Address: ''
      },
      showPay: false,
      pay1: false,
      pay2: false
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.bookId = this.$route.params.id
      var bookIdList = this.bookId.split(",")

      // 通过书籍id获取书籍信息
      for (var i = 0; i < bookIdList.length; i++) {
        this.$http.get('/ebook/getmsg/', { params: { id: bookIdList[i] } }).then((resp) => {
          if (resp === null && resp.data === null) {
            this.$message({
              type: 'error',
              message: '服务端数据格式错误'
            })
            return
          } else {
            resp.data.Pic = "https://images.weserv.nl/?url=" + resp.data.Pic

            this.bookMsg.push(resp.data)
          }
        })
      }

    },


    // 计算总价格
    settotal () {
      var allprice = 0
      for (var t = 0; t < this.bookMsg.length; t++) {
        if (this.bookMsg[t].check === true) {
          allprice = allprice + this.bookMsg[t].Price
        }
      }
      this.total = allprice
    },
    pay () {
      var uid = parseInt(localStorage.getItem("Uid"))
      this.formItem.Ebook_id = this.$route.params.id
      this.formItem.Order_price = this.total
      this.formItem.Order_time = this.getTime()
      this.formItem.User_id = uid

      this.qrcode()
      // var canvas = document.getElementById('canvas')
      // QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
      //   if (error) console.error(error)
      //   console.log('已生成二维码!');
      // })

      // 添加订单
      // this.$http.post('/ebook/updateorder/', this.formItem).then((resp) => {
      //   if (resp === null && resp.data === null) {
      //     this.$message({
      //       type: 'error',
      //       message: '服务端数据格式错误'
      //     })
      //     return
      //   } else {

      //   }
      // })
    },
    payOk () {

      // 添加订单
      this.$http.post('/ebook/updateorder/', this.formItem).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.$router.push("/");
        }
      })
    },
    // init(){
    //   document.getElementById("qrcode").innerHTML = ""; //获取生成二维码后显示的容器的ID
    //   let self = this
    //   this.qrCode = new QRCode('qrcode',{
    //       width:150,                     //二维码的宽度
    //       height:150,                    //二维码的高度
    //       text:self.datacode,            //调用weixincode()方法时后台传的code
    //       colorDark:'#000',              //二维码颜色
    //       colorLight:'#fff',             //二维码底色
    //   })
    //   self.getOrderstate() //生成二维码的时候调用监听支付是否成功的方法
    // },
    qrcode () {
      this.showPay = true
      this.pay1 = true
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100, // 高度
        text: '56663159', // 二维码内容
        colorDark: '#000',      //前景色
        colorLight: '#fff',      //背景色
        correctLevel: QRCode.CorrectLevel.L     //容错等级
      })
      console.log(qrcode)
    },
    getTime () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return year + '-' + month + '-' + day
    },
    download () {
      this.pay1 = false
      this.pay2 = true
    }
  },
  watch: {
    bookMsg (val) {

      var allprice = 0
      for (var t = 0; t < val.length; t++) {

        allprice = allprice + val[t].Price

      }
      this.total = allprice

    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.bg {
  /* top: 0;
  left: 0;
  bottom: 0;
  right: 0; */

  /* -moz-background-size: 100% 100%;
  background-size: 100% 100%; */
  /* position: absolute; */
  background-color: rgb(243, 235, 222);
}
.bg_body {
  position: absolute;
  /* width: 70%; */
  /* height: 100%; */
  left: 20%;
  right: 20%;
  background-color: #f6f6f1;
}
.header {
  width: 100%;
  height: 50px;
  position: relative;
  top: 0px;
  left: 0px;
  background-color: #f1f1ec;
  line-height: 50px;
}
.user_menu {
  position: absolute;
  right: 50px;
}
.bg_body {
  /* position: absolute;
  height: 100%;
  left: 20%;
  right: 20%;
  background-color: #f6f6f1; */
}
.cart_title {
  height: 130px;
  width: 100%;
  /* border-bottom: 1px dashed rgb(214, 208, 208); */
}
.cart_title_p {
  color: #63411e;
  font-size: 25px;
  font-weight: 600;
  position: absolute;
  left: 60px;
  /* float: left; */
  /* margin: 50px; */
  line-height: 130px;
}
.table_title {
  width: 90%;
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
  width: 60%;
  /* background-color: hotpink; */
}
.table_title_price {
  width: 20%;
  /* background-color: rgb(233, 255, 105); */
  margin-right: 80px;
}
.table_body {
  width: 90%;
  height: 150px;
  margin: 20px auto;
  background-color: rgb(251, 251, 251);
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
.table_del {
  position: absolute;
  right: 10%;
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  color: rgb(185, 93, 93);
  cursor: pointer;
}
/* bottom */
.cart_bottom {
  /* width: 100%; */
  height: 50px;
  background-color: rgb(243, 229, 236);
  z-index: 9999;
  position: fixed;
  bottom: 0px;
  left: 20%;
  right: 20%;
  line-height: 50px;
  cursor: pointer;

  /* width: 100%; */
}
.cart_bottom_check {
  position: absolute;
  left: 10%;
  font-size: 14px;
}
.cart_bottom_total {
  position: absolute;
  right: 25%;
  font-size: 14px;
}
.cart_bottom_button {
  position: absolute;
  right: 7%;
  width: 100px;
  height: 40px;
  font-size: 14px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
}
.formitem {
  margin: 20px;
}
.body_input {
  width: 700px;
}
</style>