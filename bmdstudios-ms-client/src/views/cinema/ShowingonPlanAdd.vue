<template>
    <div>
        <!-- 新增排片计划页面 -->
        为
        <b style="color:#409eff">{{cinemaRoom.cinema_name}}</b>
        的
        <b style="color:#409eff">{{cinemaRoom.cinema_room_name}} ({{cinemaRoom.cinema_room_type}})</b>
        的新增排片计划
        <!-- 分割线 -->
        <el-divider></el-divider>
        <el-form 
      style="width: 600px;"
      :model="form" :rules="rules" 
      ref="form" label-width="130px" class="demo-form">
      <el-form-item label="选择电影" prop="movie_id">
        <el-select 
          ref="select"
          style="width: 100%"
          filterable
          remote
          reserve-keyword
          v-model="form.movie_id" placeholder="请选择电影"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option v-for="items in options" :key="items.id" :label="items.title" :value="items.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开播时间" required>
        <el-col :span="11">
          <el-form-item prop="showingon_date">
            <el-date-picker
            value-format="yyyy-MM-dd"
             type="date" placeholder="选择日期" 
              v-model="form.showingon_date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col style="text-align:center;" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="showingon_time">
            <el-time-picker
             value-format="HH:mm"
             placeholder="选择场次" 
              v-model="form.showingon_time" style="width: 100%;"
              :picker-options="{ selectableRange: '06:00:00 - 23:59:59',format:'HH:mm'}"
              ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="票价" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="是否立即发布" prop="status">
        <el-switch
         active-value="1"
         inactive-value="0"
         v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即新增排片计划</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import httpApi from '@/http'
    export default {
        data() {
            return {
                form: {
                    cinema_id: '',
                    cinema_room_id: this.$route.params.roomId,
                    movie_id: '',
                    showingon_date: '',
                    showingon_time: '',
                    status: '',
                    price: ''
                },
                rules:{
                    movie_id:[{required:true,message:'必填项',trigger:'blur'}],
                    price:[{required:true,message:'必填项',trigger:'blur'}],
                    cinema_id:[{required:true,message:'必填项',trigger:'change'}],
                    cinema_room_id:[{required:true,message:'必填项',trigger:'blur'}],
                    showingon_time:[{required:true,message:'必填项',trigger:'blur'}],
                    showingon_date:[{required:true,message:'必填项',trigger:'blur'}],
                    status:[{required:true,message:'必填项',trigger:'blur'}],
                    price:[{required:true,message:'必填项',trigger:'blur'}],
                },
                cinemaRoom:{},  // 存储当前选中的放映厅对象 
                loading:false, // 表示电影是否正在模糊查询过程中
                options:[], // 存储所有的选项
            }
        },
        methods: {
            // 
            remoteMethod(query){
                this.loading = true
                if(query.trim() != ''){
                    // 发送请求,加载相关电影推荐列表
                    let params = {name:query,page:1,pagesize:10}
                    httpApi.MovieApi.queryAllMovieFuzzy(params).then(res=>{
                        console.log('模糊查询电影相关列表',res);
                        this.loading = false
                        this.options = res.data.data.result
                    })

                }
            },
            // 提交表单
            submitForm(){
                console.log(this.$refs.select);
                this.$refs['form'].validate(valid=>{
                    if(valid){  //验证通过,添加操作
                        httpApi.ShowingonPlanApi.add(this.form).then(res=>{
                            console.log('新增排片计划',res);
                            if(res.data.code == 200){
                                // 提示成功
                                // 获取电影名字(获取输入框的值,使用$refs的方法)
                                let movieName = this.$refs['select']._data.selectedLabel
                                this.$notify({
                                    title:'成功',
                                    message: `<div>上映电影:${movieName}</div>
                                              <div>场次时间:${this.form.showingon_date} - ${this.form.showingon_time}</div>
                                            `,
                                    dangerouslyUseHTMLString: true, // 设置支持html标签
                                    type: 'success',
                                    duration:5000,
                                });
                                // 重置表单
                                this.$refs['form'].resetFields()
                            }
                        })
                    }
                })
            },
            // 加载放映厅的基本信息
            loadRoomInfo() {
                httpApi.CinemaRoomApi.queryById({id:this.form.cinema_room_id}).then(res=>{
                    console.log(res);
                    this.cinemaRoom = res.data.data
                    // 为新增排片计划 的表单项:cinema_id赋值
                    this.form.cinema_id = this.cinemaRoom.cinema_id
                })
            }
        },
        mounted(){
            // 加载放映厅的基本信息
            this.loadRoomInfo()
        }
    }
</script>

<style lang="scss" scoped>

</style>