<template>
    <div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
            <el-breadcrumb-item>电影列表</el-breadcrumb-item>
            <el-breadcrumb-item>修改电影</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <!-- 修改电影表单 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="100px"  style="width:500px">
            <el-form-item label="封面图片" prop="cover">
                <el-upload
                class="avatar-uploader"
                :action="`${UPLOADURL}/upload`"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload">
                <img v-if="form.cover" :src="form.cover" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="电影类别">
                <el-radio v-model="form.category_id" label="1">热映</el-radio>
                <el-radio v-model="form.category_id" label="2">待映</el-radio>
                <el-radio v-model="form.category_id" label="3">经典</el-radio>
            </el-form-item>
             <el-form-item label="电影名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入电影名称"></el-input>
            </el-form-item>
            <el-form-item label="电影类型" prop="type">
                <el-select  style="width:100%" v-model="form.type" multiple placeholder="请选择电影类型">
                    <el-option 
                    v-for="items in movieTypes" :key="items.id" 
                    :value="items.typename">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电影主演" prop="star_actor">
                <el-select
                    style="width:100%"
                    v-model="form.star_actor"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入主演名称"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    >
                    <el-option
                    v-for="item in actors"
                    :key="item.id"
                    :value="item.actor_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上映时间" prop="showingon" >
                <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.showingon"
                type="date"
                placeholder="选择日期"
                style="width:400px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="电影评分" prop="score">
                <el-input v-model="form.score" placeholder="请输入电影评分"></el-input>
            </el-form-item>
            <el-form-item label="电影时长" prop="duration">
                <el-input v-model="form.duration" placeholder="请输入电影时长"></el-input>
            </el-form-item>
            <el-form-item label="电影简介" prop="description">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.description">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import httpApi from '@/http';
    export default {
        data() {
            return {
                form: {
                    category_id:'1',
                    cover:'',
                    title:'',
                    type:[],
                    star_actor:[],
                    showingon:'',
                    score:'',
                    description:'',
                    duration:''
                },
                rules:{
                    cover: [{required:true, message:'必填项', trigger: 'blur'}],
                    title: [{required:true, message:'必填项', trigger: 'blur'}],
                    type: [{required:true, message:'必填项', trigger: 'change'}],
                    star_actor: [{required:true, message:'必填项', trigger: 'change'}],
                    showingon: [{required:true, message:'必填项', trigger: 'blur'}],
                    score: [{required:true, message:'必填项', trigger: 'blur'}],
                    description: [{required:true, message:'必填项', trigger: 'blur'}],
                    duration: [{required:true, message:'必填项', trigger: 'blur'}],
                },
                movieTypes:[],  //存储所有的电影类型
                loading:false,   // 描述当前列表是否正在加载中
                actors:[],  // 存储模糊查询演员列表的结果
            }
        },
        methods: {
            // 提交表单
            onSubmit(){
                this.$refs['form'].validate(valid=>{
                    if(valid){
                        // 将主演和类型使用中文斜杠,将数组元素拼接为字符串
                        this.form.star_actor = this.form.star_actor.join('／')
                        this.form.type = this.form.type.join('／')
                        console.log(this.form);
                        // 发送请求,提交数据
                        httpApi.MovieApi.update(this.form).then(res=>{
                            // console.log('新增电影成功',res);
                            if(res.data.code == 200){
                                this.$message({
                                    message:'恭喜您,电影修改成功!',
                                    type:'success'
                                 })
                            }
                                // 跳转到电影列表页 /home/movie-list
                                this.$router.push('/home/movie-list')
                        })
                    }
                })
            },
            // 用于异步加载演员名称(通过姓名关键字),加载结构后显示在列表项之中
            remoteMethod(query){
                this.loading = true;    // 数据正在加载中
                // 发送请求,加载演远
                httpApi.ActorApi.queryActorByNameLike({name:query}).then(res=>{
                    this.loading = false // 加载完毕
                    console.log('模糊查询',res);
                    // 将数据存入data
                    this.actors = res.data.data
                    

                })
            },
            // 处理上传成功后的业务
            uploadSuccess(res, file) {
                console.log(res);
                // 将上传成功后的图片访问路径存入form对象
                this.form.cover = res.data
            },
            // 处理上传之前的格式大小的验证
            beforeUpload(file) {
                const isJPG = 
                file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        // 生命周期,挂载完毕后执行
        mounted(){
            // 获取参数id,加载当前选中的电影的电影详细信息(发送请求)
            let id = this.$route.params.id  // 获取电影ID
            console.log(id);
            httpApi.MovieApi.queryById({id}).then(res=>{
                console.log('通过ID查询电影详情数据',res);
                this.form = res.data.data
                // 整理数据字段
                this.form.category_id = this.form.category_id+""
                this.form.star_actor = this.form.star_actor.split('／')
                this.form.type = this.form.type.split('／')
            })
            // 请求电影类型(在mounted中发送请求,加载所有电影类型组成的列表)
            httpApi.MovieApi.queryAllMovieType().then(res=>{
                console.log('加载所有电影类型',res);
                this.movieTypes = res.data.data
            })
        }
    }
</script>

<style lang="scss" scoped></style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    display: block;
  }
</style>