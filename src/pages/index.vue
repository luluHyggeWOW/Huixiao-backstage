<template>
  <div class="box">
    <div class="left">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#f5fafe" text-size="50"
        :ollapse-transition='false'>
        <!-- {{item.path}} -->
        <template v-for="item in dataStore.menuRoutes" :key="item">
          <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="right">
      <el-card class="elcard">
        <div class="tabbar">
          <p>{{$route.meta.title}}</p>
        </div>
        <router-view></router-view>
        <Bottom></Bottom>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  House,
  User,
  Document,
  Message,
  ShoppingCart,
  Wallet,
} from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DataStore } from "@/store/date/index";
let dataStore = DataStore();
let $route = useRoute();
let $router = useRouter();
const goRoute = (vc: any) => {
  // 路由跳转
  $router.push(vc.index);
};
onMounted(() => {});
</script>

<style scoped lang="scss">
.box {
  display: flex;
  padding: 0;
  margin: 0;

  .left {
    flex: 4;
    background: #f5fafe;
    height: calc(100vh - 100px);
    .el-menu-vertical-demo {
      font-size: 20px;
      height: calc(100vh - 100px);
    }
  }
  .right {
    flex: 20;
    background: #fff;
    height: calc(100vh - 100px);
    // height: 100vh;
    // width: 100%;
    padding: 0;
    margin: 0;

    .elcard {
      width: calc(100vw - 250px);
      height: calc(100vh - 100px);

      .tabbar {
        width: 100%;
        height: 50px;
        p {
          font-size: 20px;
          color: rgb(34, 170, 220);
        }
      }
    }
  }
}
</style>