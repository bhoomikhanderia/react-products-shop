import productReducer from "./productReducer";
import * as actions from "../actions/productActions";

it("should add product when passed CREATE_PRODUCT_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newProduct = {
    title: "C"
  };

  const action = actions.createProductSuccess(newProduct);

  // act
  const newState = productReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update product when passed UPDATE_PRODUCT_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];

  const product = { id: 2, title: "New Title" };
  const action = actions.updateProductSuccess(product);

  // act
  const newState = productReducer(initialState, action);
  const updatedProduct = newState.find(a => a.id == product.id);
  const untouchedProduct = newState.find(a => a.id == 1);

  // assert
  expect(updatedProduct.title).toEqual("New Title");
  expect(untouchedProduct.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
