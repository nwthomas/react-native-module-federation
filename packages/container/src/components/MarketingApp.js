import * as React from "react";

import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

function MarketingApp() {
  const ref = React.useRef(null);
  const history = useHistory();

  const handleOnNavigate = React.useCallback((location) => {
    const { pathname: nextPathname } = location;
    const { pathname: currentPathname } = history.location;

    if (nextPathname !== currentPathname) {
      history.push(nextPathname);
    }
  }, []);

  React.useEffect(() => {
    const options = mount(ref.current, {
      onNavigate: handleOnNavigate,
      initialPath: history.location.pathname,
    });

    const { onParentNavigate } = options;

    history.listen(onParentNavigate);
  }, [handleOnNavigate]);

  return <div ref={ref} />;
}

export default MarketingApp;
