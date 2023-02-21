<template>
    <div>
        <!-- 新增排片计划页面 -->
        为
        <b style="color:#409eff">{{cinemaRoom.cinema_name}}</b>
        的
        <b style="color:#409eff">{{cinemaRoom.cinema_room_name}} ({{cinemaRoom.cinema_room_type}})</b>
        的排片计划列表
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 表格 -->
        <el-table :data="plans">
            <el-table-column align="center" label="电影名称" prop="title"></el-table-column>
            <el-table-column align="center" label="上映时间" prop="showingon_date"></el-table-column>
            <el-table-column align="center" label="场次" prop="showingon_time"></el-table-column>
            <el-table-column align="center" label="票价">
                <template slot-scope="scope">
                    ￥{{scope.row.price}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否发布">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <el-button circle icon="el-icon-delete" type="danger" size="small"></el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import httpApi from '@/http'
    export default {
        data() {
            return {
                roomId: this.$route.params.roomId,
                cinemaRoom:{},  // 存储当前选中的放映厅对象 
                plans:[],   // 存储当前放映厅的排片计划表
            }
        },
        methods: {
            // 加载放映厅的基本信息
            loadRoomInfo() {
                httpApi.CinemaRoomApi.queryById({id:this.roomId}).then(res=>{
                    console.log(res);
                    this.cinemaRoom = res.data.data
                })
            },
            // 列出当前放映厅排片计划表
            listPlans(){
                httpApi.ShowingonPlanApi.queryByRoomId({room_id:this.roomId}).then(res=>{
                    console.log('加载当前放映厅的排片计划列表',res);
                    this.plans = res.data.data
                })
            }
        },
        mounted(){
            // 加载放映厅的基本信息
            this.loadRoomInfo()
            // 加载放映厅下的拍片计划表
            this.listPlans()
        }
    }
</script>

<style lang="scss" scoped>

</style>