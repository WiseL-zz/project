<template>
    <div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>演员管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增演员</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <!-- 行内表单 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width:500px">
            <el-form-item label="演员姓名" prop="actorName">
                <el-input clearable v-model="form.actorName"></el-input>
            </el-form-item>
            <el-form-item label="演员头像" prop="actorAvatar">
                <el-upload
                class="avatar-uploader"
                :action="`${UPLOADURL}/upload`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.actorAvatar" :src="form.actorAvatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">立即新增</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 分割线 -->
         <el-divider content-position="left">演员列表</el-divider>
    </div>
</template>

<script>
    import myaxios from '@/http/MyAxios'
    import httpApi from '@/http'
    export default {
        data() {
            return {
                form: {
                    actorName:'',   // 绑定演员名字
                    actorAvatar:''  // 绑定演员头像
                },
                // 设置检验条件
                rules:{
                    actorName:[
                        {required:'true',message:'必填项',trigger:'blur'}
                    ],
                    actorAvatar:[
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
                        httpApi.ActorApi.add(this.form).then(res=>{
                            console.log('新增演员成功',res);
                            this.$message({
                                message:'添加成功!',
                                type:'success'
                            })
                            // 将表单重置
                            this.$refs['form'].resetFields()
                        })
                       /*  let url = 'http://localhost:3010/movie-actor/add'
                        myaxios.post(url,this.form).then(res=>{
                            console.log('新增演员成功',res);
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
                this.form.actorAvatar = res.data
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