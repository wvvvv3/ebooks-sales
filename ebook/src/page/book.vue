<template>
  <div class="bg">
    <!-- 置顶用户信息 -->
    <div class="header">

      <Head class="user_menu"></Head>
    </div>
    <div class="bg_body">
      <!-- 书籍基本信息展示模块 -->
      <div class="book_msg">
        <img
          :src=bookMsg.Pic
          alt=""
          class="book_msg_pic"
        >
        <div class="book_msg_title">
          <p style="font-size:22px;position:absolute;left:10px;top:10px;font-weight:600;">{{bookMsg.Name}}</p>
          <div class="book_msg_price">全本定价 {{bookMsg.Price}}</div>
          <div style="position:relative;top:50px;text-align: left;font-size:14px;">
            <p class="book_msg_title_p">作者 {{bookMsg.Writer}}</p>
            <p class="book_msg_title_p">类别 {{bookMsg.Category}}</p>
            <p class="book_msg_title_p">出版社 {{bookMsg.Publisher}}</p>
            <p class="book_msg_title_p">提供方 {{bookMsg.Publisher}}</p>
            <p class="book_msg_title_p">字数 {{bookMsg.Page}}</p>
            <p class="book_msg_title_p">ISBN {{bookMsg.Isbn}}</p>
          </div>
          <div style="position:absolute;right:70px;">
            <Button
              type="warning"
              style="width:90px;height:40px;font-size:14px;"
              @click="addcart"
            >加入购物车</Button>
            <Button
              type="error"
              style="width:90px;height:40px;margin-left:10px;font-size:14px;"
            >直接购买</Button></div>
        </div>
      </div>
      <!-- 作品简介模块 -->
      <div class="book_synopsis">
        <p style="font-size:20px;font-weight:600;margin:50px;text-align:left;">作品简介</p>
        <p style="margin:50px;text-align:left;font-size:14px;">{{bookMsg.Synopsis}}</p>
      </div>
      <!-- 书籍评论模块 -->
      <div class="book_comment">
        <p style="font-size:20px;font-weight:600;margin:50px;text-align:left;">评论</p>
        <div
          v-for="(item,index) in bookComment"
          :key="index"
        >
          <!-- 头像和用户名 -->
          <div style="height:50px;position:relative;">
            <img
              :src=item.user_img
              alt=""
              class="user_comment_img"
            >
            <p style="position:absolute;left:100px;font-size:14px;margin-left:20px;">{{item.user_name}}</p>
            <p style="display:inline-block;position:absolute;left:120px;top:25px;">{{item.comment_time}}</p>
            <Rate
              v-model="item.comment_grade"
              style="position:absolute; right:50px;"
            />
          </div>
          <!-- 评论内容 -->
          <div style="width:550px;position:relative;left:20%; text-align:left;margin-bottom:30px;">
            {{item.comment_content}}
          </div>

        </div>
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
      ebookId: this.$route.params.ebook_id,
      bookMsg: {},
      bookComment: []
    }
  },
  methods: {
    loadData () {
      // 根据书籍id获取书籍信息
      this.$http.get('/ebook/getmsg/', { params: { id: this.ebookId } }).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          this.bookMsg = resp.data
          this.bookMsg.Pic = "https://images.weserv.nl/?url=" + this.bookMsg.Pic
          // 根据书籍id获取书籍评论信息
          this.$http.get('/ebook/getcomment/', { params: { id: this.ebookId } }).then((resp) => {
            if (resp === null && resp.data === null) {
              this.$message({
                type: 'error',
                message: '服务端数据格式错误'
              })
              return
            } else {
              this.bookComment = resp.data
              for (var i = 0; i < this.bookComment.length; i++) {
                this.bookComment[i].user_img = "https://images.weserv.nl/?url=" + this.bookComment[i].user_img
              }
            }
          })

        }
      })
    },
    addcart () {
      var bookid = ''
      // 根据用户id获取用户购物车书籍id字符串
      this.$http.get('/ebook/getcart', { params: { id: localStorage.getItem("Uid") } }).then((resp) => {
        if (resp === null && resp.data === null) {
          this.$message({
            type: 'error',
            message: '服务端数据格式错误'
          })
          return
        } else {
          bookid = resp.data
          // 字符串拼接
          bookid = bookid + ',' + this.ebookId
          // 更新数据库用户购物车信息
          var config = {
            User_id: parseInt(localStorage.getItem("Uid")),
            Ebook_id: bookid
          }
          this.$http.post('/ebook/delcart/', config).then((resp) => {
            if (resp === null && resp.data === null) {
              this.$message({
                type: 'error',
                message: '服务端数据格式错误'
              })
              return
            }
          })
        }
      })
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
.book_msg {
  width: 100%;
  height: 300px;
  /* background-color: rgb(196, 228, 228); */
  margin-top: 50px;
  border-bottom: 1px dashed rgb(202, 196, 196);
}
.book_msg_pic {
  width: 180px;
  height: 240px;
  position: absolute;
  left: 50px;
}
.book_msg_title {
  width: 60%;
  height: 300px;
  position: absolute;
  left: 250px;

  /* background-color: rgb(202, 172, 230); */
}
.book_msg_title_p {
  position: relative;
  /* left: 10px; */
  display: block;
  margin: 10px;
}
.book_msg_price {
  position: absolute;
  right: 70px;
  width: 190px;
  height: 40px;
  border: 1px dashed rgb(160, 154, 122);
  line-height: 40px;
  top: 20px;
  color: rgb(88, 82, 61);
  font-size: 15px;
}
.book_synopsis {
  border-bottom: 1px dashed rgb(202, 196, 196);
}
.user_comment_img {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50px;
}
</style>