<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input v-model="searchText" placeholder="请搜索" style="width:250px" size="large" :blur="search()"></el-input>

      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="date" label="用户ID" />
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="name" label="手机号" />
          <el-table-column prop="name" label="电子邮箱" />
          <el-table-column prop="name" label="角色" />
          <el-table-column label="操作" fixed="right">
            <template #default={row}>
              <el-button link type="error" size="big" @click="updateUserShow">编辑用户</el-button>
              <el-popconfirm title="确认要重置密码?" @confirm="updateUserPassword(row)">
                <template #reference>
                  <el-button link type="primary" size="big">重置密码</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm title="确认要注销用户?" @confirm="deleteUser(row)">
                <template #reference>
                  <el-button link type="warning" size="big">注销用户</el-button>
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
            <el-input style="width:70%"></el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="手机号：" size="large" label-width="100px">
            <el-input style="width:70%"></el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="电子邮箱：" size="large" label-width="100px">
            <el-input style="width:70%"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { log } from "console";
import { ref } from "vue";
let searchText = ref<string>();
const tableData = ref([
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
]);
let updateUserDrawer = ref<boolean>(false);
const search = () => {
  console.log(1);
};

const updateUserShow = () => {
  updateUserDrawer.value = true;
};
const updateUserPassword = async () => {
  let result: any = await q;
  if (result.code == 200) {
    ElMessage({ type: "success", message: "成功" });
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
const deleteUser = async () => {
  let result: any = await q;
  if (result.code == 200) {
    ElMessage({ type: "success", message: "成功" });
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
</script>

<style scoped lang="scss">
</style>