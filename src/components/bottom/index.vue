

<template>
  <div class="bottom" v-if="$route.path!='/home'">
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="pageSizes" :small="small"
      :disabled="disabled" :background="true" layout=" prev, pager,next,->,  jumper,total, sizes," :total="total"
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
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let pageSizes = ref<number[]>([10, 20, 30, 40]);
let total = ref<number>(20);
let dataArr = ref<any>();
let searchText = dataStore.SearchText;
const handleSizeChange = () => {
  dataStore.getData(pageNo.value, pageSize.value);
};
const handleCurrentChange = () => {
  dataStore.getData(pageNo.value, pageSize.value);
};
watch(
  () => $route.path,
  (newValues, oldValues) => {
    //要执行的方法
    console.log(newValues, oldValues);
    if (newValues == "/user") {
      pageSize.value = 10;
    } else if (newValues == "/shop" || newValues == "/forum") {
      pageSize.value = 4;
    } else if (newValues == "/news" || newValues == "/fankui") {
      pageSize.value = 8;
    }
    pageNo.value = 1;
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