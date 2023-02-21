import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  //用于存储全局共享信息,在此处定义的状态数据全局组件可用
    // 当刷新时直接去sessionStorage中寻找user,如果存在则直接加载
    user:JSON.parse(sessionStorage.getItem('user')), // 在此处存储当前登录用户
    token: sessionStorage.getItem('t'), // 加载本地token字符串
    city:''
  },
    // 主要用于一些方法,提供修改state中的数据的功能
  mutations: {
    /** 更新保存token字符串 */
    updateToken(state, token){
      state.token = token
      sessionStorage.setItem('t', token)
    },
    /**
     * 更新state中的用户信息的方法,方法的定义有如下要求
     * 1.方法名自定义
     * 2.参数列表中包含两个参数:(state,payload)
     *   state:当前vuex中的state对象
     *   payload:用户传递的自定义参数
     */
    updateUserInfo(state,payload){
      // 将payload的数据直接赋值给state对象的user属性
      state.user = payload
      // 在此将user对象存入sessionStorage中一份
      sessionStorage.setItem('user',JSON.stringify(payload))
    },
    updateCity(state,payload){
      state.city = payload
    }
  },
  getters: {
  },
 
  actions: {
  },
  modules: {
  }
})
