

<template>
  <div class="bottom" v-if="$route.path!='/home'">
    <el-pagination v-model:current-page="dataStore.PageNo" v-model:page-size="dataStore.PageSize" :small="small"
      :background="true" layout=" prev, pager,next,->,  jumper,total, " :total="dataStore.Total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DataStore } from "@/store/date/index";
let dataStore = DataStore();
let $route = useRoute();
let $router = useRouter();
let total = ref<number>(20);
let dataArr = ref<any>();
let searchText = dataStore.SearchText;
const handleSizeChange = () => {
  dataStore.getData();
};
const handleCurrentChange = () => {
  dataStore.getData();
};
watch(
  () => $route.path,
  (newValues, oldValues) => {
    //要执行的方法
    console.log(newValues, oldValues);
    if (newValues == "/user") {
      dataStore.PageSize = 5;
    } else if (newValues == "/shop") {
      dataStore.PageSize = 9;
    } else if (newValues == "/news" || newValues == "/fankui") {
      dataStore.PageSize = 8;
    } else if (newValues == "/forum") {
      dataStore.PageSize = 4;
    }
    dataStore.PageNo = 1;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
.bottom {
  height: 50px;
  display: flex;
  bottom: 0px;
  position: absolute;
  bottom: 20px;
}
</style>