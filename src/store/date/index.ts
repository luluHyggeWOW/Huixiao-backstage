import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
import { ElMessage } from "element-plus";
import { reqLogin, reqToken } from "@/api/user/index";
import type { UserInfoType } from "@/api/user/type";
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import router from "@/router";
const $route = useRoute();
export const DataStore = defineStore('DataStore', () => {
  let DataArr = ref<any>([])
  let SearchText = ref<string>('')
  let PageNo = ref<number>()
  let PageSize = ref<number>()
  let PageSizes = ref<number[]>([])
  let Total = ref<number>()
  // let menuRoutes = ref<any>(constantRoute)
  let menuRoutes = ref<any>([...constantRoute, ...asnycRoute, ...anyRoute])
  menuRoutes.value = [...constantRoute, ...asnycRoute, ...anyRoute];
  [...asnycRoute, ...anyRoute].forEach((route: any) => {
    router.addRoute(route)
  })
  let UserInfo = ref<any>({})
  let LoginDialog = ref<boolean>(false)
  const Token = async (data: any) => {
    let result = await reqToken(data);
    if (result.access_token) {
      localStorage.setItem('token', result.access_token)
      Login().then((res) => {
        if (res == 'ok') return 'ok';
      })
    } else {
      ElMessage({ type: 'error', message: '获取token失败', })
      return 'no';

    }
  }
  const Login = async () => {
    // let userAsyncRoute = filterAsyncRoute(cloneDeep(asnycRoute), result.data.routes)
    let tokens
    if (localStorage.getItem('token')) {
      tokens = localStorage.getItem('token')
    } else {
      ElMessage({ type: 'error', message: '请登录' })
      LoginDialog.value = true
      return 'no'
    }
    let result: UserInfoType = await reqLogin(tokens)
    if (result.code == 200) {
      UserInfo.value = result.data
      if (UserInfo.value.userType == '管理员') {
        menuRoutes.value = [...constantRoute, ...asnycRoute, ...anyRoute];
        [...asnycRoute, ...anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
      }
      ElMessage({ type: 'success', message: '登录成功', })
      LoginDialog.value = false
      return 'ok';
    } else {
      ElMessage({ type: 'error', message: '登录失败', })
    }

  }
  const getData = async (pageNo, pageSize) => {
    // let result: any;
    // DataArr.value = ([])
    // console.log($route.path);
    // if ($route.path == "/user") {
    //   result = await q;
    // } else if ($route.path == "/home") {
    //   result = await q;
    // } else if ($route.path == "/forum") {
    //   result = await q;
    // } else if ($route.path == "/shop") {
    //   result = await q;
    // } else if ($route.path == "/fankui") {
    //   result = await q;
    // } else {
    //   result.code = 500;
    // }
    // if (result.code == 200) {
    //   DataArr.value = result.data;
    // }
  };

  return {
    DataArr,
    SearchText,
    PageNo,
    PageSize,
    PageSizes,
    Total,
    getData,
    menuRoutes,
    LoginDialog,
    Token,
    Login,
    UserInfo
  }
})