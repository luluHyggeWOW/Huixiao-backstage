import request from "@/utils/request";
import request1 from "@/utils/request1";
enum API {
  TOKEN_URL = '/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password',
  LOGIN_URL = '/user/getuser',
  LOGINOUT_URL = '/user/logout',
  GETUSERLIST_URL = '/User/getalluser',
  SEARCHUSERBYPHONE_URL = '/User/getbyuserphone'
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
