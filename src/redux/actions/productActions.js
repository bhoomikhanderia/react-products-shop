import * as types from "./actionTypes";
import * as productApi from "../../api/productApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// export function createProduct(product) {
//   return { type: types.CREATE_PRODUCT, product };
// }

export function loadProductSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function updateProductSuccess(product) {
  return { type: types.UPDATE_PRODUCT_SUCCESS, product };
}

export function createProductSuccess(product) {
  return { type: types.CREATE_PRODUCT_SUCCESS, product };
}

export function deleteProductOptimistic(product) {
  return { type: types.DELETE_PRODUCT_OPTIMISTIC, product };
}

export function loadProducts() {
  return function (dispatch) {
    dispatch(beginApiCall());
    console.log("productApi");
    console.log(productApi.getProducts());
    return productApi
      .getProducts()
      .then(products => {
        console.log("products");
        console.log(products);
        dispatch(loadProductSuccess(products));
      })
      .catch(error => {
        console.log("error");
        console.log(error);
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveProduct(product) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return productApi
      .saveProduct(product)
      .then(savedProduct => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteProduct(product) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteProductOptimistic(product));
    return productApi.deleteProduct(product.id);
  };
}

//change
export function onAddToCart(product) {
  // return onChangeQty(id);
  return { type: types.ON_ADD_TO_CART, product };
}

export function onChangeQty(id, direction) {
  const direction_object = { id, direction };
  // dispatch(onChangeQty(id, direction));
  return { type: types.ON_CHANGE_QTY, direction_object };

}
