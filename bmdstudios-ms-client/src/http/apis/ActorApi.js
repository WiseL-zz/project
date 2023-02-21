/* 存放所有演员模块相关接口 */
import myaxios from '../MyAxios'
// 引入封装的请求前缀
import URLENV from '../BaseUrl'
// 使用
const BMDURL = URLENV.BMDURL

const ActorApi = {
    /**
     * 新增演员接口
     * @param {Object} params 参数列表:{id:演员路径}
     */
    add(params){
        let url = BMDURL + '/movie-actor/add'
        return myaxios.post(url,params)
    },
    /**
     * 删除演员
     * @param {Object} params 参数列表:{actor_name:姓名 actor_avatar:头像路径}
     */
    delete(params){
        let url = BMDURL + '/movie-actor/del'
        return myaxios.post(url,params)
    },
    /**
     * 通过关键字,模糊查询演员列表
     * @params {Object} params 参数列表:{name:关键字}
     */
    queryActorByNameLike(params){
        let url = BMDURL + '/movie-actors/name'
        return myaxios.post(url,params)
    },
    /**
     * 查询所有演员,返回发送请求后的Promise对象
     */
    queryAllActors(){
        let url = BMDURL + '/movie-actors'
        let params = {page:1,pagesize:100}
        return myaxios.get(url,params)
    },
}
export default ActorApi