<template>
  <div class="elcard2">
    <div class="box">
      <img src="../../assets/images/logo1.png" alt="" class="avatar">
      <div class="title">
        <h3>{{getTime()}}好！打工人XX</h3>
        <p>慧校后台管理</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { getTime } from "@/utils/time";
</script>

<style scoped lang="scss">
.elcard2 {
  // width: 96%;
  width: calc(100vw - 250px);
  // background: ;
  height: calc(100vh - 100px);
  background: url("../../assets/images/code.gif");
  background-size: 120% 100%;
  .box {
    display: flex;
    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
    .title {
      margin-left: 20px;
      margin-top: 50px;
      h3 {
        font-size: 40px;
        font-weight: 600;
      }
      p {
        margin-top: 50px;
        font-size: 20px;
        color: rgb(136, 136, 136);
      }
    }
  }
}
</style>