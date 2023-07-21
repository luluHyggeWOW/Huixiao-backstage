<template>
  <div>
    <el-form>
      <el-form-item>
        <Search></Search>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="date" label="商品名称" />
          <el-table-column prop="name" label="商品类别" />
          <el-table-column prop="name" label="商品封面图片">
            <template #default>
              <img src="../../assets/images/404.png" alt="" style="max-width:250px;height:120px">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品内容" />
          <el-table-column prop="name" label="发布人" />
          <el-table-column label="操作" fixed="right">
            <template #default={row}>
              <el-button link type="primary
              " size="large" @click="updateShopDrawerShow(row)">编辑商品</el-button>
              <el-popconfirm title="你确定要删除此商品吗?" @confirm="deleteShop(row)">
                <template #reference>
                  <el-button link type="warning" size="large">删除商品</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>
    </el-form>
    <el-drawer v-model="updateShopDrawer" :direction="direction" size="30%">
      <template #header>
        <h4>更新商品</h4>
      </template>
      <template #default={row}>
        <el-form>
          <el-form-item label="发布人：" size="large" label-width="100px">
            {{updateShopInfo.name}}A
          </el-form-item>
          <el-form-item label="商品名称：" size="large" label-width="100px">
            <el-input v-model="updateShopInfo.name" style="width:70%" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form>
            <el-form-item label="商品内容：" size="large" label-width="100px">
              <el-input v-model="updateShopInfo.text" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }"
                type="textarea" placeholder="请输入商品内容" :maxlength="100"></el-input>
            </el-form-item>
          </el-form>
          <el-form-item label="商品价格：" size="large" label-width="100px">
            <el-input-number v-model="updateShopInfo.price" :precision="2" :step="0.1" :max="9999" placeholder="请输入商品价格"
              style="width:50%" />
            <p style="font-size:30px">￥</p>
          </el-form-item>
          <el-form-item label="商品类别：" size="large" label-width="100px">
            <el-select v-model="updateShopInfo.class" placeholder="请选择帖子的类别">
              <el-option label="电子产品" value="shanghai" />
              <el-option label="日用品" value="beijing" />
              <el-option label="书本" value="beijing" />
              <el-option label="服装类" value="beijing" />
              <el-option label="其他" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="商品图片：" size="large" label-width="100px">
            <el-upload v-model:file-list="updateShopInfo.img"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove" limit="6"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image"
                style="max-width:800px;max-height:500px;margin:auto" />
            </el-dialog>
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
import { onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { DataStore } from "@/store/date/index";
let dataStore = DataStore();
let shopDataArr = dataStore.DataArr;
let searchText = ref<string>();
let updateShopDrawer = ref<boolean>(false);
let updateShopInfo = reactive({
  name: "",
  text: "",
  price: "",
  class: "",
  img: [
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
    {
      name: "plant-1.png",
      url: "/images/plant-1.png",
    },
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
    {
      name: "plant-2.png",
      url: "/images/plant-2.png",
    },
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
    {
      name: "figure-1.png",
      url: "/images/figure-1.png",
    },
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
    {
      name: "figure-2.png",
      url: "/images/figure-2.png",
    },
  ],
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
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
const updateShopDrawerShow = () => {
  updateShopDrawer.value = true;
};
const updateShop = async () => {
  let result: any = await q;
  if (result.code == 200) {
    ElMessage({ type: "success", message: "成功" });
  } else {
    ElMessage({ type: "error", message: "失败" });
  }
};
const handleRemove = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
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
  updateShopInfo.img = URL.createObjectURL(uploadFile.raw!);
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