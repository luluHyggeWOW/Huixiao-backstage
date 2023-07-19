import request from "@/utils/request";
import { HospitalDetailResponseData } from "./type";
enum API {
  HOSPITAL_URLDETAIL = '/hosp/hospital/'
}
export const reqHospitalDetail = (hscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITAL_URLDETAIL + hscode)