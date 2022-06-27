import App from "@/App.vue";
import "@/assets/sass/bundle.sass";
import { bootstrap } from "@/lib/modules";
import { install } from "@/lib/plugins";
import modules from "@/modules";
import plugins from "@/plugins";
import { createApp } from "vue";

install(bootstrap(createApp(App), modules), plugins).mount("#app");
