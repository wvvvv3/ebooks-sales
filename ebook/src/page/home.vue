<template>
  <div class="bg">
    <div class="header">
      <div class="user_menu">

        <!-- 购物车 -->
        <Icon
          type="ios-cart"
          style="font-size:25px;margin-left:10px;"
        />
        <!-- 书架 -->
        <Icon
          type="ios-book-outline"
          style="font-size:25px;margin-left:10px;"
        />
        <!-- 用户 -->
        <Dropdown>
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
            <DropdownItem class="user_DropdownItem">个人信息</DropdownItem>
            <DropdownItem class="user_DropdownItem">我的订单</DropdownItem>
            <DropdownItem class="user_DropdownItem">我的书架</DropdownItem>
            <DropdownItem class="user_DropdownItem">我的购物车</DropdownItem>
            <DropdownItem class="user_DropdownItem">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <!-- 标题和搜索 -->
    <div class="title">
      <!-- 豆瓣读书 -->
      <p style="font-size:25px;color:#4c3218;display: inline-block;float:left;line-height:80px;margin-left:50px;font-weight:900;">豆瓣读书</p>
      <Input
        search
        placeholder="书名、作者、ISBN"
        style="width:600px;margin:25px;position:absolute;left:200px;"
      />
    </div>
    <div class="all_body">
      <!-- 轮播图 -->
      <div class="rotation_pic">
        <!-- 轮播图 -->
        <Carousel
          autoplay
          v-model="rotation_value"
          loop
        >
          <CarouselItem>
            <div class="demo-carousel">
              <img
                src="../../src/assets/1.jpg"
                alt=""
                class="rotation_img"
              ></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"> <img
                src="../../src/assets/2.jpg"
                alt=""
                class="rotation_img"
              ></div>
          </CarouselItem>

        </Carousel>
      </div>
      <!-- 小编推荐 -->
      <div class="mid_body">
        <p class="body_title">小编推荐</p>
        <div
          v-for="(item,index) in editorList"
          :key="index"
          class="mid_body_book"
        >
          <!-- {{item}} -->
          <img
            :src=item.Pic
            alt=""
            class="body_pic"
          >
          <p
            align="left"
            class="body_name"
          >{{item.Name}}</p>
        </div>
      </div>
      <!-- 书单 -->
      <div class="mid_body">
        <p class="body_title">书单推荐</p>
        <div
          v-for="(item,index) in sdList"
          :key="index"
          class="mid_body_book"
        >
          <img
            :src=item.List_pic
            alt=""
            class="body_pic"
          >
          <p
            align="left"
            class="body_name"
          >{{item.List_name}}</p>
        </div>
      </div>
      <!-- 分类 -->
      <div class="mid_body">
        <p class="body_title">书籍分类</p>
        <div
          v-for="(item,index) in list"
          :key="index"
          class="mid_body_book"
        >

        </div>
      </div>
      <!-- 畅销书图书榜 -->
      <div class="right_body">
        <div class="body_title_height">
          <p class="body_title">畅销图书榜</p>
        </div>

        <div
          v-for="(item,indexs) in buyTimesList"
          :key="indexs"
          class="right_body_book"
        >
          {{indexs+1}}.<a
            href=""
            style="color:#000;font-size:13px;"
          >{{item.name}}</a>

        </div>
      </div>
      <!-- 高分图书榜 -->
      <div class="right_body">
        <div class="body_title_height">
          <p class="body_title">高分图书榜</p>
        </div>
        <div
          v-for="(item,indexs) in gradeList"
          :key="indexs"
          class="right_body_book"
        >
          {{indexs+1}}.<a
            href=""
            style="color:#000;font-size:13px;"
          >{{item.name}}</a>

        </div>
      </div>
      <!-- 分类 -->
      <div class="right_body">
        <div class="body_title_height">
          <p class="body_title">图书分类</p>
        </div>
        <div
          v-for="(item,indexs) in categoryList"
          :key="indexs"
          class="right_body_book"
        >
          <p class="right_body_font">{{item.Category_name}}</p>
          <!-- <a href="">item</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rotation_value: 0,
      list: [1, 1, 1, 1, 1],
      list2: [1, 1, 1, 1, 11, 1, 1, 1],
      visible: false,
      editorList: [],
      sdList: [],
      categoryList: [],
      buyTimesList: [],
      gradeList: [],
      msgList: []
    }
  },
  methods: {
    loadData () {
      // 获取小编推荐书籍封面
      this.$http.get('/ebook/editors').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.editorList = resp.data
          for (var i = 0; i < this.editorList.length; i++) {
            this.editorList[i].Pic = "https://images.weserv.nl/?url=" + this.editorList[i].Pic
          }
        }
      })

      // 获取书单推荐书籍
      this.$http.get('/ebook/list').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.sdList = resp.data
          for (var i = 0; i < this.sdList.length; i++) {
            this.sdList[i].List_pic = "https://images.weserv.nl/?url=" + this.sdList[i].List_pic
          }
        }
      })

      // 获取书籍类别
      this.$http.get('/ebook/category').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.categoryList = resp.data
          // for (var i = 0; i < this.categoryList.length; i++) {
          // this.categoryList[i].List_pic = "https://images.weserv.nl/?url=" + this.categoryList[i].List_pic
          // }
        }
      })

      // 获取书籍信息
      this.$http.get('/ebook/msg').then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.msgList = resp.data
          for (var i = 0; i < this.msgList.length; i++) {
            // this.sdList[i].List_pic = "https://images.weserv.nl/?url=" + this.sdList[i].List_pic

            this.buyTimesList.push({
              id: this.msgList[i].Id,
              isbn: this.msgList[i].Isbn,
              name: this.msgList[i].Name,
              buy_times: this.msgList[i].Buy_times
            })
            this.gradeList.push({
              id: this.msgList[i].Id,
              isbn: this.msgList[i].Isbn,
              name: this.msgList[i].Name,
              grade: this.msgList[i].Grade
            })
          }

          // for(var j=0;j<this.buyTimesList.length;j++){

          // }
          this.buyTimesList.sort(this.sortNumber)
          this.gradeList.sort(this.sortGrade)
          console.log(this.buyTimesList, this.gradeList)
        }
      })
    },
    sortNumber (a, b) {//升序
      return b.buy_times - a.buy_times
    },
    sortGrade (a, b) {//升序
      return b.grade - a.grade
    }
  },
  mounted () {
    this.loadData()
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

.header {
  width: 100%;
  height: 30px;
  position: relative;
  /* top: 0; */
  /* position: fixed; */
  top: 0px;
  left: 0px;
  background-color: rgb(243, 235, 222);
}
.title {
  width: 100%;
  height: 80px;
  position: relative;
  /* top: 30px; */
  background-color: #f6f6f1;
}
.all_body {
  box-sizing: border-box;
  /*采用bfc清除浮动*/
  overflow: hidden;
}
.rotation_pic {
  width: 70%;
  height: 250px;
  /* background-color: gold; */
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  float: left;
}
.rotation_img {
  width: 100%;
  height: 250px;
}
.mid_body {
  width: 70%;
  height: 300px;
  background-color: #f6f6f1;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  float: left;
  border-radius: 15px;
  /* border: 1px dashed rgb(201, 201, 194); */
}
.right_body {
  width: 17%;
  height: 600px;
  background-color: #f6f6f1;
  /* background-color: rgb(49, 80, 37); */
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  /* border: 1px dashed rgb(201, 201, 194); */
}
.mid_body_book {
  width: 140px;
  height: 220px;
  /* background-color: rgb(196, 204, 193); */
  display: inline-block;
  margin: 0px 20px 0px 20px;
  position: relative;
  top: 60px;
  left: -70px;
  /* margin: 20px; */
  /* overflow: hidden; */
}
.body_title {
  font-size: 20px;
  color: #4c3218;
  float: left;
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 400;
  /* width: 00px; */
  /* display: block; */
}
.right_body_book {
  position: relative;
  /* top: 60px; */
  height: 50px;
  border-bottom: 1px dashed rgb(238, 224, 201);
  line-height: 50px;
  text-align: left;
  padding-left: 20px;
}
.body_title_height {
  width: 250px;
  height: 60px;
}
.user_menu {
  /* float: right; */
  position: absolute;
  right: 50px;
}
.user_DropdownItem {
  height: 30px;
  line-height: 30px;
}
.body_pic {
  width: 140px;
  height: 190px;
}
.body_name {
  font-size: 15px;
  position: relative;
  /* top: -5px; */
  font-weight: 400;
}
.right_body_font {
  font-size: 15px;
}
</style>