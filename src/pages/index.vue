<template>
  <div class="box">
    <div class="left">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#f5fafe" router="true" text-size="50" :ollapse-transition='false'>
        <el-menu-item index="/home">
          <el-icon>
            <House />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <el-icon>
            <User />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/news">
          <el-icon>
            <Document />
          </el-icon>
          <span>新闻管理</span>
        </el-menu-item>
        <el-menu-item index="/forum">
          <el-icon>
            <Message />
          </el-icon>
          <span>论坛管理</span>
        </el-menu-item>
        <el-menu-item index="/shop">
          <el-icon>
            <ShoppingCart />
          </el-icon>
          <span>市场管理</span>
        </el-menu-item>
        <el-menu-item index="/fankui">
          <el-icon>
            <Wallet />
          </el-icon>
          <span>反馈管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <el-card>
        <div class="tabbar">
          <p>{{$route.meta.title}}</p>
        </div>
        <router-view></router-view>
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
import { useRoute } from "vue-router";

let $route = useRoute();
</script>

<style scoped lang="scss">
.box {
  display: flex;
  .left {
    flex: 4;
    background: #f5fafe;
    height: calc(100vh - 100px);
    .el-menu-vertical-demo {
      font-size: 20px;
    }
  }
  .right {
    flex: 20;
    background: #fff;
    height: calc(100vh - 100px);
    // height: 100vh;
    // width: 100%;
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
</style>