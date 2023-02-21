import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 读取上传文件的基础路径前缀，保存为vue全局变量

// 定义一个全局变量    Vue.prototype.变量名 = 变量值
import URLENV from '@/http/BaseUrl'
Vue.prototype.UPLOADURL = URLENV.UPLOADURL
// 由于整个项目有且只有一个vue对象，所以上述绑定的 UPLOADURL 可以在组件内部直接使用



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
