<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input v-model="searchText" placeholder="请搜索" style="width:250px" size="large" :blur="search()"
          disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-table :data="dataStore.DataArr" style="width: 100%" border>
          <el-table-column prop="evnId" label="新闻ID" width="150" align="center" />
          <el-table-column prop="evnTitle" label="新闻标题" width="150" show-overflow-tooltip align="center" />
          <el-table-column prop="evnTest" label="新闻内容" show-overflow-tooltip align="center" />
          <el-table-column prop="evnData" label="更新日期" width="150" align="center" />
          <el-table-column label="操作" width="200" fixed="right" align="center">
            <template #default={row}>
              <el-button link type="primary" size="large" @click="updataNewsDrawerShow(row)">更新新闻</el-button>
              <!-- <el-popconfirm title="你确定要删除此新闻吗?" @confirm="deleteNews(row)">
                <template #reference>
                  <el-button link type="warning" size="large" disabled>删除新闻</el-button>
                </template>
              </el-popconfirm> -->
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>
    </el-form>
    <el-drawer v-model="updataNewsDrawer" :direction="direction" size="30%">
      <template #header>
        <h4>更新新闻</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="新闻标题：" size="large" label-width="100px">
            <el-input style="width:70%" v-model="updataNewsInfo.evnTitle"></el-input>
          </el-form-item>
          <el-form-item label="新闻图片：" size="large" label-width="100px">
            <template #default>
              <el-upload class="avatar-uploader" action="http://101.43.241.101:63010/user/open/upload"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" limit="1">
                <img v-if="updataNewsImg" :src="updataNewsImg" class="avatar" style="width:100%" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </template>
          </el-form-item>
          <el-form-item label="新闻内容：" size="large" label-width="100px">
            <el-input v-model="updataNewsInfo.evnTest" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }"
              type="textarea" placeholder="请输入新闻内容"></el-input>
          </el-form-item>

        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updataNews">更新</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { log } from "console";
import { onMounted, ref } from "vue";
import { DataStore } from "@/store/date/index";
import { ElMessage } from "element-plus";
import { reqGetNewsInfo, reqUpdataNews, reqDeleteNews } from "@/api/news/index";
let dataStore = DataStore();
let newsDataArr = dataStore.DataArr;
let updataNewsDrawer = ref<boolean>(false);
let updataNewsText = ref<string>();
let updataNewsInfo = ref<any>();
let updataNewsImg = ref<string>();
const search = () => {
  console.log(1);
};

const updataNewsDrawerShow = async (row: any) => {
  let result: any = await reqGetNewsInfo(row.evnId);
  if (result.code == 200) {
    updataNewsInfo.value = result.data;
    console.log(updataNewsInfo.value);
    updataNewsImg.value = result.data.evnImg;
  }
  updataNewsText.value = "";
  updataNewsDrawer.value = true;
};
const deleteNews = async (row: any) => {
  let result: any = await reqDeleteNews(row.evnId);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
    dataStore.getData();
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
const cancelClick = () => {
  updataNewsDrawer.value = false;
};
const updataNews = async () => {
  updataNewsInfo.value.evnImg = updataNewsImg.value;
  let result: any = await reqUpdataNews(updataNewsInfo.value);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "更新成功" });
    updataNewsDrawer.value = false;
    dataStore.getData();
  } else {
    ElMessage({ type: "error", message: "更新失败" });
  }
};
const handleAvatarSuccess = (response: any, uploadFile: any) => {
  if (response.code == 200) {
    updataNewsImg.value = response.data;
  } else {
    ElMessage({
      type: "error",
      message: "图片上传失败",
    });
  }
};
const beforeAvatarUpload = (rawFile: any) => {
  console.log(rawFile);

  if (
    rawFile.type != "image/jpeg" &&
    rawFile.type != "image/png" &&
    rawFile.type != "image/gif" &&
    rawFile.type != "image/webp"
  ) {
    ElMessage.error("图片格式错误");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片最大为2M");
    return false;
  }
  return true;
};
onMounted(() => {
  dataStore.getData();
});
</script>

<style scoped lang="scss">
</style>