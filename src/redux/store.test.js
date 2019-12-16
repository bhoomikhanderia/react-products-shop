import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as productActions from "./actions/productActions";

it("Should handle creating products", function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const product = {
    title: "Clean Code"
  };

  // act
  const action = productActions.createProductSuccess(product);
  store.dispatch(action);

  // assert
  const createdProduct = store.getState().products[0];
  expect(createdProduct).toEqual(product);
});
