import {
  createRouter as create,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export const createRouter = (routes: RouteRecordRaw[]) =>
  create({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
      return {
        el: "body",
        top: 0,
      };
    },
    routes,
  });
