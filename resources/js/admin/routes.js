import React from "react";
import { Switch, Route } from "react-router-dom";

const Routes = () => {
  const route = process.env.MIX_APP_ROUTE;
  return (
    <Switch>
      {/* <Route path={`${route}/home/produtos`} component={Produto} />
      <Route path={`${route}/home`} component={Main} /> */}
    </Switch>
  );
};

export default Routes;
