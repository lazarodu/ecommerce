import React from "react";
import { Switch, Route } from "react-router-dom";
import { Main } from "./pages";

const Routes = () => {
  const route = process.env.MIX_APP_ROUTE;
  return (
    <Switch>
      <Route path={`${route}/carrinho`} component={Main} />
    </Switch>
  );
};

export default Routes;
