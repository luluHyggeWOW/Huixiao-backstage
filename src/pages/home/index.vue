<template>
  <div class="elcard">
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
.elcard {
  // width: 96%;
  margin: auto;
  margin-top: 2%;
  // background: ;
  height: calc(100vh - 250px);
  width: 100%;
  background: url("../../assets/images/code.gif");
  background-size: 100% 100%;
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