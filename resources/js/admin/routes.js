import React from "react";
import { Switch, Route } from "react-router-dom";
import { Produto, Venda, User } from "./pages";

const Routes = () => {
  const route = process.env.MIX_APP_ROUTE;
  return (
    <Switch>
      <Route path={`${route}/home/categorias/:idcat`} component={Produto} />
      <Route path={`${route}/home/categorias`} component={Produto} />
      <Route path={`${route}/home/produtos/:idprod`} component={Produto} />
      <Route path={`${route}/home/produtos`} component={Produto} />
      <Route path={`${route}/home/vendas`} component={Venda} />
      <Route path={`${route}/home/users`} component={User} />
    </Switch>
  );
};

export default Routes;
