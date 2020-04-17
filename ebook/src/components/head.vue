<template>

  <div class="user_menu">

    <!-- 购物车 -->
    <Icon
      type="ios-cart"
      style="font-size:25px;margin-left:10px;cursor: pointer;"
      @click="jumpToCart"
    />
    <!-- 书架 -->
    <Icon
      type="ios-book-outline"
      style="font-size:25px;margin-left:10px;cursor: pointer;"
    />
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
        <DropdownItem
          name="shelf"
          class="user_DropdownItem"
        >我的书架</DropdownItem>
        <DropdownItem
          name="chart"
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
      this.$router.push({ path: '/cart' })
    },
    // 点击下拉菜单
    clickMenu (name) {
      // 点击退出登录
      if (name === 'quit') {
        this.$store.dispatch("userLogin", false);
        localStorage.removeItem("Flag")
        localStorage.removeItem("Uid")
        this.$store.state.userId = 0
        this.$router.push("/login");
        // console.log(this.$store.getters.userId, '退出登录', this.$store.getters.isLogin)
      } w
    }
  }
}
</script>

<style scoped>
</style>