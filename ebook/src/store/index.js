import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 设置属性
  state: {
    isLogin: false,
    userId: 0,
    userLevel:false,
    userManage:false
  },

  // 获取属性的状态
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
    // 获取用户登录id
    userId: state => state.userId,
    // 获取用户级别(二，三)
    userLevel: state => state.userLevel,
    // 获取用户级别（三）
    userManage: state => state.userManage,
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    userStatus (state, flag) {
      state.isLogin = flag
    },
    // 保存登录用户id
    setUserId (state, userId) {
      state.userId = userId
    }
  },

  // 应用mutations
  actions: {
    //获取登录状态
    userLogin ({ commit }, flag) {
      commit("userStatus", flag)
    },
  }
})