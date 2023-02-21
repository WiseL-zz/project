// 导出一个对象,该对象拥有get与post方法用于发送相应类型的请求
import axios from "axios"
import qs from "qs"
import store from '../store'
const instance = axios.create()

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么,为config配置authorization消息头
    let token = store.state.token // token 字符串
    if(token){
        config.headers.authorization = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });



const myAxios = {
    /**
     * 用于发送get请求
     * @param {string} url 请求路径
     * @param {object} params 请求参数对象 {参数名:参数值}
     */
    get(url,params){
        return instance({
            url,
            method:'GET',
            params
        })
    },
    /**
     * 
     * @param {*} url 请求路径
     * @param {*} data 请求参数对象 {参数名:参数值}
     */
    post(url,data){
        return instance({
            url,
            method:'POST',
            data:qs.stringify(data)
        })
    }
}

export default myAxios