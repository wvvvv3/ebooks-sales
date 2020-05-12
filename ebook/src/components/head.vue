<template>

  <div class="user_menu">
    <Icon
      type="md-home"
      style="font-size:25px;margin-left:10px;cursor: pointer;"
      @click="jumpToHome"
    />
    <!-- 购物车 -->
    <Icon
      type="ios-cart"
      style="font-size:25px;margin-left:10px;cursor: pointer;"
      @click="jumpToCart"
    />
    <!-- 书架 -->
    <!-- <Icon
      type="ios-book-outline"
      style="font-size:25px;margin-left:10px;cursor: pointer;"
    /> -->
    <!-- 用户 -->
    <Dropdown @on-click="clickMenu">
      <a
        href="javascript:void(0)"
        style="color:#000;"
      >
        <Icon
          type="md-contact"
          style="font-size:25px;margin-left:10px;"
        />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem
          name="message"
          class="user_DropdownItem"
        >个人信息</DropdownItem>
        <DropdownItem
          name="order"
          class="user_DropdownItem"
        >我的订单</DropdownItem>
        <!-- <DropdownItem
          name="shelf"
          class="user_DropdownItem"
        >我的书架</DropdownItem> -->
        <DropdownItem
          name="cart"
          class="user_DropdownItem"
        >我的购物车</DropdownItem>
        <DropdownItem
          name="quit"
          class="user_DropdownItem"
        >退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    jumpToCart () {
      this.$router.push({ name: 'user', params: { name: '3' } })
    },
    // 点击下拉菜单
    clickMenu (name) {
      // 点击退出登录
      switch (name) {
        case 'quit':
          this.$store.dispatch("userLogin", false);
          localStorage.removeItem("Flag")
          localStorage.removeItem("Uid")
          localStorage.removeItem("Ulevel")
          this.$store.state.userId = 0
          this.$router.push("/login");
          break;
        case 'message':
          this.$router.push({ name: 'user', params: { name: '1' } })
          break;
        case 'cart':
          this.$router.push({ name: 'user', params: { name: '3' } })
          break;
        case 'order':
          this.$router.push({ name: 'user', params: { name: '2' } })
          break;
        default:
          break;
      }


    },
    jumpToHome () {
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
</style>