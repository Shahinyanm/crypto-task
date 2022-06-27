import type { PluginInstaller } from "@/lib/plugins";
import { createPinia } from "pinia";

const install: PluginInstaller = (app) => {
  const store = createPinia();

  app.use(store);
};

export default install;
