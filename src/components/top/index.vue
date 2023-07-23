<template>
  <div class="headr">
    <div class="logo"><img src="../../assets/images/logo.png" alt="">
      <p>慧校-后台管理系统</p>
    </div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-sub-menu class="userimg">
        <template #title><img
            :src="dataStore.UserInfo.userName?dataStore.UserInfo.userAvatar:'../../assets/images/neutral.png'"
            alt=""></template>
        <el-menu-item index="2-2" class="elmenuitem" @click="goLogin">去登录</el-menu-item>
        <el-menu-item index="2-3" class="elmenuitem" @click="goLoginout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-dialog v-model="dataStore.LoginDialog" title="登录" width="30%" :before-close="handleClose">
      <template #default>
        <el-form size="large">
          <el-form-item label="手机号：" label-width="80">
            <el-input v-model="userInfo.phone" maxlength="11" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密  码：" label-width="80">
            <el-input type="password" v-model="userInfo.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="Login">登录</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { DataStore } from "@/store/date/index";
import { reqLoginOut } from "@/api/user/index";
import { ElMessage } from "element-plus";
import { constantRoute } from "@/router/routes";
let dataStore = DataStore();
let $router = useRouter();
let userInfo = reactive({
  phone: "15002294399",
  password: "123456",
});
const goLogin = () => {
  dataStore.LoginDialog = true;
  Object.assign(userInfo, {
    phone: "15002294399",
    password: "123456",
  });
};
const goHome = () => {
  $router.push({ path: "/home" });
};
const cancel = () => {
  dataStore.LoginDialog = false;
};
const Login = () => {
  var data = new FormData();
  data.append(
    "username",
    `{"password":${userInfo.password},"authType":"password","cellphone":${userInfo.phone}}`
  );
  dataStore.Token(data).then((res) => {
    if ((res as string) == "ok") dataStore.LoginDialog = false;
  });
};
const goLoginout = async () => {
  let result: any = await reqLoginOut(localStorage.getItem("token"));
  if (result.code == 200) {
    localStorage.removeItem("token");
    dataStore.UserInfo = "";
    dataStore.menuRoutes = constantRoute;
    ElMessage({ type: "success", message: "退出成功" });
    $router.push({ path: "/home" });
  } else {
    ElMessage({ type: "error", message: "退出失败" });
  }
};
onMounted(() => {
  // dataStore.Login();
});
</script>

<style scoped lang="scss">
.headr {
  width: 100vw;
  height: 100px;
  background: #cbe5ff;
  display: flex;
  .logo {
    display: flex;
    align-items: center;
    margin-left: 5%;
    img {
      width: 200px;
      height: 50px;
    }
    p {
      font-size: 30px;
      z-index: 10;
      width: 300px;
      font-weight: 600;
      color: rgb(0, 153, 255);
      margin-left: 30px;
    }
  }

  .el-menu-demo {
    background-color: #cbe5ff;
    justify-content: right;
    padding: 0px;
    margin-top: -10px;
    width: 100%;

    .el-menu-item {
      cursor: pointer;
    }
  }

  .userimg {
    img {
      display: flex;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
</style>