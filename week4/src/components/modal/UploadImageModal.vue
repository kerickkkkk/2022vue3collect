<script setup>
import { ref, shallowRef, computed, onMounted, onUnmounted, inject } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import Modal from "bootstrap/js/dist/modal";
import { useStatusStore } from "@/stores/statusStore.js";
import { useUploadImagesStore } from "@/stores/uploadImagesStore.js";

const statusStore = useStatusStore();
const uploadImagesStore = useUploadImagesStore();
const { getImagesUrl, setImage, updateImagesUrl, deleteImageUrl } =
  uploadImagesStore;
// getters 要用 storeToRefs
const { gettersImagesUrl } = storeToRefs(uploadImagesStore);
const swal = inject("$swal");
const { setLoading } = statusStore;

const reader = new FileReader();

const modal = ref(null);
const tempUrl = ref("");
const finishUrl = ref("");
const file = ref(null);
const finishUrlDom = shallowRef(null);
const imagesUrl = computed(() => gettersImagesUrl.value);
const imagesUrlRefs = shallowRef([]);
// 暫存多圖的連結
const show = () => {
  modal.value.show();
};
const uploadFile = () => {
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

const copyFinishUrl = () => {
  finishUrlDom.value.select();
  document.execCommand("copy");
  swal({
    text: "已複製",
    customClass: {
      container: "position-absolute",
    },
    toast: true,
    showConfirmButton: false,
    position: "bottom-right",
    timer: 1500,
  });
};
const copyImagesUrl = (index) => {
  imagesUrlRefs.value[index].select();
  document.execCommand("copy");
  swal({
    text: "已複製",
    customClass: {
      container: "position-absolute",
    },
    toast: true,
    showConfirmButton: false,
    position: "bottom-right",
    timer: 1500,
  });
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
  getImagesUrl();
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
              <button
                @click="copyFinishUrl"
                class="btn btn-sm btn-primary me-2"
                :disabled="finishUrl === ''"
              >
                複製上傳連結
              </button>
              <button
                @click="updateImagesUrl(finishUrl, true)"
                class="btn btn-sm btn-primary"
                :disabled="finishUrl === ''"
              >
                儲存上傳連結
              </button>
              <!-- disabled 會無法 focus 改用 readonly -->
              <input
                ref="finishUrlDom"
                type="text"
                v-model="finishUrl"
                placeholder="上傳後的圖片連結"
                readonly="readonly"
              />
              <img v-if="finishUrl" :src="finishUrl" alt="" />
            </div>
            <hr />
            <div class="row">
              <h3>儲存圖片的連結(點選取得連結)</h3>
              <div class="row">
                <div
                  v-for="(url, index) in imagesUrl"
                  :key="url"
                  class="position-relative col-4"
                >
                  <div class="px-1 py-2">
                    <input
                      :ref="(element) => (imagesUrlRefs[index] = element)"
                      :value="url"
                      type="text"
                      readonly="readonly"
                    />
                    <button
                      class="btn btn-sm btn-primary"
                      @click="copyImagesUrl(index)"
                    >
                      點擊複製
                    </button>
                    <img class="img-fluid" :src="url" alt="" />
                    <button
                      class="btn btn-outline-primary rounded-circle position-absolute top-0 end-0 py-1 px-2"
                      @click="deleteImageUrl(index)"
                    >
                      X
                    </button>
                  </div>
                </div>
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
