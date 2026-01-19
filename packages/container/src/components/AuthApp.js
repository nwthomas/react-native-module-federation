import * as React from "react";

import { mount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";

function AuthApp({ onSignIn }) {
  const ref = React.useRef(null);
  const history = useHistory();

  const handleOnNavigate = React.useCallback((location) => {
    const { pathname: nextPathname } = location;
    const { pathname: currentPathname } = history.location;

    if (nextPathname !== currentPathname) {
      history.push(nextPathname);
    }
  }, []);

  const handleOnSignIn = React.useCallback(() => {
    onSignIn();
    history.push("/dashboard");
  }, [history, onSignIn]);

  React.useEffect(() => {
    const options = mount(ref.current, {
      onNavigate: handleOnNavigate,
      initialPath: history.location.pathname,
      onSignIn: handleOnSignIn,
    });

    const { onParentNavigate } = options;

    history.listen(onParentNavigate);
  }, [handleOnNavigate, onSignIn]);

  return <div ref={ref} />;
}

export default AuthApp;
