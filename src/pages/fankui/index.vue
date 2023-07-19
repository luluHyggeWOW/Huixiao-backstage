<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input v-model="searchText" placeholder="请搜索" style="width:250px" size="large" :blur="search()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="date" label="反馈ID" />
          <el-table-column prop="name" label="反馈内容" />
          <el-table-column prop="name" label="反馈人" />
          <el-table-column prop="name" label="是否解决">
            <template #default>
              <el-checkbox v-model="is" label="" size="large" disabled />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template #default>
              <el-button link type="primary" size="big" @click="handleClick">解决反馈</el-button>
              <el-button link type="error" size="big" @click="handleClick">编辑反馈</el-button>
              <el-button link type="warning" size="big" @click="handleClick">修改反馈</el-button>
              <el-popconfirm title="Are you sure to delete this?" @confirm="1">
                <template #reference>
                  <el-button link type="warning" size="big">删除反馈</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
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
let is = ref(true);
const search = () => {
  console.log(1);
};
</script>

<style scoped lang="scss">
</style>