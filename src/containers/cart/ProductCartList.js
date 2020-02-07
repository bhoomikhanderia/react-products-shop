import React from "react";
import ProductCartItem from "./ProductCartItem";
import PropTypes from "prop-types";

class ProductCartList extends React.Component {
  render() {
    const { cartList, onChangeQty } = this.props;
    console.log(onChangeQty);
    return (
      <table className=" table">
        <thead>
          <tr className="border-bottom bg-dark text-white">
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map(product => {
            console.log(product);
            return (
              <ProductCartItem
                key={product.id}
                product={product}
                onChangeQty={onChangeQty}
              />

            );
          })}
        </tbody>
      </table>
    );
  }
}
ProductCartList.defaultProps = {
  cartList: [],

};
ProductCartList.propTypes = {
  cartList: PropTypes.array.isRequired,
  onChangeQty: PropTypes.func
};

export default ProductCartList;
