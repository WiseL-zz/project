<template>
    <div>
        <div id="main" style="border:1px solid #444; width:100%;height:200px"></div>
        <el-divider content-position="left">影院列表</el-divider>

        <!-- 表格 -->
        <el-table :data="cinemas">
            <el-table-column align="left" label="影院名称" prop="cinema_name"></el-table-column>
            <el-table-column align="left" label="影院地址" prop="address"></el-table-column>
            <el-table-column width="200px" align="left" label="影院位置">
                <template slot-scope="scope">
                    {{scope.row.province}}
                    {{scope.row.city}}
                    {{scope.row.district}}
                </template>
            </el-table-column>
            <el-table-column width="200px" align="left" label="操作">
                <template slot-scope="scope">
                <el-button @click="moveTo(scope.$index)" size="small" type="success"icon="el-icon-location" circle></el-button>
                <el-button @click="$router.push(`/home/cinema-room-list/${scope.row.id}`)" size="small" type="success"icon="el-icon-s-unfold" circle></el-button>
                <el-button size="small" type="warning"icon="el-icon-edit" circle></el-button>
                <el-button size="small" type="danger"icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import httpApi from '@/http'
    export default {
        data() {
            return {
                cinemas: [],    // 保存影院列表
            }
        },
        methods: {
            // 将地图的中心点移动到选中的电影院的位置
            moveTo(index){
                let cinema = this.cinemas[index]    // 当前选中的影院
                let {longitude,latitude} = cinema
                // 设置地图的中心的位置
                /* 
                center (([number, number] | LngLat)) 中心点经纬度
                immediately (Boolean = false) 是否立即过渡到目标位置
                duration (Number?) 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
                 */
                this.map.setCenter([longitude,latitude],false,1000)
            },
            // 查询影院列表
            MovieList() {
                // 发送请求,请求影院列表
                httpApi.CinemaApi.queryAll().then(res=>{
                    console.log(res);
                    this.cinemas = res.data.data
                })
            },
            // 初始化地图
            initMap(){
                AMapLoader.load({
                    key:"9ab77d872dbbd9c15f28d08e5d820bf7",             // 申请好的Web端开发者Key，首次调用 load 时必填
                    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins:[],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                }).then((AMap)=>{
                    this.map = new AMap.Map("main",{  //设置地图容器id
                        viewMode:"3D",    //是否为3D地图模式
                        zoom:12,           //初始化地图级别
                        center:[116.399825,39.904702], //初始化地图中心点位置
                    });
                    // 基于AMap.为所有的影院添加一个Marker
                    this.cinemas.forEach(item=>{
                        let marker = new AMap.Marker({
                            position:[item.longitude,item.latitude],
                            title:item.cinema_name
                        })
                        this.map.add(marker)    // 将Marker添加到地图上
                    })
                })
            },
        },
        mounted(){
            this.MovieList()
            this.initMap()
        }
    }
</script>

<style lang="scss" scoped>

</style>