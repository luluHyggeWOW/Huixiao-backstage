<template>
  <div>
    <el-form>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchText" placeholder="请搜索" style="width:250px" size="large" :blur="search()"></el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" size="large" @click="getAll">获取所有数据</el-button>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-table :data="dataStore.DataArr" style="width: 100%" border>
          <el-table-column prop="huid" label="反馈人ID" width="200" align="center" />
          <el-table-column prop="hlocation" label="反馈地点" width="200" align="center" />
          <el-table-column prop="hsource" label="反馈内容" width="620" show-overflow-tooltip align="center" />
          <el-table-column prop="hdata" label="反馈时间" width="200" align="center" />
          <el-table-column prop="hstate" label="是否解决" width="100" align="center">
            <template #default={row}>
              <el-checkbox v-model="isCheck[row.hstate]" label="" size="large" disabled />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template #default={row}>
              <el-button link type="error" size="large"
                @click="chanckFankui(row)">{{row.hstate==0?'解决反馈':'取消解决'}}</el-button>
              <el-button link type="primary" size="large" @click="updateFankuiShow(row)" disabled>编辑反馈</el-button>
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
      <template #defaul>
        <el-form>
          <el-form-item label="反馈人：" size="large" label-width="100px">
            {{updateFankuiInfo.huid}}
          </el-form-item>
          <el-form-item label="反馈地点：" size="large" label-width="100px">
            <el-input v-model="updateFankuiInfo.hlocation" style="width:70%" type="textarea"
              placeholder="请输入反馈地点"></el-input>
          </el-form-item>
          <el-form-item label="反馈内容：" size="large" label-width="100px">
            <el-input v-model="updateFankuiInfo.hsource" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }"
              type="textarea" placeholder="请输入反馈内容"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updateFankui()">更新</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { DataStore } from "@/store/date/index";
import {
  reqFankuiList,
  reqCheckFankui,
  reqDeleteFankui,
  reqSearchFankui,
} from "@/api/fankui/index";
import { da } from "element-plus/es/locale";
let dataStore = DataStore();
let searchText = ref<string>("");
let updateFankuiDrawer = ref<boolean>(false);
const Fankui = ref([
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
let updateFankuiInfo = ref<any>();
let isCheck = reactive({
  0: false,
  1: true,
});

const search = async () => {
  if (searchText.value != "") {
    let result: any = await reqSearchFankui(
      dataStore.PageNo,
      dataStore.PageSize,
      searchText.value
    );
    if (result.code == 200) {
      dataStore.DataArr = result.data.items;
      dataStore.Total = result.data.counts;
    }
  }
};
const updateFankuiShow = (row: any) => {
  updateFankuiDrawer.value = true;
  console.log(row);

  updateFankuiInfo.value = row;
};
const deleteFankui = async (row: any) => {
  let result: any = await reqDeleteFankui(row.hid);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
  } else {
    ElMessage({ type: "error", message: "删除失败" });
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
const chanckFankui = async (row: any) => {
  let result: any = await reqCheckFankui(row.hid, row.hstate == 0 ? 1 : 0);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "更改成功" });
    dataStore.getData();
  } else {
    ElMessage({ type: "error", message: "更改失败" });
  }
};
const getAll = () => {
  if (searchText.value == "") {
  } else {
    dataStore.getData();
    searchText.value = "";
  }
};
onMounted(() => {
  dataStore.getData();
});
</script>

<style scoped lang="scss">
</style>