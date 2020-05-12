<template>
  <div class="bg">
    <!-- 置顶用户信息 -->
    <!-- <div class="header">

      <Head class="user_menu"></Head>
    </div> -->
    <!-- <div class="bg_body"> -->
      <!-- 购物车标题 -->
      <!-- <div class="cart_title">
        <p class="cart_title_p">购物车</p>
      </div> -->
      <!-- 购物车内容标题 -->
      <div class="table_title">
        <p class="table_title_p table_title_msg">商品信息</p>
        <p class="table_title_p table_title_price">价格（元）</p>

      </div>

      <!-- 购物车内容 -->
      <div
        class="table_body"
        v-for="(item,index) in bookMsg"
        :key="index"
      >
        <Checkbox
          v-model="item.check"
          class="table_checkbox"
          label=""
          @on-change="bookclick(index)"
        > </Checkbox>
        <img
          :src="item.Pic"
          alt=""
          class="table_img"
        >
        <p class="table_name">{{item.Name}}</p>
        <p class="table_price">¥{{item.Price}}</p>
        <Icon
          type="md-trash"
          class="table_del"
          size="18"
          @click="delbook(index)"
        />
      </div>
      <!-- 购物车末尾合记 -->
      <div class="cart_bottom">
        <Checkbox
          v-model="allcheck"
          class="cart_bottom_check"
          @on-change="allclick"
        > 全选</Checkbox>
        <p class="cart_bottom_total">合计: ¥{{total}}</p>

        <Button
          type="error"
          class="cart_bottom_button"
          @click="jumpToOrder"
        >结算</Button>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
// import head from '@/components/head.vue'
export default {
  // components: {
  //   'Head': head
  // },
  data () {
    return {
      bookId: '',
      bookMsg: [],
      total: 0,
      allcheck: false
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      // 通过用户id获取用户购物车书籍id字符串
      this.$http.get('/ebook/getcart', { params: { id: localStorage.getItem("Uid") } }).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.bookId = ''
          this.bookId = resp.data
          // 将获取到的书籍id字符串分割成数组
          var bookIdArray = this.bookId.split(",")
          this.bookMsg = []
          // 通过书籍id获取书籍信息
          for (var i = 0; i < bookIdArray.length; i++) {
            this.$http.get('/ebook/getmsg/', { params: { id: bookIdArray[i] } }).then((resp) => {
              if (resp === null && resp.data === null) {
                this.$message({
                  type: 'error',
                  message: '服务端数据格式错误'
                })
                return
              } else {
                resp.data.Pic = "https://images.weserv.nl/?url=" + resp.data.Pic
                resp.data.check = false
                this.bookMsg.push(resp.data)
              }
            })
          }
        }
      })
    },
    // 点击全选按钮
    allclick () {
      if (this.allcheck === true) {
        for (var t = 0; t < this.bookMsg.length; t++) {
          this.bookMsg[t].check = true
        }
      } else {
        for (var t = 0; t < this.bookMsg.length; t++) {
          this.bookMsg[t].check = false
        }
      }
      this.settotal()
    },
    // 点击某一个商品的选择框
    bookclick (index) {
      if (this.bookMsg[index].check === false) {
        this.allcheck = false
      }
      this.settotal()

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
    // 点击删除按钮
    delbook (index) {
      // 获取删除后的新书籍id字符串
      var bookid = ''
      this.bookMsg.splice(index, 1)
      for (var t = 0; t < this.bookMsg.length; t++) {
        // if (t !== index) {
        if (t === this.bookMsg.length - 1) {
          bookid = bookid + this.bookMsg[t].Id
        } else {
          bookid = bookid + this.bookMsg[t].Id + ','
        }
        // }
      }
      // console.log(bookid)
      var config = {
        User_id: parseInt(localStorage.getItem("Uid")),
        Ebook_id: bookid
      }
      // 更新数据库用户购物车信息
      this.$http.post('/ebook/delcart/', config).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        }
      })

      // this.bookMsg.splice(index, 1)
    },
    jumpToOrder(){
      // console.log(this.bookMsg)
      var times=0
      var bookid=''
      for(var i=0;i<this.bookMsg.length;i++){

        if(this.bookMsg[i].check===true){
          if(times===0){
             bookid=bookid+this.bookMsg[i].Id
          }else{
            bookid=bookid+','+this.bookMsg[i].Id
          }
         times++
        }
      }
       this.$router.push({ name: 'order', params: { id: bookid } })
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
  /* background-color: rgb(243, 235, 222); */
}
.bg_body {
  position: absolute;
  /* width: 70%; */
  height: 100%;
  left: 20%;
  right: 20%;
  /* background-color: #f6f6f1; */
}
.header {
  width: 100%;
  height: 50px;
  position: relative;
  top: 0px;
  left: 0px;
  /* background-color: #f1f1ec; */
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
  /* background-color: rgb(243, 229, 236); */
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
  width:40%;
  /* left: 20%;
  right: 20%; */
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
</style>