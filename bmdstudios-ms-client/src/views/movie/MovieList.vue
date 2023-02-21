<template>
    <div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
            <el-breadcrumb-item>电影列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <!-- 行内表单 -->
        <el-form :inline="true" @submit.native.prevent>
            <el-form-item label="电影名称">
                <el-input clearable v-model="name" @keyup.native.enter="search" placeholder="请输入电影名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 分割线 -->
         <el-divider content-position="left">电影列表</el-divider>
         <!-- 电影列表 -->
         <!-- :data="moviesData.result"  呈现列表 -->
         <el-table :data="moviesData.result">
            <el-table-column align="center" label="封面" width="100px">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" alt="" width="60px">
                </template>
            </el-table-column>
            <el-table-column align="center" label="标题" prop="title"></el-table-column>
            <el-table-column align="center" label="主演" width="240px" prop="star_actor"></el-table-column>
            <el-table-column align="center" label="上映时间" width="100px" prop="showingon"></el-table-column>
            <el-table-column align="center" label="时长" width="100px">
                <template slot-scope="scope">
                    {{scope.row.duration}}分钟
                </template>
            </el-table-column>
            <el-table-column align="center" label="电影类型" width="150px" prop="type"></el-table-column>
            <el-table-column align="center" label="操作" width="230px">
                <template slot-scope="scope">
                    <el-button size="small" type="info" icon="el-icon-user" circle></el-button>
                    <el-button size="small" type="success" icon="el-icon-picture-outline" circle></el-button>
                    <el-button size="small" type="warning" icon="el-icon-edit" @click="$router.push(`/home/movie-update/${scope.row.id}`)" circle></el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteItem(scope.row.id)" circle></el-button>
                </template>
            </el-table-column>
         </el-table>
         <!-- 分页器 -->
         <br>
         <el-pagination 
            background 
            layout="->, prev, pager, next, total" 
            :total="moviesData.total" 
            :page-size="moviesData.pagesize"
            @current-change = 'changeCurrentPage' 
            >
         </el-pagination>
    </div>
</template>

<script>
    import httpApi from '@/http'
    export default {
        data() {
            return {
                name: '',
                moviesData:{    // 存储电影列表相关信息
                    page:1,     // 当前页
                    pagesize:4, // 每页多少条
                    total:10,   // 总条目数
                    result:[]   // 具体电影列表
                }
            }
        },
        methods: {
            // 查询电影列表
            search() {
                if(this.name.trim() == ''){
                    this.movieList()
                }else{
                    this.movieListFuzzy()
                }
            },
            // 修改当前页: 当分页器当前页改变时执行
            changeCurrentPage(page){
                console.log(page);
                this.moviesData.page = page  // 修改当前页码后继续查询电影列表
                // this.movieList()
                this.search()   // 点击分页时模糊查询
            },
            // 电影列表
            movieList(){
                let params = {
                    page:this.moviesData.page,
                    pagesize:this.moviesData.pagesize
                    }
                httpApi.MovieApi.queryAllMovie(params).then(res=>{
                    console.log('加载电影列表',res);
                    this.moviesData = res.data.data
                })
            },
            // 通过名字模糊查询
            movieListFuzzy(){
                let params = {
                    name:this.name.trim(),
                    page:this.moviesData.page,
                    pagesize:this.moviesData.pagesize
                }
                httpApi.MovieApi.queryAllMovieFuzzy(params).then(res=>{
                    console.log(res);
                    this.moviesData = res.data.data
                })
            },
            // 删除电影列表项
            deleteItem(id){
                this.$confirm('此操作将永久删除该电影, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(res=>{
                    httpApi.MovieApi.delete({id}).then(res=>{
                        console.log('删除电影',res);
                        // 提示用户
                        this.$message({message:'删除操作完成',type:'success'})
                        // 重新加载
                        this.search()
                    })
                })
            }   
        },
        mounted(){
            this.movieList()
        }
    }
</script>

<style lang="scss" scoped>

</style>