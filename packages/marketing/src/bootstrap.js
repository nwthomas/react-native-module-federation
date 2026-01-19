import * as React from "react";

import { createBrowserHistory, createMemoryHistory } from "history";

import App from "./App";
import ReactDOM from "react-dom";

const mount = (element, options) => {
  const { defaultHistory, onNavigate } = options;

  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, element);

  return {
    onParentNavigate(location) {
      const { pathname: nextPathname } = location;
      const { pathname: currentPathname } = history.location;

      if (nextPathname !== currentPathname) {
        history.push(nextPathname);
      }
    },
  };
};

const rootElement = document.getElementById("marketing-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  const history = createBrowserHistory();

  mount(rootElement, { defaultHistory: history });
}

export { mount };
