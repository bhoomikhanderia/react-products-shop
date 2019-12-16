import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function ProductList({ products, onDeleteClick, onAddToCart, added }) {
  return (
    <table className="table">
      <thead><tr><th></th><th>Title</th><th>Author</th><th>Category</th><th>Price</th><th></th></tr></thead>
      <tbody>
        {products.map(product => {
          return (
            <tr key={product.id}>
              <td>
                {added ? (
                  <button className="btn bg-dark text-white" disabled>
                    Added to cart
                  </button>
                ) : (
                    <button
                      className="btn bg-primary text-white"
                      onClick={() => onAddToCart(product)}
                    >
                      Add to cart
                  </button>
                  )}
              </td>
              <td>
                <Link to={"/product/" + product.slug}>{product.title}</Link>
              </td>
              <td>{product.authorName}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
ProductList.defaultProps = {
  added: false,
  products: []
};
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  added: PropTypes.bool,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductList;
