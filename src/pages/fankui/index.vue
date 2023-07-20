<template>
  <div>
    <el-form>
      <el-form-item>
        <Search></Search>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="name" label="反馈人" width="200" />
          <el-table-column prop="name" label="反馈内容" width="920" show-overflow-tooltip />
          <el-table-column prop="name" label="是否解决" width="100" align="center">
            <template #default>
              <el-checkbox v-model="is" label="" size="large" disabled />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="407">
            <template #default={row}>
              <el-button link type="error" size="large" @click="handleClick">解决反馈</el-button>
              <el-button link type="primary" size="large" @click="updateFankuiShow">编辑反馈</el-button>
              <el-popconfirm title="你确定要删除此反馈?" @confirm="deleteFankui" width="200">
                <template #reference>
                  <el-button link type="warning" size="large">删除反馈</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-drawer v-model="updateFankuiDrawer" :direction="direction" size="30%">
      <template #header>
        <h4>更新反馈</h4>
      </template>
      <template #default={row}>
        <el-form>
          <el-form-item label="反馈人：" size="large" label-width="100px">
            {{updateFankuiInfo.text}}
          </el-form-item>
          <el-form-item label="反馈内容：" size="large" label-width="100px">
            <el-input v-model="updateFankuiInfo.text" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }"
              type="textarea" placeholder="请输入反馈内容"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updateFankui()">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { DataStore } from "@/store/date/index";
let dataStore = DataStore();
let searchText = ref<string>();
let updateFankuiDrawer = ref<boolean>(false);
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
let fankuiDataArr = dataStore.DataArr;
let is = ref(true);
let updateFankuiInfo = reactive({
  text: "",
  name: "",
});
const search = () => {
  console.log(1);
};
const updateFankuiShow = () => {
  updateFankuiDrawer.value = true;
};
const deleteFankui = async () => {
  let result: any = await q;
  if (result.code == 200) {
    ElMessage({ type: "success", message: "成功" });
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
const updateFankui = async () => {
  let result: any = await q;
  if (result.code == 200) {
    ElMessage({ type: "success", message: "成功" });
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
onMounted(() => {
  dataStore.getData();
});
</script>

<style scoped lang="scss">
</style>