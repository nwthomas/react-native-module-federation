import Dashboard from "./components/Dashboard.vue";
import { createApp } from "vue";

const mount = (element) => {
  const app = createApp(Dashboard);
  app.mount(element);
};

const rootElement = document.getElementById("dashboard-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  mount(rootElement);
}

export { mount };
