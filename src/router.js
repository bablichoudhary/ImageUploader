import { Router } from "@vaadin/router";

export function setupRouter(outlet) {
  const router = new Router(outlet);
  router.setRoutes([
    { path: "/", component: "app-layout" },
    { path: "/about", component: "about-page" },
    { path: "(.*)", redirect: "/" },
  ]);
}
