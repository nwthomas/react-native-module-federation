import * as React from "react";

import { createBrowserHistory, createMemoryHistory } from "history";

import App from "./App";
import ReactDOM from "react-dom";

const mount = (element, options) => {
  const { defaultHistory, initialPath, onNavigate, onSignIn } = options;

  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, element);

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

const rootElement = document.getElementById("auth-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  const history = createBrowserHistory();

  mount(rootElement, { defaultHistory: history });
}

export { mount };
