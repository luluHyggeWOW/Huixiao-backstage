import request from "@/utils/request";
enum API {
  GETFORUMLIST_URL = '/talk/getalltalk',
  CHECKFORUM_URL = '/talk/changestatu',
  DELETEFORUM_URL = '/talk/DelbyID',
  SEARCHBYTITLE_URL = '/talk/getbytitle',
  SEARCHBYSOURCE_URL = '/talk/getbysource',

}
export const reqForumList = (pageNo: number, pageSize: number) => request.get<any, any>(API.GETFORUMLIST_URL + `?pageNo=${pageNo}&pageSize=${pageSize}`)
export const reqCheckForum = (tid: string, statu: string) => request.get<any, any>(API.CHECKFORUM_URL + `?tid=${tid}&statu=${statu}`)
export const reqDeleteForum = (tid: string) => request.get<any, any>(API.DELETEFORUM_URL + `?tid=${tid}`)
export const reqSearchBySource = (pageNo: number, pageSize: number, source: string) => request.get<any, any>(API.SEARCHBYSOURCE_URL + `?pageNo=${pageNo}&pageSize=${pageSize}&source=${source}`)
export const reqSearchByTitle = (pageNo: number, pageSize: number, title: string) => request.get<any, any>(API.SEARCHBYTITLE_URL + `?pageNo=${pageNo}&pageSize=${pageSize}&title=${title}`)