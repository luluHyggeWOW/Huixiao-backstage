import request from "@/utils/request";
enum API {
  GETSHOPLIST_URL = '/shop/open/get/',
  DELETESHOP_URL = '/shop/delete/',
  SEARCHBYNAME_URL = '/shop/getbyname',
  SEARCHBYSOURCE_URL = '/shop/getbysource',
  UPDATASHOP_URL = '/shop/upmess',
}
export const reqShopList = (pageNo: number) => request.get<any, any>(API.GETSHOPLIST_URL + `${pageNo}`)
export const reqDeleteShop = (id: string) => request.delete<any, any>(API.DELETESHOP_URL + `${id}`)
export const reqSearchByName = (pageNo: number, pageSize: number, name: string) => request.get<any, any>(API.SEARCHBYNAME_URL + `?pageNo=${pageNo}&pageSize=${pageSize}&name=${name}`)
export const reqSearchBySource = (pageNo: number, pageSize: number, source: string) => request.get<any, any>(API.SEARCHBYSOURCE_URL + `?pageNo=${pageNo}&pageSize=${pageSize}&source=${source}`)
// export const reqGetNewsInfo = (eid: string) => request.get<any, any>(API.GETNEWSINFO_URL + `?Eid=${eid}`)
export const reqUpdataShop = (data: any) => request.post<any, any>(API.UPDATASHOP_URL, data)
// export const reqDeleteNews = (id: string) => request.get<any, any>(API.DELETENEWS_URL + `${id}`)
