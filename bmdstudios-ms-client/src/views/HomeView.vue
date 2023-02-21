<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside class="aside" :style="{width:`${isCollapse?65:240}px`, transition: '0.4s'}">
        <el-menu
          router 
          default-active="$route.path"
          background-color="#345"
          text-color="#bbb"
          :style="{height: '100vh'}"
          :collapse="isCollapse"
          class="el-menu-vertical-demo">
          <el-menu-item>
            <img width="30px" src="../assets/logo.svg" alt="">
            <template slot="title">
              <span style="font-size: 1.2em; color:#efefef; font-weight: bold;">&nbsp;&nbsp;百慕大影城后台管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="index">
            <i class="el-icon-message"></i>
            <template slot="title">
              首页
            </template>
          </el-menu-item>
          <!-- 演员管理 -->
          <el-submenu index="actor">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">演员管理</span>
            </template>
            <el-menu-item index="/home/actor-list">
              <i class="el-icon-menu"></i>
              <span slot="title">演员列表</span>
            </el-menu-item>
            <el-menu-item index="/home/actor-add">
              <i class="el-icon-menu"></i>
              <span slot="title">新增演员</span>
            </el-menu-item>
          </el-submenu>
          <!-- 导演管理 -->
          <el-submenu index="director">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">导演管理</span>
            </template>
            <el-menu-item index="/home/director-list">
              <i class="el-icon-menu"></i>
              <span slot="title">导演列表</span>
            </el-menu-item>
            <el-menu-item index="/home/director-add">
              <i class="el-icon-menu"></i>
              <span slot="title">新增导演</span>
            </el-menu-item>
          </el-submenu>
          <!-- 电影管理 -->
          <el-submenu index="movie">
            <template slot="title">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">电影管理</span>
            </template>
            <el-menu-item index="/home/movie-list">
              <i class="el-icon-menu"></i>
              <span slot="title">电影列表</span>
            </el-menu-item>
            <el-menu-item index="/home/movie-add">
              <i class="el-icon-menu"></i>
              <span slot="title">新增电影</span>
            </el-menu-item>
          </el-submenu>
          <!-- 影院管理 -->
          <el-submenu index="cinema">
            <template slot="title">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">影院管理</span>
            </template>
            <el-menu-item index="/home/cinema-list">
              <i class="el-icon-menu"></i>
              <span slot="title">影院列表</span>
            </el-menu-item>
            <el-menu-item index="/home/cinema-add">
              <i class="el-icon-menu"></i>
              <span slot="title">新增电影院</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <i v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true"></i>
          <i v-show="isCollapse" class="el-icon-s-unfold" @click="isCollapse=false"></i>
          <!-- 面包屑 : 根据当前路由所在的位置,自动生成面包屑导航-->
          <el-breadcrumb style="flex:1; margin-left:20px" separator-class="el-icon-arrow-right">
              <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
              <el-breadcrumb-item v-for="item in $route.meta.breadcrumbs" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
          <span>
            <div v-if="user">

            <!-- {{$store.state.user.nickname}} -->
            {{user.nickname}}
            </div>
          </span>
        </el-header>

        <el-main>
          <!-- 二级路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  computed:{
    /* user(){ //该计算属性直接返回state对象中的user对象
      return this.$store.state.user
    } */
    // 使用mapState将user对象导出
    ...mapState(['user'])
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  i {
    font-size: 1.3em;
  }
}
.aside::-webkit-scrollbar {
  display: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
</style>
