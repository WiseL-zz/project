/* 存放电影管理的Api */

import myaxios from '../MyAxios'
// 引入封装的请求前缀
import URLENV from '../BaseUrl'
// 使用
const BMDURL = URLENV.BMDURL
const MovieApi = {
    /**
     * 查询所有电影（带分页）
     * @param {Object} params 参数列表
     * {page:1,pagesize:10}
     */
    queryAllMovie(params){
        let url = BMDURL + '/movie-infos'
        return myaxios.get(url,params)
    },
    /**
     * 模糊查询电影(带分页)
     * @param {Object} params 参数列表  {name:关键字,page:1,pagesize:10}
     */
    queryAllMovieFuzzy(params){
        let url = BMDURL + '/movie-infos/name'
        return myaxios.post(url,params)
    },
    /**
     * 删除电影
     * @param {Object} params 参数名
     */
    delete(params){
        let url = BMDURL + '/movie-info/del'
        return myaxios.post(url,params)
    },
    /**
     * 查询电影类型
     * get请求可以不传参,params为undefined没影响,但是post请求必须传参
     */
    queryAllMovieType(){
        let url = BMDURL + '/movie-types'
        return myaxios.get(url)
    },
    /**
     * 添加电影信息
     * @param {Object} params 请求参数列表
     */
    add(params){
        let url = BMDURL + '/movie-info/add'
        return myaxios.post(url,params)
    },
    /**
     * 修改操作  十个字段的参数列表
     * @param {Object} params 参数列表
     */
    update(params){
        let url = BMDURL + '/movie-info/update'
        return myaxios.post(url,params)
    },
    // 通过id查询电影详情
    queryById(params){
        let url = BMDURL + '/movie-info/query'
        return myaxios.get(url,params)
    }
}
export default MovieApi