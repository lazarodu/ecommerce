import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import "react-toastify/dist/ReactToastify.min.css";
import "react-tabs/style/react-tabs.css";
import { Header } from "./components";

import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
