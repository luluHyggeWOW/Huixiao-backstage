<template>
  <div>
    <el-form>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="searchTitleText" placeholder="请选择帖子的类别" @change="searchByTitle">
            <el-option v-for="item in searchTitle" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchSourceText" placeholder="请搜索" style="width:250px" size="large"
            :blur="searchBySource()"></el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" size="large" @click="getAll">获取所有数据</el-button>
        </el-form-item>
      </el-form>

      <el-form-item>
        <el-table :data="dataStore.DataArr" style="width: 100%" border>
          <!-- <el-table-column prop="tid" label="帖子ID" /> -->
          <el-table-column prop="tuid" label="发帖人ID" align="center" />
          <el-table-column prop="ttitile" label="帖子类别" align="center" />
          <el-table-column label="帖子图片" align="center">
            <template #default={row}>
              <img :src="row.timg" alt="" style="max-width:250px;height:120px">
            </template>
          </el-table-column>
          <el-table-column prop="tsource" label="帖子内容" align="center" />
          <el-table-column prop="tstatus" label="帖子状态" width="100" align="center" />
          <el-table-column label="操作" fixed="right" align="center">
            <template #default={row}>
              <el-button link type="error" size="large" @click="CheckForum(row)">更改状态</el-button>
              <el-button link type="primary" size="large" @click="updateForumDrawerShow(row)" disabled>编辑帖子</el-button>
              <el-popconfirm title="你确定要删除这条帖子？" @confirm="deleteForum(row)" width="200">
                <template #reference>
                  <el-button link type="warning" size="large">删除帖子</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-drawer v-model="updateForumDrawer" size="30%">
      <template #header>
        <h4>更新新闻</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="发帖人ID：" size="large" label-width="100px">
            {{updateForumInfo.tuid}}
          </el-form-item>
          <el-form-item label="帖子类别：" size="large" label-width="100px">
            <el-select v-model="updateForumInfo.ttitile" placeholder="请选择帖子的类别">
              <el-option label="#生活" value="#生活" />
              <el-option label="#学习" value="#学习" />
              <el-option label="#美食" value="#美食" />
              <el-option label="#娱乐" value="#娱乐" />
              <el-option label="#其他" value="#其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="帖子图片：" size="large" label-width="100px">
            <el-upload class="avatar-uploader" action="http://101.43.241.101:63010/user/open/upload"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" limit="1">
              <img v-if="updataForumImg" :src="updataForumImg" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="帖子内容：" size="large" label-width="100px">
            <el-input v-model="updateForumInfo.tsource" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }"
              type="textarea" placeholder="请输入新闻内容"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updateForum">更新</el-button>
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
import {
  reqForumList,
  reqCheckForum,
  reqDeleteForum,
  reqSearchByTitle,
  reqSearchBySource,
} from "@/api/forum/index";
let dataStore = DataStore();
let forumDataArr = dataStore.DataArr;
let searchText = ref<string>();
let updateForumDrawer = ref<boolean>(false);
let updateForumInfo = ref<any>();
let updataForumImg = ref<string>("");
let searchTitleText = ref<string>();
let searchSourceText = ref<string>();
let searchTitle = reactive([
  {
    value: "生活",
    label: "生活",
  },
  {
    value: "学习",
    label: "学习",
  },
  {
    value: "美食",
    label: "美食",
  },
  {
    value: "娱乐",
    label: "娱乐",
  },
  {
    value: "其他",
    label: "其他",
  },
]);

const updateForumDrawerShow = (row: any) => {
  updateForumInfo.value = row;
  updataForumImg.value = row.timg;
  updateForumDrawer.value = true;
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
const handleAvatarSuccess = (response: any, uploadFile: any) => {
  console.log(1);
  if (response.code == 200) {
    updataForumImg.value = response.data;
  } else {
    ElMessage({
      type: "error",
      message: "图片上传失败",
    });
  }
  // updateForumInfo.timg = URL.createObjectURL(uploadFile.raw!);
};
const cancelClick = () => {
  updateForumDrawer.value = false;
  updateForumInfo.value = "";
};
const updateForum = async () => {
  // let result: any = await qq();
  // if (result.code == 200) {
  //   ElMessage({ type: "success", message: "成功" });
  // } else {
  //   ElMessage({ type: "error", message: "失败" });
  // }
};
const CheckForum = async (row: any) => {
  let result: any = await reqCheckForum(
    row.tid,
    row.statu == "异常" ? "正常" : "异常"
  );
  if (result.code == 200) {
    ElMessage({ type: "success", message: "更改成功" });
  } else {
    ElMessage({ type: "error", message: "更改失败" });
  }
};
const deleteForum = async (row: any) => {
  let result: any = await reqDeleteForum(row.tid);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
    dataStore.getData();
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
const searchByTitle = async () => {
  let result: any = await reqSearchByTitle(
    dataStore.PageNo,
    dataStore.PageSize,
    searchTitleText.value as string
  );
  if (result.code == 200) {
    dataStore.DataArr = result.data.items;
    dataStore.Total = result.data.counts;
  }
};
const searchBySource = async () => {
  if (searchSourceText.value != "" && searchSourceText.value != undefined) {
    let result: any = await reqSearchBySource(
      dataStore.PageNo,
      dataStore.PageSize,
      searchSourceText.value as string
    );
    if (result.code == 200) {
      dataStore.DataArr = result.data.items;
      dataStore.Total = result.data.counts;
    }
  }
};
const getAll = () => {
  if (searchSourceText.value == "" && searchTitleText.value == "") {
  } else {
    dataStore.getData();
    searchSourceText.value = "";
    searchTitleText.value = "";
  }
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