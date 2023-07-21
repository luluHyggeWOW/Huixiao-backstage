import request from "@/utils/request";
import request1 from "@/utils/request1";
enum API {
  TOKEN_URL = '/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password',
  LOGIN_URL = '/user/getuser',
  LOGINOUT_URL = '/user/logout',
  GETUSERLIST_URL = '/User/getalluser',
  SEARCHUSERBYPHONE_URL = '/User/getbyuserphone',
  SEARCHUSERBYUSERNAME_URL = '/User/getbyusername',
  UPDATAUSERMESS_URL = '/User/setUserMess',
  UPDATAPASSWORD_URL = '/User/setpass/',
  DELETEUSER_URL = '/User/delUser'
}
export const reqToken = (data: any) => request1.post<any, any>(API.TOKEN_URL, data)
export const reqLogin = (tokens: any) => {
  const headers = {
    'Authorization': `Bearer ${tokens}`,
  };
  return request1.get<any, any>(API.LOGIN_URL, { headers })
}
export const reqLoginOut = (tokens: any) => {
  const headers = {
    'Authorization': `Bearer ${tokens}`,
  };
  return request1.get<any, any>(API.LOGINOUT_URL, { headers })
}
export const reqUserList = (pageNo: number, pageSize: number) => request.get<any, any>(API.GETUSERLIST_URL + `?pageNo=${pageNo}&pageSize=${pageSize}`)
export const reqSearchUsetByPhone = (phone: string) => request.get<any, any>(API.SEARCHUSERBYPHONE_URL + `?phone=${phone}`)
export const reqSearchUsetByUserName = (pageNo: number, pageSize: number, name: string) => request.get<any, any>(API.SEARCHUSERBYUSERNAME_URL + `?pageNo=${pageNo}&pageSize=${pageSize}&name=${name}`)
export const reqUpdataUserMess = (data: any) => request.post<any, any>(API.UPDATAUSERMESS_URL, data)
export const reqUpdataPassword = (uid: any, phone: any) => request.get<any, any>(API.UPDATAPASSWORD_URL + `?uid=${uid}&phone=${phone}`)
export const reqDeleteUser = (uid: any) => request.get<any, any>(API.DELETEUSER_URL + `?uid=${uid}`)
