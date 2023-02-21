<template>
    <div>
        <el-button type="primary" @click="dialogFormVisible=true">新增放映厅</el-button>
        <el-divider content-position="left">影院列表</el-divider>

        <el-table :data="rooms">
            <el-table-column label="放映厅名称" prop="room_name"></el-table-column>
            <el-table-column label="放映厅类型" prop="room_type"></el-table-column>
            <el-table-column width="170px" label="放映厅座位数">
                <template slot-scope="scope">
                    <span v-if="scope.row.room_size">
                        {{scope.row.room_size}}个座位
                    </span>
                    <span v-else>[暂无座位模板]</span>
                </template>
            </el-table-column>
            <el-table-column width="230px" label="操作">
                <template slot-scope="scope">
                <el-button @click="$router.push(`/home/showingon-plan-list/${scope.row.id}`)" size="small" type="primary"icon="el-icon-view" circle></el-button>
                <el-button @click="$router.push(`/home/showingon-plan-add/${scope.row.id}`)" size="small" type="success"icon="el-icon-plus" circle></el-button>
                <el-button @click="$router.push(`/home/seat-template/${scope.row.id}`)" size="small" type="warning"icon="el-icon-menu" circle></el-button>
                <el-button size="small" type="danger"icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 脱离了默认文档流的对话框组件 -->
        <el-dialog title="添加放映厅" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="margin-right:20px">
                <el-form-item label="放映厅名称" prop="room_name">
                <el-input v-model="form.room_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="放映厅的类型" prop="room_type">
                <el-select style="width:100%" v-model="form.room_type" placeholder="请选择放映厅类型">
                    <el-option v-for="items in types" :key="items.id" :value="items.type_name"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button 
                type="primary" 
                @click="onSubmit"
                
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import httpApi from '@/http'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form:{
                    room_name:'',
                    room_type:'',
                    movie_cinema_id:this.$route.params.cinemaId,    // 获得获得影院的ID
                },
                rules:{
                    room_name:[{required:true,message:'必填项',trigger:'blur'}],
                    room_type:[{required:true,message:'必填项',trigger:'change'}],
                    movie_cinema_id:[{required:true,message:'必填项',trigger:'blur'}],
                },
                types:[],    //描述放映厅类型
                rooms:[]    // 保存放映厅
            }
        },
        methods: {
            // 查询当前影院下的放映厅
            roomList(){
                httpApi.CinemaRoomApi.list({cinema_id:this.form.movie_cinema_id}).then(res=>{
                    console.log(res);
                    this.rooms = res.data.data
                })
            },
            // 提交按钮
            onSubmit(){
                this.$refs['form'].validate(valid=>{
                    if(valid){
                        console.log(this.form);
                        // 发送添加请求
                        httpApi.CinemaRoomApi.add(this.form).then(res=>{
                            if(res.data.code = 200){
                                this.$message({message:'添加放映厅成功!',type:'success'})
                            }
                            this.dialogFormVisible = false
                            // 重置表单
                            this.$refs['form'].resetFields()
                            // 重新加载列表
                            this.roomList()
                        })
                    }
                })
            }
        },
        mounted(){
            // 查询所有放映厅类型
            httpApi.CinemaRoomApi.queryAllTypes().then(res=>{
                console.log(res);
                this.types = res.data.data
            })
            // 加载放映厅列表
            this.roomList()
        }
    }
</script>

<style lang="scss" scoped>

</style>