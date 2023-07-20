<template>
  <div>
    <el-input v-model="searchText" placeholder="请搜索" style="width:250px" size="large" :blur="search()"></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DataStore } from "@/store/date/index";
let dataStore = DataStore();
let searchText = ref<string>("");
const search = async () => {
  dataStore.SearchText = searchText.value;
};
</script>

<style scoped>
</style>