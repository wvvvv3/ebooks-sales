<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
        >

          <!-- <div class="layout-logo"> -->
          <i-button
            size="large"
            style="position:absolute;top:15px;left:10%;"
            @click="quit"
          >退出登录</i-button>
          <i-button
            size="large"
            style="position:absolute;top:15px;left:2%;"
            @click="jumptohome"
          >用户主页</i-button>
          <!-- </div> -->
          <div class="layout-nav">

          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{background: '#fff'}"
        >
          <Menu
            active-name="1-1"
            theme="light"
            width="auto"
            :open-names="['1']"
            @on-select="selectMenu"
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                用户管理
              </template>
              <MenuItem name="1-1">用户信息管理</MenuItem>
              <MenuItem name="1-2">订单管理</MenuItem>
            </Submenu>
            <Submenu
              name="2"
              v-show="showStaff"
            >
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                员工管理
              </template>
              <MenuItem name="2-1">员工信息管理</MenuItem>

            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                书单管理
              </template>
              <MenuItem name="3-1">书单信息管理</MenuItem>
            </Submenu>

            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-cog"></Icon>
                书籍管理
              </template>
              <MenuItem name="4-1">书籍信息管理</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <UserManage v-show="show[0]"></UserManage>
            <OrderManage v-show="show[1]"></OrderManage>
            <StaffManage v-show="show[2]"></StaffManage>
            <ListManage v-show="show[3]"></ListManage>
            <BookManage v-show="show[4]"></BookManage>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import usermanage from '@/components/usermanage.vue'
import ordermanage from '@/components/ordermanage.vue'
import staffmanage from '@/components/staffmanage.vue'
import listmanage from '@/components/listmanage.vue'
import bookmanage from '@/components/bookmanage.vue'

export default {
  components: {
    'UserManage': usermanage,
    'OrderManage': ordermanage,
    'StaffManage': staffmanage,
    'ListManage': listmanage,
    'BookManage': bookmanage
  },
  data () {
    return {
      show: [true, false, false, false, false],
      showStaff: false
    }
  },
  methods: {
    selectMenu (name) {
      switch (name) {
        case '1-1':
          var k = 0
          break;
        case '1-2':
          var k = 1
          break;
        case '2-1':
          var k = 2
          break;
        case '3-1':
          var k = 3
          break;
        case '4-1':
          var k = 4
          break;

      }
      for (var i = 0; i < this.show.length; i++) {
        if (i === k) {
          this.$set(this.show, i, true)
        } else {
          this.$set(this.show, i, false)
        }
      }
    },
    quit () {
      this.$store.dispatch("userLogin", false);
      localStorage.removeItem("Flag")
      localStorage.removeItem("Uid")
      localStorage.removeItem("Ulevel")
      this.$store.state.userId = 0
      this.$router.push("/login");
    },
    jumptohome () {
      this.$router.push("/");
    },
    loadData () {
      var k = localStorage.getItem("Ulevel")
      if (parseInt(k) === 3) {
        this.showStaff = true
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style  scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  /* background: #5b6270; */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>