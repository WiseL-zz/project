<template>
    <div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>演员管理</el-breadcrumb-item>
            <el-breadcrumb-item>演员列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <!-- 行内表单 -->
        <!-- @submit.native.prevent 在内部回车时,需要阻止自动提交表单 -->
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
            <el-form-item label="姓名">
                <!--  @keyup.native.enter=""   绑定回车事件-->
                <el-input clearable v-model="user" @keyup.native.enter="listActorSearch" placeholder="请输入演员姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="listActorSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 分割线 -->
         <el-divider content-position="left">演员列表</el-divider>
         <!-- 演员列表 -->
         <!-- @delPerson=""  子组件中创建的事件类型(使用事件) -->
         <person @delPerson="delPerson(item.id)" v-for="item in actors" :key="item.id" :avatar="item.actor_avatar" :name="item.actor_name"></person>
    </div>
</template>

<script>
    import myaxios from '@/http/MyAxios'
    import httpApi from '@/http/index'
    import Person from '@/components/Person.vue'
    export default {
        data() {
            return {
                actors:[],  // 保存所有的演员列表
                user:''     // 双向数据绑定输入框
            }
        },
        methods: {
            delPerson(id){
                console.log('用户点击了,删除id:'+id);
                /* 
                    发送http请求,删除这个元素,必须得获取当前点击的演员的id
                */
               httpApi.ActorApi.delete({id}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({message:'恭喜你,删除成功',type:'success'})
                        this.listActorSearch()   //重新查询列表
                    }
               })
               /* let url = 'http://localhost:3010/movie-actor/del'
               myaxios.post(url,{id}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({message:'恭喜你,删除成功',type:'success'})
                        this.listActorSearch()   //重新查询列表
                    }
               }) */
            },
            // 呈现演员列表
            listActor() {
                /* let url = 'http://localhost:3010/movie-actors'
                myaxios.get(url,{page:1,pagesize:100}).then(res=>{
                    console.log('查询返回',res);
                    this.actors = res.data.data      // 存入actors中
                }) */
                httpApi.ActorApi.queryAllActors().then(res=>{
                    console.log('查询返回',res);
                    this.actors = res.data.data      // 存入actors中
                })
            },
            // 演员关键字查询
            listActorFuzzy(){
                /* let url = 'http://localhost:3010/movie-actors/name'
                myaxios.post(url,{name:this.user}).then(res=>{
                    console.log('模糊查询返回',res);
                    this.actors = res.data.data
                }) */
                httpApi.ActorApi.queryActorByNameLike({name:this.user}).then(res=>{
                    console.log('模糊查询返回',res);
                    this.actors = res.data.data
                })
            },
            // 输入为空的时候查询全部否则模糊查询
            listActorSearch(){
                if(this.user.trim() == ''){     // trim()  去除字符串两边的空白格
                    this.listActor()
                }else{
                    this.listActorFuzzy()
                }
            }
        },
        // 页面挂载完毕后,发送请求,加载列表数据
        mounted(){
            this.listActor()    // 加载演员列表
        },
        // 创建子组件
        components:{
            Person,
        }
    }
</script>

<style lang="scss" scoped>

</style>