<template>
    <div>
        <!-- 子组件 -->
        <div class="box">
            <div class="person">
                <img :src="avatar" alt="">
                <span>{{name}}</span>
                <i @click="cancel" class="el-icon-circle-close"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            avatar:{
                type:String
            },
            name:{
                type:String
            }
        },
        // 如下声明的两个属性.默认是undefined,可以接收任意类型的数据
        // props:['avatar','name']
        methods: {
            // 抛出子组件
            cancel() {  //点击删除按钮之后执行
                // 将该点击事件作为当前组件的自定义事件抛出给父组件,父组件捕获后,可以进行后续业务处理
                // 告诉父组件 delPerson 被触发了
                this.$emit('delPerson')         // delPerson 该事件的事件类型
            }
        },  
    }
</script>

<style lang="scss" scoped>
     div{
        display: inline-block;
        .box{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
                .person{
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border: 1px solid #ddd;
                    box-shadow: 0 0 2px 2px rgba(0,0,0,0.05);
                    border-radius: 10px;
                    margin: 0 10px 10px 0;
                    width: 110px;
                    padding: 5px 0;
                    cursor: pointer;
                        >img{
                            width: 100px;
                            border-radius: 10px;
                        }
                        >span{
                            margin-top: 10px;
                            overflow: hidden;
                            width: 100px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            text-align: center;
                        }
                        >i{
                            position: absolute;
                            top: -8px;
                            right: -7px;
                            background-color: #fff;
                            display: none;
                        }
                        &:hover i{
                            display: block;
                        }
                }
            }
     }
</style>