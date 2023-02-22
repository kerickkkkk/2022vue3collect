<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import axios from "axios";
import Modal from "bootstrap/js/dist/modal";
import { useStatusStore } from "@/stores/statusStore.js";
import { useUploadImagesStore } from "@/stores/uploadImagesStore.js";

const statusStore = useStatusStore();
const uploadImagesStore = useUploadImagesStore();
const { setImage } = uploadImagesStore;
const swal = inject("$swal");
const { setLoading } = statusStore;

const reader = new FileReader();

const modal = ref(null);
const tempUrl = ref("");
const finishUrl = ref("");
const file = ref(null);
// 暫存多圖的連結
const show = () => {
  modal.value.show();
};
const uploadFile = () => {
  console.log("uploadFile", file.value);
  if (!file.value) {
    swal("檔案不得為空");
    return false;
  }
  setLoading(true);
  setImage(file.value)
    .then(({ data }) => {
      setLoading(false);
      console.dir(data.imageUrl);
      finishUrl.value = data.imageUrl;
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};
const fileHandler = (e) => {
  reader.readAsDataURL(e.target.files[0]);
  file.value = e.target.files[0];
};

const fileOnLoadHandler = (e) => {
  tempUrl.value = e.target.result;
};

onMounted(() => {
  // 從 cookie 取出
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ttShopToken="))
    ?.split("=")[1];

  // 存取 ID 只會掛載一次
  modal.value = new Modal("#modal", {
    // 避免連點的時候 有 Uncaught RangeError: Maximum call stack size exceeded.
    focus: false,
  });
  axios.defaults.headers.common["Authorization"] = token;
  reader.addEventListener("load", fileOnLoadHandler);
});

onUnmounted(() => {
  reader.removeEventListener("load", fileOnLoadHandler);
});
// 開放方法使用
defineExpose({ show });
</script>
<template>
  <div
    id="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="modalLabel" class="modal-title">
            <span>上傳檔案</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <h3>上傳檔案</h3>
              <div class="input-group">
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile04"
                  aria-describedby="fileInput"
                  aria-label="Upload"
                  @change="fileHandler"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="fileInput"
                  @click="uploadFile"
                  :disabled="tempUrl === ''"
                >
                  {{ tempUrl === "" ? "選擇" : "上傳" }}圖片
                </button>
              </div>
              預覽圖片
              <img v-if="tempUrl" :src="tempUrl" alt="" />
            </div>
            <div class="col-6">
              <h3>上傳完成</h3>
              <button class="btn btn-sm btn-primary">儲存連結</button>
              <img v-if="finishUrl" :src="finishUrl" alt="" />
            </div>
            <hr />
            <div class="row">
              <h3>儲存圖片的連結(點選取得連結)</h3>
              <div class="row">
                <div class="col-3"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click="resetProduct"
          >
            取消
          </button>
          <button @click="uploadFile" type="button" class="btn btn-primary">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
