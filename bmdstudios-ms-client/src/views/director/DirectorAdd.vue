<template>
    <div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导演管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增导演</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <!-- 行内表单 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width:500px">
            <el-form-item label="导演姓名" prop="directorName">
                <el-input clearable v-model="form.directorName"></el-input>
            </el-form-item>
            <el-form-item label="导演头像" prop="directorAvatar">
                <el-upload
                class="avatar-uploader"
                action="http://localhost:9000/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.directorAvatar" :src="form.directorAvatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">立即新增</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 分割线 -->
         <el-divider content-position="left">导演列表</el-divider>
    </div>
</template>

<script>
    import myaxios from '@/http/MyAxios'
    import httpApi from '@/http'
    export default {
        data() {
            return {
                form: {
                    directorName:'',   // 绑定演员名字
                    directorAvatar:''  // 绑定演员头像
                },
                // 设置检验条件
                rules:{
                    directorName:[
                        {required:'true',message:'必填项',trigger:'blur'}
                    ],
                    directorAvatar:[
                        {required:'true',message:'必填项',trigger:'blur'}
                    ],
                }
            }
        },
        methods: {
            //取消按钮(清空按钮)
            cancel(){
                this.$refs['form'].resetFields()
            },
            // 手动验证
            submit() {
                this.$refs['form'].validate(valid=>{
                    if(valid){
                        console.log('验证成功',this.form);
                        // 发送post请求,新增演员
                        httpApi.DirectorApi.add(this.form).then(res=>{
                            console.log('新增导演成功',res);
                            this.$message({
                                message:'添加成功!',
                                type:'success'
                            })
                            // 将表单重置
                            this.$refs['form'].resetFields()
                        })
                        /* let url = 'http://localhost:3010/movie-director/add'
                        myaxios.post(url,this.form).then(res=>{
                            console.log('新增导演成功',res);
                            this.$message({
                                message:'添加成功!',
                                type:'success'
                            })
                            // 将表单重置
                            this.$refs['form'].resetFields()
                        }) */
                    }else{
                        console.log('验证失败');
                    }
                })
            },
            // 处理上传成功后的业务
            handleAvatarSuccess(res, file) {
                console.log(res);
                // 将上传成功后的图片访问路径存入form对象
                this.form.directorAvatar = res.data
            },
            // 处理上传之前的格式大小的验证
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
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