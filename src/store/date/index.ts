import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
export const DataStore = defineStore('DataStore', () => {
  let DataArr = ref<any>([])
  let SearchText = ref<string>('')
  let PageNo = ref<number>()
  let PageSize = ref<number>()
  let PageSizes = ref<number[]>([])
  let Total = ref<number>()
  const getData = async () => {
    let result: any;
    DataArr.value = ([])
    console.log($route.path);
    if ($route.path == "/user") {
      result = await q;
    } else if ($route.path == "/home") {
      result = await q;
    } else if ($route.path == "/forum") {
      result = await q;
    } else if ($route.path == "/shop") {
      result = await q;
    } else if ($route.path == "/fankui") {
      result = await q;
    } else {
      result.code = 500;
    }
    if (result.code == 200) {
      DataArr.value = result.data;
    }
  };
  return {
    DataArr,
    SearchText,
    PageNo,
    PageSize,
    PageSizes,
    Total,
    getData
  }
})