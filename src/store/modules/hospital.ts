import { defineStore } from "pinia";
import { reqHospitalDetail } from "@/api/hospital/index";
import type { HospitalDetailResponseData, HospitalDetail } from "@/api/hospital/type";
import type { DetailState } from "./interface/index";
const useDetailStore = defineStore('Detail', {
  state: (): DetailState => {
    return {
      hospitalInfo: ({} as HospitalDetail)
    }
  },
  actions: {
    async getHospital(hoscode: string) {
      let result: HospitalDetailResponseData = await reqHospitalDetail(hoscode)
      if (result.code == 200) {
        console.log(result);
        this.hospitalInfo = result.data
      }

    }
  },
  getters: {

  }
})
export default useDetailStore