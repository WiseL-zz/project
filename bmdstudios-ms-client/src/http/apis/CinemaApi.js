// 影院模块的接口
import myaxios from '../MyAxios'
import URLENV from '../BaseUrl'
const BMDURL = URLENV.BMDURL
const CinemaApi = {
    // 查询所有的影院类型
    queryTypes(){
        let url = BMDURL + '/cinema/tags'
        return myaxios.get(url)
    },
    // 新增影院
    add(params){
        let url = BMDURL + '/cinema/add'
        return myaxios.post(url,params)
    },
    // 查询影院
    queryAll(){
        let url = BMDURL + '/cinemas'
        return myaxios.get(url)
    }
}

export default CinemaApi