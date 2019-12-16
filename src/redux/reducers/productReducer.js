/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
import * as types from "../actions/actionTypes";
// import initialState from "./initialState";
const initialState = {
  products: [],
  cartList: []
};

export default function productReducer(state = initialState, action) {
  console.log("start state");
  console.log("state_action");
  console.log(action);
  const { products, cartList } = state;
  switch (action.type) {
    case types.CREATE_PRODUCT_SUCCESS:
      // return [...state, { ...action.product }];
      return {
        ...state,
        product: action.product
      };

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.product.id ? action.product : product
        )
      };

    case types.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products
      };

    case types.DELETE_PRODUCT_OPTIMISTIC:
      const new_products = products.filter(
        product => product.id !== action.product.id
      );
      return {
        ...state,
        products: new_products
      };

    case types.ON_ADD_TO_CART:
      let temp_cartList = [...cartList];
      const temp_products = [...products];

      let productFilter = temp_products.filter(temp_product => {
        if (temp_product.id === action.product.id) {
          temp_product.added = 1;
          return temp_product;
        }
      });

      if (productFilter.length > 0) {
        productFilter[0].qty = 1;
        productFilter[0].total = productFilter[0].price;
      }

      return {
        ...state,
        cartList: [...temp_cartList, productFilter[0]]
      };

    // if (state.cartList.find(cart_product => cart_product.id === action.product.id)) {
    //   let temp_cart_product = state.cartList.find(
    //     cart_product => cart_product.id === action.product.id
    //   );
    //   temp_cart_product.qty++;
    //   let tempcart_products = [...state.cartList];
    //   tempcart_products.filter(cart_product => cart_product.id === action.product.id);
    //   tempcart_products.concat(temp_cart_product);
    //   return {
    //     ...state,
    //     cartList: tempcart_products
    //   };
    // } else {
    //   let temp_product = { ...action.product };
    //   temp_product.cart_quantity = 1;

    //   return {
    //     ...state,
    //     cartList: [...state.cartList, temp_product]
    //   };
    // }
    case types.ON_CHANGE_QTY:
      // const product = state.product;

      const { direction, id } = action.direction_object;
      const temp_cartlist = cartList.map(product => {
        if (product.id === id) {
          if (direction === "+") {
            product.qty += 1;
            product.total = product.price * product.qty;
          } else {
            if (product.qty > 0) {
              product.qty -= 1;
              product.total = product.price * product.qty;

              if (product.qty === 0) {
                const index = cartList.findIndex(product => product.id === id);
                const productIndex = state.products.findIndex(
                  product => product.id === id
                );
                state.products[productIndex].added = 0;
                cartList.splice(index, 1);
              }
            }
          }
        }
        return product;
      });

      return {
        ...state,
        cartList: temp_cartlist
      };

    default:
      return state;
  }
}
