import request from "@/utils/request";
import type { HospitalResponseData, HospitalLevelOrRegionArrResponseData, HospitalInfo } from "@/api/home/type";
enum API {
  GETFANKUILIST_URL = '/help/getallmess',
  CHECKFANKUI_URL = '/help/UplHelpmessStatu',
  DELETEFANKUI_URL = '/help/DelHelpmess',
  SEARCHFANKUI_URL = '/help/getHelpmessbys'
}
export const reqFankuiList = (pageNo: number, pageSize: number) => request.get<any, any>(API.GETFANKUILIST_URL + `?pageNo=${pageNo}&pageSize=${pageSize}`)
export const reqCheckFankui = (hid: string, statu: number) => request.get<any, any>(API.CHECKFANKUI_URL + `?hid=${hid}&statu=${statu}`)
export const reqDeleteFankui = (hid: string) => request.get<any, any>(API.DELETEFANKUI_URL + `?hid=${hid}`)
export const reqSearchFankui = (pageNo: number, pageSize: number, source: string) => request.get<any, any>(API.SEARCHFANKUI_URL + `?pageNo=${pageNo}&pageSize=${pageSize}&source=${source}`)
// export const reqSearchUsetByPhone = (phone: string) => request.get<any, any>(API.SEARCHUSERBYPHONE_URL + `?phone=${phone}`)
// export const reqSearchUsetByUserName = (pageNo: number, pageSize: number, name: string) => request.get<any, any>(API.SEARCHUSERBYUSERNAME_URL + `?pageNo=${pageNo}&pageSize=${pageSize}&name=${name}`)
// export const reqUpdataUserMess = (data: any) => request.post<any, any>(API.UPDATAUSERMESS_URL, data)
// export const reqUpdataPassword = (uid: any, phone: any) => request.get<any, any>(API.UPDATAPASSWORD_URL + `?uid=${uid}&phone=${phone}`)
// export const reqDeleteUser = (uid: any) => request.get<any, any>(API.DELETEUSER_URL + `?uid=${uid}`)
