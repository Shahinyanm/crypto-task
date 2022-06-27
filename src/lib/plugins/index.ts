import type { App } from "vue";

export type PluginInstaller = (app: App) => void;

export const install = (app: App, plugins: PluginInstaller[]): App => {
  for (let i = 0; i < plugins.length; i++) {
    plugins[i](app);
  }

  return app;
};
