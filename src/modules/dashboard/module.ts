import type { Module } from "@/lib/modules";

const module: Module = {
  routes: [
    {
      name: "dashboard",
      path: "/",
      component: () => import("@/modules/dashboard/views/Dashboard.vue"),
    },
  ],
};

export default module;
