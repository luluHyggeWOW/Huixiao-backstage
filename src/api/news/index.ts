import request from "@/utils/request";
enum API {
  GETNEWSLIST_URL = '/news/getnews',
  GETNEWSINFO_URL = '/news/getnoenews',
  UPDATANEWS_URL = '/news/upnews',
  DELETENEWS_URL = '/shop/news/dele/',
}
export const reqNewsList = (pageNo: number, pageSize: number) => request.get<any, any>(API.GETNEWSLIST_URL + `?pageNo=${pageNo}&pageSize=${pageSize}`)
export const reqGetNewsInfo = (eid: string) => request.get<any, any>(API.GETNEWSINFO_URL + `?Eid=${eid}`)
export const reqUpdataNews = (data: any) => {
  return request.post<any, any>(API.UPDATANEWS_URL, data)
}
// export const reqUpdataNews = (data: any) => {
//   return request.get<any, any>(API.UPDATANEWS_URL)
// }
export const reqDeleteNews = (id: string) => request.get<any, any>(API.DELETENEWS_URL + `${id}`)

