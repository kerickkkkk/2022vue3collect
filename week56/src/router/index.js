import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/frontend/HomeView.vue";
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "",
          name: "index",
          component: () => import("@/views/frontend/IndexView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/frontend/LoginView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/frontend/AboutView.vue"),
        },
        {
          path: "messages",
          name: "messages",
          component: () => import("@/views/frontend/MessagesView.vue"),
        },
        {
          path: "message/:id",
          name: "message",
          component: () => import("@/views/frontend/MessagesView.vue"),
        },
        {
          path: "likes",
          name: "likes",
          component: () => import("@/views/frontend/LikesView.vue"),
        },
        {
          path: "products",
          name: "products",
          component: () => import("../views/frontend/ProductsView.vue"),
        },
        {
          path: "product/:id",
          name: "product",
          component: () => import("../views/frontend/ProductView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("../views/frontend/CartView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/dashboard/DashboardView.vue"),
      children: [
        {
          path: "",
          name: "admin_index",
          component: () => import("../views/dashboard/DashboardIndex.vue"),
        },
        {
          path: "products",
          name: "admin_products",
          component: () => import("../views/dashboard/DashboardProducts.vue"),
        },
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   // 路由切換修改 title 
//   if (to.meta.title) {
//       document.title = to.meta.title
//   }
//   next()
// })

export default router;
