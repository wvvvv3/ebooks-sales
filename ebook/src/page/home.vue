<template>
  <div class="bg">
    <div class="header">

      <Head class="user_menu"></Head>
    </div>
    <!-- 标题和搜索 -->
    <div class="title">
      <!-- 豆瓣读书 -->
      <p style="font-size:25px;color:#4c3218;display: inline-block;float:left;line-height:80px;margin-left:50px;font-weight:900;">豆瓣读书</p>

      <Input
        search
        placeholder="书名、作者、ISBN"
        style="width:600px;margin:25px;position:absolute;left:200px;"
        v-model="searchitem"
        @on-search='search'
      />
      <!-- <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585031875773&di=48906390ab17ea57c1eaabd279269c5a&imgtype=0&src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F11862985.jpeg"
        style="width:60px;height:60px;position:absolute;right:50px;top:10px;"
        alt=""
      > -->

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
          @click="jumpToBook(index,'editorList')"
        >
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
          @click="jumpToList(index)"
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
      <!-- {{categoryList[0].p}} -->
      <!-- 分类 -->
      <div
        class="mid_body"
        v-for="(item,index) in categoryList"
        :key="index"
      >
        <p class="body_title">{{item.Category_name}}</p>
        <!-- {{item.ebookMsg[0].Name}} -->
        <div
          v-for="(items,indexs) in item.ebookMsg"
          :key="indexs"
          class="mid_body_book"
          @click="jumpToCategoryBook(index,indexs)"
        >
          <img
            :src=items.Pic
            alt=""
            class="body_pic"
          >
          <p
            align="left"
            class="body_name"
          >{{items.Name}}</p>

        </div>
      </div>
      <!-- 畅销书图书榜 -->
      <div class="right_body">
        <div class="body_title_height">
          <p class="body_title_right">畅销图书榜</p>
        </div>

        <div
          v-for="(item,indexs) in buyTimesList"
          :key="indexs"
          class="right_body_book"
          @click="jumpToBook(indexs,'buyTimesList')"
        >
          <p
            href=""
            style="color:#000;font-size:13px;cursor: pointer;"
          > {{indexs+1}}.{{item.name}}</p>

        </div>
      </div>
      <!-- 高分图书榜 -->
      <div class="right_body">
        <div class="body_title_height">
          <p class="body_title_right">高分图书榜</p>
        </div>
        <div
          v-for="(item,indexs) in gradeList"
          :key="indexs"
          class="right_body_book"
          @click="jumpToBook(indexs,'gradeList')"
        >
          <p
            href=""
            style="color:#000;font-size:13px;cursor: pointer;"
          >{{indexs+1}}.{{item.name}}</p>

        </div>
      </div>
      <!-- 分类 -->
      <div class="right_body">
        <div class="body_title_height">
          <p class="body_title_right">图书分类</p>
        </div>
        <div
          v-for="(item,indexs) in categoryList"
          :key="indexs"
          class="right_body_category"
        >
          <p class="right_body_font">{{item.Category_name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import head from '@/components/head.vue'
import Vue from 'vue'
export default {
  components: {
    'Head': head
  },
  data () {
    return {
      rotation_value: 0,
      list: [1, 1, 1, 1, 1],
      list2: [1, 1, 1, 1, 11, 1, 1, 1],
      visible: false,
      editorList: [],
      sdList: [],
      categoryList: [],
      categoryBookList: [],
      buyTimesList: [],
      gradeList: [],
      msgList: [],
      ebookMsgList: [],
      searchitem: ''
    }
  },
  methods: {
    loadData () {
      console.log(this.$store.getters.userId, 'xixi', this.$store.getters.isLogin)
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
          // console.log(this.categoryList)

          for (let i = 0; i < this.categoryList.length; i++) {
            let ebookIdList = this.categoryList[i].Ebook_id.split(",")
            // this.getData(0, ebookIdList.length, i, ebookIdList)
            this.$set(this.categoryList, i, Object.assign(this.categoryList[i], {
              ebookMsg: []
            }))
            for (let j = 0; j < ebookIdList.length; j++) {
              // 根据书籍id获取书籍信息
              this.$http.get('/ebook/getmsg/', { params: { id: ebookIdList[j] } }).then((resp) => {
                if (resp === null && resp.data === null) {
                  this.$message({
                    type: 'error',
                    message: '服务端数据格式错误'
                  })
                  return
                } else {
                  resp.data.Pic = "https://images.weserv.nl/?url=" + resp.data.Pic
                  this.categoryList[i].ebookMsg.push(resp.data)
                }
              })

            }

          }
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
          this.buyTimesList.sort(this.sortNumber)
          this.gradeList.sort(this.sortGrade)
          this.buyTimesList = this.buyTimesList.slice(0, 10)
          this.gradeList = this.gradeList.slice(0, 10)

        }
      })
    },

    sortNumber (a, b) {
      return b.buy_times - a.buy_times
    },
    sortGrade (a, b) {
      return b.grade - a.grade
    },
    // 跳转到书籍详情页面
    jumpToBook (index, item) {
      switch (item) {
        case 'editorList':
          // 小编推荐
          this.$router.push({ name: 'book', params: { ebook_id: this.editorList[index].Ebook_id } })
          break
        case 'buyTimesList':
          // 畅销图书榜
          this.$router.push({ name: 'book', params: { ebook_id: this.buyTimesList[index].id } })
          break
        case 'gradeList':
          //  高分图书榜
          this.$router.push({ name: 'book', params: { ebook_id: this.gradeList[index].id } })
          break

      }


    },
    jumpToCategoryBook (index, indexs) {
      this.$router.push({ name: 'book', params: { ebook_id: this.categoryList[index].ebookMsg[indexs].Id } })

    },
    // 跳转到书单显示页面
    jumpToList (index) {
      this.$router.push({ name: 'list', params: { list_id: this.sdList[index].Id } })
    },
    search () {
      console.log(this.searchitem)
      switch (this.searchitem) {
        case '想北平':
          this.$router.push({ name: 'book', params: { ebook_id: 2 } })
          break;
        case '101123':
          this.$router.push({ name: 'book', params: { ebook_id: 1 } })
          break;
      }
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
  height: 50px;
  position: relative;
  top: 0px;
  left: 0px;
  background-color: rgb(243, 235, 222);
  line-height: 50px;
}
.user_menu {
  position: absolute;
  right: 50px;
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
  cursor: pointer;
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
  text-align: center;
  line-height: 50px;
}
.right_body_category {
  position: relative;
  /* top: 60px; */
  height: 50px;
  border-bottom: 1px dashed rgb(238, 224, 201);
}
.body_title_right {
  font-size: 20px;
  color: #4c3218;
  /* float: left; */
  /* margin-top: 20px; */
  /* margin-left: 20px; */
  line-height: 60px;
  font-weight: 400;
}
</style>