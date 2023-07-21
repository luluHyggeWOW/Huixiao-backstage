<template>
  <div>
    <el-form>
      <el-form-item>
        <Search></Search>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="date" label="帖子ID" />
          <el-table-column prop="name" label="帖子类别" />
          <el-table-column prop="name" label="帖子图片">
            <template #default>
              <img src="../../assets/images/404.png" alt="" style="max-width:250px;height:120px">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="帖子内容" />
          <el-table-column prop="name" label="发帖人" />
          <el-table-column label="操作" fixed="right">
            <template #default={row}>
              <el-button link type="primary" size="large" @click="updateForumDrawerShow(row)">编辑帖子</el-button>
              <el-popconfirm title="Are you sure to delete this?" @confirm="1">
                <template #reference>
                  <el-button link type="warning" size="large">删除帖子</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>
    </el-form>
    <el-drawer v-model="updateForumDrawer" :direction="direction" size="30%">
      <template #header>
        <h4>更新新闻</h4>
      </template>
      <template #default={row}>
        <el-form>
          <el-form-item label="发帖人：" size="large" label-width="100px">
            {{updateNewsText}}
          </el-form-item>
          <el-form-item label="帖子类别：" size="large" label-width="100px">
            <el-select v-model="updateForumInfo.class" placeholder="请选择帖子的类别">
              <el-option label="生活" value="shanghai" />
              <el-option label="学习" value="beijing" />
              <el-option label="美食" value="beijing" />
              <el-option label="娱乐" value="beijing" />
              <el-option label="其他" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="帖子图片：" size="large" label-width="100px">
            <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" limit="1">
              <img v-if="updateForumInfo.img" :src="updateForumInfo.img" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="帖子内容：" size="large" label-width="100px">
            <el-input v-model="updateNewsText" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea"
              placeholder="请输入新闻内容"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updateNews()">更新</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { log } from "console";
import { ref, reactive, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { DataStore } from "@/store/date/index";
let dataStore = DataStore();
let forumDataArr = dataStore.DataArr;
let searchText = ref<string>();
let updateForumDrawer = ref<boolean>(false);
let updateForumInfo = reactive({
  text: "",
  img: "",
  class: "",
});
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
const search = () => {
  console.log(1);
};
const updateForumDrawerShow = () => {
  updateForumDrawer.value = true;
};

const beforeAvatarUpload = (rawFile: any) => {
  if (
    rawFile.type !== "image/jpeg" ||
    rawFile.type !== "image/png" ||
    rawFile.type !== "image/gif" ||
    rawFile.type !== "image/webp"
  ) {
    ElMessage.error("图片格式错误");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片最大为2M");
    return false;
  }
  return true;
};
const handleAvatarSuccess = (response, uploadFile) => {
  updateForumInfo.img = URL.createObjectURL(uploadFile.raw!);
};
onMounted(() => {
  dataStore.getData();
});
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>