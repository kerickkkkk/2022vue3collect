<script setup>
const emit = defineEmits(["getPage"]);
const props = defineProps({
  current_page: {
    type: Number,
    default() {
      return 0;
    },
  },
  total_pages: {
    type: Number,
    default() {
      return 0;
    },
  },
  has_next: {
    type: Boolean,
    default() {
      return false;
    },
  },
  has_pre: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const getPage = (page) => {
  emit("getPage", page);
};
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li :class="{ disabled: !props.has_pre }" class="page-item">
        <a
          @click.prevent="
            getPage(props.current_page - 1 ? props.current_page - 1 : 0)
          "
          class="page-link"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="n in props.total_pages"
        :key="n"
        :class="{
          active: n === props.current_page,
        }"
        class="page-item"
      >
        <!-- 修正 會重複觸發  以 css 觸發-->
        <a
          :disabled="n === props.current_page && 'disabled'"
          @click.prevent="getPage(n)"
          class="page-link"
          >{{ n }}</a
        >
      </li>
      <li :class="{ disabled: !props.has_next }" class="page-item">
        <a
          @click.prevent="
            getPage(
              props.current_page + 1 <= props.total_pages
                ? props.current_page + 1
                : props.total_pages
            )
          "
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
// 處理 觸發 與 樣式
a[disabled="disabled"] {
  pointer-events: none;
}
a:not([disabled="disabled"]) {
  cursor: pointer;
}
</style>
