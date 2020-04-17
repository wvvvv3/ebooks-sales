<template>
  <div class="bg">
    <!-- 置顶用户信息 -->
    <div class="header">

      <Head class="user_menu"></Head>
    </div>
    <div class="bg_body">

      <div
        class="list_body"
        v-for="(item,index) in bookList"
        :key="index"
      >
        <img
          :src=item.Pic
          alt=""
          class="list_pic"
          @click="jumpToBook(index)"
        >
        <p
          class="list_name"
          @click="jumpToBook(index)"
        >{{item.Name}}</p>
        <p class="list_write">{{item.Writer}}</p>
        <div class="list_sy">
          <p class="list_sy_p">{{item.Synopsis}}</p>
        </div>
        <Rate
          v-model="item.Grade"
          class="list_grade"
        />
      </div>
    </div>
  </div>
</template>

<script>
import head from '@/components/head.vue'
export default {
  components: {
    'Head': head
  },
  data () {
    return {
      listId: this.$route.params.list_id,
      sdList: [],
      bookList: []
    }
  },
  methods: {
    loadData () {
      // 根据书单id获取书籍信息
      this.$http.get('/ebook/getlist/', { params: { id: this.listId } }).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {

          this.sdList = []
          this.sdList.push(resp.data)

          var bookId = this.sdList[0].Ebook_id.split(",")

          this.bookList = []
          for (var i = 0; i < bookId.length; i++) {
            // 根据书籍id获取书籍信息
            this.$http.get('/ebook/getmsg/', { params: { id: bookId[i] } }).then((resp) => {
              if (resp === null && resp.data === null) {
                this.$message({
                  type: 'error',
                  message: '服务端数据格式错误'
                })
                return
              } else {
                resp.data.Pic = "https://images.weserv.nl/?url=" + resp.data.Pic
                this.bookList.push(resp.data)
              }
            })


          }

        }
      })
    },
    jumpToBook (index) {
      this.$router.push({ name: 'book', params: { ebook_id: this.bookList[index].Id } })
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
.list_body {
  width: 100%;
  height: 220px;
  /* background-color: hotpink; */
}
.list_pic {
  width: 140px;
  height: 180px;
  position: absolute;
  left: 30px;
  cursor: pointer;
}
.list_name {
  position: absolute;
  left: 200px;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
}
.list_write {
  position: absolute;
  /* left: -220px; */
  /* top: 40px; */
  left: 200px;
  margin-top: 50px;
  font-size: 15px;
}
.list_sy {
  width: 70%;
  height: 180px;
  text-align: left;
  position: absolute;
  left: 200px;
  /* top: 20px; */
  margin-top: 80px;
}
.list_sy_p {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.list_grade {
  position: absolute;
  right: 80px;
}
</style>