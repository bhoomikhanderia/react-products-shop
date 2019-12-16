import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/index";
import AboutPage from "./about/index";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ProductsPage from "./product/index";
import ManageProductPage from "./product/ManageProductPage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/product/:slug" component={ManageProductPage} />
        <Route path="/product" component={ManageProductPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
