<template>
  <div>
    <el-form>
      <el-form inline="true">
        <el-form-item>
          <el-input v-model="searchByNameText" placeholder="请搜索标题" style="width:250px" size="large"
            :blur="searchByName()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchBySourceText" placeholder="请搜索内容" style="width:250px" size="large"
            :blur="searchBySource()"></el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" size="large" @click="getAll">获取所有数据</el-button>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-table :data="dataStore.DataArr" style="width: 100%" border>
          <el-table-column prop="shopName" label="商品名称" show-overflow-tooltip align="center" />
          <el-table-column prop="shopPrice" label="商品价格" align="center">
            <template #default={row}>
              {{row.shopPrice}}￥
            </template></el-table-column>
          <!-- <el-table-column label="商品封面图片">
            <template #default={row}>
              <img :src="row.userUrl" alt="" style="max-width:250px;height:30px;">
            </template>
          </el-table-column> -->
          <el-table-column prop="shopIntuoduct" label="商品内容" show-overflow-tooltip align="center" />
          <el-table-column prop="userName" label="发布人" align="center" />
          <el-table-column label="操作" fixed="right" align="center">
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
      <template #default>
        <el-form>
          <el-form-item label="商品名称：" size="large" label-width="100px">
            <el-input v-model="updateShopInfo.shopName" style="width:70%" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品类别：" size="large" label-width="100px">
            <el-select v-model="shopClassText" placeholder="请选择商品的类别">
              <el-option v-for="item in ShopClass" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品内容：" size="large" label-width="100px">
            <el-input v-model="updateShopInfo.shopIntuoduct" style="width:70%" :autosize="{ minRows: 2, maxRows: 6 }"
              type="textarea" placeholder="请输入商品内容" :maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="商品价格：" size="large" label-width="100px">
            <el-input-number v-model="updateShopInfo.shopPrice" :precision="2" :step="1" :max="9999"
              placeholder="请输入商品价格" style="width:50%" />
            <p style="font-size:30px">￥</p>
          </el-form-item>

        </el-form>

      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="updateShop()">更新</el-button>
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
import {
  reqDeleteShop,
  reqSearchBySource,
  reqSearchByName,
  reqUpdataShop,
} from "@/api/shop/index";
let dataStore = DataStore();
let updateShopDrawer = ref<boolean>(false);
let updateShopInfo = ref<any>();
let searchByNameText = ref<string>("");
let searchBySourceText = ref<string>("");
let ShopClass = reactive([
  {
    value: "电子产品",
    label: "电子产品",
  },
  {
    value: "日用品",
    label: "日用品",
  },
  {
    value: "书本",
    label: "书本",
  },
  {
    value: "服装类",
    label: "服装类",
  },
  {
    value: "其他",
    label: "其他",
  },
]);
let shopClassText = ref<string>();
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
const search = () => {};
const searchByName = async () => {
  if (searchByNameText.value != "") {
    let result: any = await reqSearchByName(
      dataStore.PageNo,
      dataStore.PageSize,
      searchByNameText.value as string
    );
    if (result.code == 200) {
      dataStore.DataArr = result.data.items;
      dataStore.Total = result.data.counts;
    }
  }
};
const searchBySource = async () => {
  if (searchBySourceText.value != "") {
    let result: any = await reqSearchBySource(
      dataStore.PageNo,
      dataStore.PageSize,
      searchBySourceText.value as string
    );
    if (result.code == 200) {
      dataStore.DataArr = result.data.items;
      dataStore.Total = result.data.counts;
    }
  }
};
const updateShopDrawerShow = (row: any) => {
  updateShopInfo.value = row;
  updateShopDrawer.value = true;
  shopClassText.value = row.shopClass;
  console.log(11, row, shopClassText.value);
};
const updateShop = async () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let formattedDate = year + "-" + month + "-" + day;
  let data = {
    shopId: updateShopInfo.value.shopId,
    shopName: updateShopInfo.value.shopName,
    shopIntuoduct: updateShopInfo.value.shopIntuoduct,
    shopPrice: updateShopInfo.value.shopPrice,
    shopData: formattedDate,
    shopClass: shopClassText.value,
  };
  let result: any = await reqUpdataShop(data);
  if (result.code == 200) {
    updateShopInfo.value = "";
    updateShopDrawer.value = false;
    dataStore.getData();
    ElMessage({ type: "success", message: "更新成功" });
  } else {
    ElMessage({ type: "error", message: "更新失败" });
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

const deleteShop = async (row: any) => {
  let result: any = await reqDeleteShop(row.shopId);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
    dataStore.getData();
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
const getAll = () => {
  searchByNameText.value = "";
  searchBySourceText.value = "";
  dataStore.getData();
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