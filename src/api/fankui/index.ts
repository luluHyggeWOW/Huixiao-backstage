import request from "@/utils/request";
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

