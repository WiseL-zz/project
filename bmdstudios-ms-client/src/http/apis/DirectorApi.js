/* 存放所有导演模块相关接口 */
import myaxios from "../MyAxios";
// 引入封装的请求前缀
import URLENV from '../BaseUrl'
// 使用
const BMDURL = URLENV.BMDURL
const DirectorApi = {
    // 查询导演列表
    queryAllDirector(){
        let url = BMDURL + '/movie-directors'
        let param = {page:1,pagesize:100}
        return myaxios.get(url,param)
    },
    /**
     * 模糊查询导演列表
     */
    queryDirectorByNameLike(params){
        let url = BMDURL + '/movie-directors/name'
        return myaxios.post(url,params)
    },
    /**
     * 新增导演
     */
    add(params){
        let url = BMDURL + '/movie-director/add'
        return myaxios.post(url,params)
    },
    /**
     * 删除导演
     */
    delete(params){
        let url = BMDURL + '/movie-director/del'
        return myaxios.post(url,params)
    }
}
export default DirectorApi