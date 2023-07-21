import request from "@/utils/request";
enum API {
  TOKEN_URL = '/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password',
  LOGIN_URL = '/user/getuser',
  LOGINOUT_URL = '/user/logout',
}
export const reqToken = (data: any) => request.post<any, any>(API.TOKEN_URL, data)
export const reqLogin = (tokens: any) => {
  const headers = {
    'Authorization': `Bearer ${tokens}`,
  };
  return request.get<any, any>(API.LOGIN_URL, { headers })
}
export const reqLoginOut = (tokens: any) => {
  const headers = {
    'Authorization': `Bearer ${tokens}`,
  };
  return request.get<any, any>(API.LOGINOUT_URL, { headers })
}
