import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 导入 web 路由集合
import { webRouters } from "./web";

// 配置路由
const routerConfig = {
  mode: "history",
  base: process.env.BASE_URL,
  routes: webRouters
};

// 配置 vue-router
const router = new Router(routerConfig);

export default router;
