<template>
  <div>
    <el-form>
      <el-form :rules="rules" :inline="true" :model="SearchList">
        <el-form-item prop="name">
          <el-input v-model="SearchList.name" placeholder="请搜索" style="width:250px" size="large"
            :blur="searchByName"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="SearchList.phone" placeholder="请输入手机号" style="width:250px" size="large"
            :blur="searchByPhone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" size="large" @click="getAll">获取所有数据</el-button>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-table :data="dataStore.DataArr" style="width: 100%" border>
          <el-table-column prop="userId" label="用户ID" width="200" align="center" />
          <el-table-column label="用户头像" width="100" align="center">
            <template #default={row}>
              <img :src="row.userAvatar" alt="" style="width:80px ;height:80px">
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名" width="200" align="center" />
          <el-table-column prop="userPhone" label="手机号" align="center" />
          <el-table-column prop="userEmail" label="电子邮箱" align="center" />
          <el-table-column prop="userType" label="角色" width="100" align="center" />
          <el-table-column label="操作" fixed="right" align="center">
            <template #default={row}>
              <el-button link type="error" size="large" @click="updataUserShow(row)">编辑用户</el-button>
              <el-popconfirm title="确认要重置密码?" @confirm="updateUserPassword(row)">
                <template #reference>
                  <el-button link type="primary" size="large">重置密码</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm title="确认要注销用户?" @confirm="deleteUser(row)">
                <template #reference>
                  <el-button link type="warning" size="large">注销用户</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>
    </el-form>

    <el-drawer v-model="updateUserDrawer" :direction="direction" size="30%">
      <template #header>
        <h4>编辑用户</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户名：" size="large" label-width="100px">
            <el-input style="width:70%" v-model="UserInfo.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" size="large" label-width="100px">
            <el-input style="width:70%" v-model="UserInfo.userPhone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" size="large" label-width="100px">
            <el-input style="width:70%" v-model="UserInfo.userEmail" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updataUserInfo">更新</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { DataStore } from "@/store/date/index";
import {
  reqSearchUsetByPhone,
  reqSearchUsetByUserName,
  reqUpdataUserMess,
  reqUpdataPassword,
  reqDeleteUser,
} from "@/api/user/index";
import { UserInfo } from "@/api/user/type";
import { reactive } from "vue";
import { log } from "console";
let dataStore = DataStore();
let userDataArr = dataStore.DataArr;
let updateUserDrawer = ref<boolean>(false);
let SearchList = reactive({
  phone: "",
  name: "",
});
let UserInfo = ref<UserInfo>({});
const search = () => {};
const updataUserShow = (row: any) => {
  updateUserDrawer.value = true;
  UserInfo.value = row;
};
const updataUserInfo = async () => {
  let data = {
    userId: UserInfo.value.userId,
    userPhone: UserInfo.value.userPhone,
    userStatus: "0",
    userEmail: UserInfo.value.userEmail,
  };
  let result: any = await reqUpdataUserMess(data);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "更新成功" });
    updateUserDrawer.value = false;
    dataStore.getData();
  } else {
    ElMessage({ type: "error", message: "更新失败" });
  }
};
const updateUserPassword = async (row: any) => {
  UserInfo.value = row;
  let result: any = await reqUpdataPassword(
    UserInfo.value.userId,
    UserInfo.value.userPhone
  );
  if (result.code == 200) {
    ElMessage({ type: "success", message: "重置成功" });
    updateUserDrawer.value = false;
  } else {
    ElMessage({ type: "error", message: "重置失败" });
  }
};

const deleteUser = async (row: any) => {
  UserInfo.value = row;
  let result: any = await reqDeleteUser(UserInfo.value.userId);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "注销成功" });
    dataStore.getData();
  } else {
    ElMessage({ type: "error", message: "注销失败" });
  }
};
const reg_tel =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const validatePhone = (rule: any, value: any, callback: any) => {
  if (reg_tel.test(value) && value.length == 11) {
    callback();
    searchByPhone();
  } else {
    callback(new Error("请输入正确的手机号"));
  }
};
const validateName = (rule: any, value: any, callback: any) => {
  callback();
  searchByName();
};
const rules = reactive({
  phone: [{ validator: validatePhone, trigger: "blur" }],
  name: [{ validator: validateName, trigger: "blur" }],
});
const searchByPhone = async () => {
  let result: any = await reqSearchUsetByPhone(SearchList.phone);
  if (result.code == 200) {
    dataStore.DataArr = result.data;
    dataStore.Total = result.data.length;
  }
};
const searchByName = async () => {
  dataStore.PageNo = 1;
  let result: any = await reqSearchUsetByUserName(
    dataStore.PageNo,
    dataStore.PageSize,
    SearchList.name
  );
  if (result.code == 200) {
    dataStore.DataArr = result.data.items;
    dataStore.Total = result.data.counts;
  }
};
const getAll = () => {
  if (SearchList.phone == "" && SearchList.name == "") {
  } else {
    dataStore.getData();
    SearchList.phone = "";
    SearchList.name = "";
  }
};
onMounted(() => {
  dataStore.getData();
});
</script>

<style scoped lang="scss">
</style>