<template>
    <div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导演管理</el-breadcrumb-item>
            <el-breadcrumb-item>导演列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <!-- 行内表单 -->
        <el-form :inline="true" @submit.native.prevent>
            <el-form-item label="姓名">
                <el-input clearable v-model="name" @keyup.native.enter="directorSearch" placeholder="请输入导演姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='directorSearch'>查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 分割线 -->
         <el-divider content-position="left">导演列表</el-divider>
         <!-- 引入子组件 -->
         <person @delPerson="delPerson(item.id)" v-for="item in directors" :key="item.id" :avatar="item.director_avatar" :name="item.director_name"></person>
    </div>
</template>

<script>
    import myaxios from '@/http/MyAxios'
    import Person from '@/components/Person.vue'
    import httpApi from '@/http'
    export default {
        data() {
            return {
                directors: [],  //保存所有的演员列表
                name:'' // 双向绑定输入框
            }
        },
        methods: {
            // 删除导演
            delPerson(id){
                httpApi.DirectorApi.delete({id}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({message:'恭喜你,删除成功',type:'success'})
                        this.directorSearch()   //重新查询列表
                    }
               })
                /* let url = 'http://localhost:3010/movie-director/del'
                myaxios.post(url,{id}).then(res=>{
                    if(res.data.code == 200){
                        this.$message({message:'恭喜你,删除成功',type:'success'})
                        this.directorSearch()   //重新查询列表
                    }
               }) */
            },
            // 请求演员列表
            directorList() {
                /* let url = 'http://localhost:3010/movie-directors'
                let param = {page:1,pagesize:100}
                myaxios.get(url,param).then(res=>{
                    // console.log(res);
                    this.directors = res.data.data
                }) */
                httpApi.DirectorApi.queryAllDirector().then(res=>{
                    // console.log(res);
                    this.directors = res.data.data
                })
            },
            // 请求模糊查询列表
            directorListFuzzy(){
                /* let url = 'http://localhost:3010/movie-directors/name'
                myaxios.post(url,{name:this.name}).then(res=>{
                    console.log(res);
                    this.directors = res.data.data
                }) */
                httpApi.DirectorApi.queryDirectorByNameLike({name:this.name}).then(res=>{
                    console.log(res);
                    this.directors = res.data.data
                }) 
            },
            // 如果输入框为空则查询全部
            directorSearch(){
                if(this.name.trim() == ''){
                    this.directorList()
                }else{
                    this.directorListFuzzy()
                }
            }
        },
        // 页面挂载完毕后,发送请求,加载列表数据
        mounted(){
            this.directorList() //加载演员列表
        },
        components:{ Person }
    }
</script>

<style lang="scss" scoped>

</style>