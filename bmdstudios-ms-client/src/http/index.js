// index.js http目录的主js
// 在该文件中,应导出所有Api接口模块对象
import ActorApi from './apis/ActorApi'
import DirectorApi from './apis/DirectorApi'
import MovieApi from './apis/MovieApi';
import CinemaApi from './apis/CinemaApi';
import CinemaRoomApi from './apis/CinemaRoomApi';
import ShowingonPlanApi from './apis/ShowingonPlanApi';
import AdminApi from './apis/AdminApi';
const httpApi = {
    ActorApi,
    DirectorApi,
    MovieApi,
    CinemaApi,
    CinemaRoomApi,
    ShowingonPlanApi,
    AdminApi
}

export default httpApi;