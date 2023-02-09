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
  <nav aria-label="Page navigation justify-content-center">
    <ul class="pagination">
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
        v-for="(n, i) in props.total_pages"
        :key="n"
        :class="{
          active: i === current_page - 1,
        }"
        class="page-item"
      >
        <a @click.prevent="getPage(n)" class="page-link" href="#">{{ n }}</a>
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

<style scoped></style>
