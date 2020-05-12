<template>
  <div class="bg">
    <!-- 置顶用户信息 -->
    <div class="header">

      <Head class="user_menu"></Head>
    </div>
    <div class="bg_body">
      <!-- <p class="bd_title">我的信息</p> -->
      <Menu
        theme="light"
        active-name="1"
        style="height:100%;background-color:#f6f6f1;"
        @on-select="select"
      >
        <MenuGroup title="个人中心">
          <MenuItem name="1">
          <Icon type="md-document" />
          我的信息
          </MenuItem>
          <MenuItem name="2">
          <Icon type="md-chatbubbles" />
          我的订单
          </MenuItem>
          <MenuItem name="3">
          <Icon type="md-heart" />
          我的购物车
          </MenuItem>
          <!-- <MenuItem name="4">
          <Icon type="md-leaf" />
          充值
          </MenuItem> -->
        </MenuGroup>
      </Menu>
      <div class="menu_body">
        <Message v-show='showMessage'></Message>
        <!--  <Like v-show='showLike'></Like>
        <Publish v-show="showPublish"></Publish> -->
        <Cart v-show='showCart'></Cart>
        <Order v-show='showOrder'></Order>
      </div>
    </div>
  </div>
</template>

<script>
import head from '@/components/head.vue'
import message from '@/components/message.vue'
import cart from '@/components/cart.vue'
import order from '@/components/order.vue'
export default {
  components: {
    'Head': head,
    'Cart': cart,
    'Order': order,
    'Message': message
  },
  data () {
    return {
      showMessage: true,
      showCart: false,
      showOrder: false
    }
  },
  methods: {
    select (name) {
      // console.log(name)
      switch (name) {
        case '1':
          this.showMessage = true
          this.showCart = false
          this.showOrder = false
          break;
        case '3':
          this.showMessage = false
          this.showCart = true
          this.showOrder = false
          break;
        case '2':
          this.showMessage = false
          this.showCart = false
          this.showOrder = true
          break;
      }
    }
  },
  mounted () {
    // console.log(this.$route.params.name)
    this.select(this.$route.params.name)
  }

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
  margin: 10px;
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
  height: 200%;
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
.bd_title {
  font-size: 25px;
  font-weight: 800;
  position: relative;
  right: 40%;
  margin: 20px;
}
.menu_body {
  position: absolute;
  right: 0px;
  width: 70%;
  top: 0;
  /* background-color: aqua; */
}
</style>