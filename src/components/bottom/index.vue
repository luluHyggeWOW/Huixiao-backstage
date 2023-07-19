<template>
  <div class="bottom">
    <div class="content">
      <div class="left">
        京ICP备 13018369号 电话挂号010-56253825
      </div>
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.bottom {
  width: 100%;
  height: 50px;
  background: rgb(238, 236, 236);
  display: flex;
  justify-content: center;
  .content {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    color: rgb(92, 92, 92);
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin: 0 5px;
        cursor: pointer;
      }
    }
  }
}
</style>