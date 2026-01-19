import * as React from "react";

import { mount } from "mobile/MobileApp";

function MobileApp() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
}

export default MobileApp;
