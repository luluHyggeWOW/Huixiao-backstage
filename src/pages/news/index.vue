<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input v-model="searchText" placeholder="请搜索" style="width:250px" size="large" :blur="search()"></el-input>

      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="date" label="新闻ID" width="150" />
          <el-table-column prop="zip" label="新闻内容" show-overflow-tooltip />
          <el-table-column prop="name" label="上传日期" width="150" />
          <el-table-column prop="name" label="更新日期" width="150" />
          <el-table-column label="操作" width="200">
            <template #default>
              <el-button link type="primary" size="big" @click="updateNewsDrawerShow">更新新闻</el-button>
              <el-popconfirm title="Are you sure to delete this?">
                <template #reference>
                  <el-button link type="warning" size="big" @click="deleteNews">删除新闻</el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>

        </el-table>
      </el-form-item>
    </el-form>
    <el-drawer v-model="updateNewsDrawer" :direction="direction" size="30%">
      <template #header>
        <h4>更新新闻</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="新闻内容：" size="large" label-width="100px">
            <el-input v-model="updateNewsText" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea"
              placeholder="请输入新闻内容"></el-input>
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
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updateNews()">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { log } from "console";
import { ref } from "vue";
let searchText = ref<string>();
let updateNewsDrawer = ref<boolean>(false);
let updateNewsText = ref<string>();
const tableData = ref([
  {
    date: "2016-05-01",
    name: "Tomq",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "weqweqqweeqwqweqwNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles",
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
const search = () => {
  console.log(1);
};
const updateNewsDrawerShow = () => {
  updateNewsText.value = "";
  updateNewsDrawer.value = true;
};
const deleteNews = async () => {
  let result: any = await q;
  if (result.code == 200) {
    ElMessage({ type: "success", message: "成功" });
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
const cancelClick = () => {
  updateNewsDrawer.value = false;
};
const updateNews = async () => {
  let result: any = await q;
  if (result.code == 200) {
    ElMessage({ type: "success", message: "成功" });
    updateNewsDrawer.value = false;
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
</script>

<style scoped lang="scss">
</style>