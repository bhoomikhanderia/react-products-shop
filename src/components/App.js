import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/index";
import AboutPage from "./about/index";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ProductsPage from "../containers/product/index";
import ManageProductPage from "./product/manageproduct/ManageProductPage";
import { ToastContainer } from "react-toastify";
import Checkout from "../containers/checkout/Checkout";
import "react-toastify/dist/ReactToastify.css";
import OrderConfirm from "../containers/checkout/OrderConfirm";

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
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderconfirm" component={OrderConfirm}  />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;