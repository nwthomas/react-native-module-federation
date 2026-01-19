import App from "./App.web";
import { AppRegistry } from "react-native";

if (module.hot) {
  module.hot.accept();
}

const mount = element => {
  AppRegistry.registerComponent("mobile", () => App);
  AppRegistry.runApplication("mobile", {
    initialProps: {},
    rootTag: element,
  });
};

const rootElement = document.getElementById("mobile-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  mount(rootElement);
}

export { mount };
