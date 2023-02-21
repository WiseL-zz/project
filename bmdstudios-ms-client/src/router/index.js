import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home/index'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[{
      path:'index',
      name:'/home/index',
      component:()=>import('../views/Index.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['首页']
      }
    },{
      path:'actor-list',
      name:'/home/actor-list',
      component:()=>import('../views/actor/ActorList.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['演员管理','演员列表']
      }
    },{
      path:'actor-add',
      name:'/home/actor-add',
      component:()=>import('../views/actor/ActorAdd.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['演员管理','新增演员']
      }
    },{
      path:'director-list',
      name:'/home/director-list',
      component:()=>import('../views/director/DirectorList.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['导演管理','导演列表']
      }
    },{
      path:'director-add',
      name:'/home/director-add',
      component:()=>import('../views/director/DirectorAdd.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['导演管理','新增导演']
      }
    },{
      path:'movie-add',
      name:'/home/movie-add',
      component:()=>import('../views/movie/MovieAdd.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['电影管理','新增电影']
      }
    },{
      path:'movie-list',
      name:'/home/movie-list',
      component:()=>import('../views/movie/MovieList.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['电影管理','电影管理']
      }
    },{
      // 该路由末尾接收电影id参数
      path:'movie-update/:id', 
      name:'/home/movie-update',
      component:()=>import('../views/movie/MovieUpdate.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['电影管理','修改电影']
      }
    },{
      path:'cinema-add',
      name:'/home/cinema-add',
      component:()=>import('../views/cinema/CinemaAdd.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['影院管理','新增电影院']
      }
    },{
      path:'cinema-list',
      name:'/home/cinema-list',
      component:()=>import('../views/cinema/CinemaList.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['影院管理','新增电影院']
      }
    },{
      path:'cinema-room-list/:cinemaId',
      name:'/home/cinema-room-list',
      component:()=>import('../views/cinema/CinemaRoomList.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['影院管理','影院列表','放映厅列表']
      }
    },{
      path:'showingon-plan-add/:roomId',
      name:'/home/showingon-plan-add',
      component:()=>import('../views/cinema/ShowingonPlanAdd.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['影院管理','影院列表','放映厅列表','新增排片计划']
      }
    },{
      path:'showingon-plan-list/:roomId',
      name:'/home/showingon-plan-list',
      component:()=>import('../views/cinema/ShowingonPlanList.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['影院管理','影院列表','放映厅列表','排片计划列表']
      }
    },{
      path:'seat-template/:id',
      name:'/home/seat-template',
      component:()=>import('../views/cinema/CinemaRoomSeatTemplate.vue'),
      // meta称为路由对象的元数据,在此处可以自定义配置一些路由相关参数,方便再组件中使用
      meta:{
        // 再此自定义一个meta数据,保存当前路由应显示的面包屑导航列表
        breadcrumbs:['影院管理','影院列表','放映厅列表','配置座位模板']
      }
    }] 
  },
  {
    path: '/user/login',
    name: '/user/login',
    component: () => import('../views/user/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 注册全局的前置路由守卫,监控路由的跳转过程:当从A跳转到B之前执行
router.beforeEach((to,from,next)=>{
  // console.log(from);  //起点的路由对象
  // console.log(to);    // 目标路由对象
  // 判断当前是否跳转到登录页
  if(to.path == '/user/login'){
    next()
  }else{
    // 判断用户是否已经登陆,只有登录过的用户才可以跳转到其他页面否则强制跳转到登录页
    if(Store.state.user){
      next()
    }else{  // 否则未登录直接跳转到登陆页面
      next('/user/login')
    }
  }
  // next()              // 调用此方法才可以执行后续流程
})
export default router
