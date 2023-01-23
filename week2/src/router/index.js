import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
          component: () => import("../views/IndexView.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("../views/RegisterView.vue"),
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
          name: "adminindex",
          component: () => import("../views/dashboard/DashboardIndex.vue"),
        },
      ],
    },
  ],
});

export default router;
