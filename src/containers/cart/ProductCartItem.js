import React from "react";
import PropTypes from "prop-types";

class ProductCartItem extends React.Component {
  render() {
    const { id, title, price, qty, total } = this.props.product;

    const { onChangeQty } = this.props;

    return (
      <tr className="border-bottom">
        <td>
          <strong>{title}</strong>
        </td>
        <td>${Number(price).toFixed(2)}</td>
        <td className="cart-line__change-qty">
          <span className="pr-3">{qty}</span>
          <button
            className="cart-line__qty-up bg-dark border text-white"
            onClick={() => onChangeQty(id, "+")}
          >
            +
          </button>
          <button
            className="cart-line__qty-up bg-dark border text-white"
            onClick={() => onChangeQty(id, "-")}
          >
            -
          </button>
        </td>
        <td>${Number(total).toFixed(2)}</td>
      </tr>
    );
  }
}
ProductCartItem.defaultProps = {
  product: {},
  // onChangeQty: () => { }
};
ProductCartItem.propTypes = {
  product: PropTypes.object.isRequired,
  onChangeQty: PropTypes.func
};

export default ProductCartItem;
