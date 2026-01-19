import * as React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazyApp = React.lazy(() => import("./components/MarketingApp"));
const AuthLazyApp = React.lazy(() => import("./components/AuthApp"));
const DashboardLazyApp = React.lazy(() => import("./components/DashboardApp"));
const MobileLazyApp = React.lazy(() => import("./components/MobileApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const handleOnSignedIn = React.useCallback(() => {
    setIsSignedIn(true);
  }, []);

  const handleOnSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header onSignOut={handleOnSignOut} signedIn={isSignedIn} />
        <React.Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/mobile">
              <MobileLazyApp />
            </Route>
            <Route path="/auth">
              <AuthLazyApp onSignIn={handleOnSignedIn} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <h1>Sign in to continue</h1>}
              {isSignedIn && <DashboardLazyApp />}
            </Route>
            <Route path="/">
              <MarketingLazyApp />
            </Route>
          </Switch>
        </React.Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;
