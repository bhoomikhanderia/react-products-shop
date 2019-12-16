import React from "react";
import { cleanup, render } from "react-testing-library";
import ProductForm from "./ProductForm";

afterEach(cleanup);

function renderProductForm(args) {
  let defaultProps = {
    authors: [],
    product: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<ProductForm {...props} />);
}

it("should render Add Product header", () => {
  const { getByText } = renderProductForm();
  getByText("Add Product");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderProductForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText, debug } = renderProductForm({ saving: true });
  // debug();
  getByText("Saving...");
});
