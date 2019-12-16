import React from "react";
import { mount } from "enzyme";
import { authors, newProduct, products } from "../../../tools/mockData";
import { ManageProductPage } from "./ManageProductPage";

function render(args) {
  const defaultProps = {
    authors,
    products,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveProduct: jest.fn(),
    loadAuthors: jest.fn(),
    loadProducts: jest.fn(),
    product: newProduct,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageProductPage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
