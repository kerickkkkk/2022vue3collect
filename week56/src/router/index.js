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
          path: "register",
          name: "register",
          component: () => import("@/views/frontend/RegisterView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/frontend/LoginView.vue"),
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

export default router;
