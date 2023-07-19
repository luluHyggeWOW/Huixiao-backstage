<template>
  <div class="headr">
    <div class="logo"><img src="../../assets/images/logo.png" alt="">
      <p>慧校-后台管理系统</p>
    </div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-sub-menu class="userimg">
        <template #title><img src="../../assets/images/neutral.png" alt=""></template>
        <el-menu-item index="2-2" class="elmenuitem" @click="dialogVisible=true">去登录</el-menu-item>
        <el-menu-item index="2-3" class="elmenuitem">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-dialog v-model="dialogVisible" title="登录" width="30%" :before-close="handleClose">
      <template #default>
        <el-form size="large">
          <el-form-item label="手机号：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label=" 密  码：">
            <el-input type="password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            登录
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";

let $router = useRouter();
let dialogVisible = ref<boolean>(false);
let userInfo = reactive({
  phone: "",
});
const goHome = () => {
  $router.push({ path: "/home" });
};
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