<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width:700px">
            <el-form-item label="影院名称" prop="cinema_name">
                <el-input clearable v-model="form.cinema_name"></el-input>
            </el-form-item>
            <el-form-item label="选择位置">
                <div id="container" style="border:1px solid #444; width:100%;height:200px"></div>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input clearable v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="省份" prop="province">
                <el-input clearable v-model="form.province"></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="city">
                <el-input clearable v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="district">
                <el-input clearable v-model="form.district"></el-input>
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
                <el-input clearable v-model="form.longitude"></el-input>
            </el-form-item>
            <el-form-item label="维度" prop="latitude">
                <el-input clearable v-model="form.latitude"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="cinema_name">
                <el-select v-model="form.tags" multiple>
                    <el-option v-for="item in types" :key="item.id" :value="item.tagname"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即新增</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import AMapLoader from '@amap/amap-jsapi-loader';
    import httpApi from '@/http';
    window._AMapSecurityConfig = {
            securityJsCode:'952f5ff3b584b8aed87a116df9c121a6',
        }
    export default {
        data() {
            return {
                types:[],   //保存所有的影院类型列表
                form: {
                    cinema_name:'',
                    address:'',
                    province:'',
                    city:'',
                    district:'',
                    longitude:'',
                    latitude:'',
                    tags:'',
                },
                rules:{
                     cinema_name: [{required:true, message:'必填项', trigger: 'blur'}],
                    address: [{required:true, message:'必填项', trigger: 'blur'}],
                    province: [{required:true, message:'必填项', trigger: 'blur'}],
                    city: [{required:true, message:'必填项', trigger: 'blur'}],
                    district: [{required:true, message:'必填项', trigger: 'blur'}],
                    longitude: [{required:true, message:'必填项', trigger: 'blur'}],
                    latitude: [{required:true, message:'必填项', trigger: 'blur'}],
                    tags: [{required:true, message:'必填项', trigger: 'change'}],
                }
            }
        },
        methods:{
            initMap(){
                AMapLoader.load({
                    key:"9ab77d872dbbd9c15f28d08e5d820bf7",             // 申请好的Web端开发者Key，首次调用 load 时必填
                    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins:['AMap.Geocoder'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                }).then((AMap)=>{
                    this.map = new AMap.Map("container",{  //设置地图容器id
                        viewMode:"3D",    //是否为3D地图模式
                        zoom:12,           //初始化地图级别
                        center:[105.602725,37.076636], //初始化地图中心点位置
                    });
                    // 地图初始化完成后,为地图绑定点击事件,获取经纬度
                    this.map.on('click',(ev)=>{
                        console.log(ev.lnglat);
                        let {lat,lng} = ev.lnglat   // 获取经纬度
                        console.log(`${lng},${lat}`);
                        // 当获取用户选中的坐标点后,执行逆地理解析,得到地点的详细描述
                        let coder = new AMap.Geocoder()
                        coder.getAddress([lng,lat],(status, result)=>{
                            console.log(result);
                            // 回填表单
                            let info = result.regeocode
                            this.form.address = info.formattedAddress
                            this.form.province = info.addressComponent.province
                            this.form.city = info.addressComponent.city
                            this.form.district = info.addressComponent.district
                            this.form.longitude = lng
                            this.form.latitude = lat

                        })
                    })
                })
            },
            // 提交表单的方法
            onSubmit(){
                this.$refs['form'].validate(valid=>{
                    if(valid){
                        this.form.tags = this.form.tags.join(',')
                        console.log(this.form);
                        // 发请求
                        httpApi.CinemaApi.add(this.form).then(res=>{
                            if(res.data.code == 200){
                                this.$message({message:'恭喜影院新增成功！',type:'success'})
                            }
                                this.$router.push('/home/cinema-list')
                        })
                    }
                })
            }
        },
        mounted(){
            this.initMap()  //初始化地图
            // 初始化影院类型列表
            httpApi.CinemaApi.queryTypes().then(res=>{
                console.log(res);
                this.types = res.data.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    #container{
        padding:0px;
        margin: 0px;
        width: 100%;
        height: 800px;
        }
</style>