import { createRouter } from "@/plugins/vue-router";
import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
export interface Module {
  routes?: RouteRecordRaw[];
  extend?: (app: App) => void;
}

export const bootstrap = (app: App, modules: Module[]): App => {
  const routes: RouteRecordRaw[] = [];

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];

    if (module.routes) {
      routes.push(...module.routes);
    }

    if (module.extend) {
      module.extend(app);
    }
  }

  app.use(createRouter(routes));

  return app;
};
