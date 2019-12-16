import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProductList from "./ProductList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import ProductCartList from "../product/ProductCartList";

class ProductsPage extends React.Component {
  state = {
    redirectToAddProductPage: false
  };

  componentDidMount() {
    const { products, authors, actions } = this.props;

    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteProduct = async product => {
    toast.success("Product deleted");
    try {
      await this.props.actions.deleteProduct(product);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };


  onAddToCart(product) {
    this.props.actions.onAddToCart(product);
  }

  render() {
    const { products, cartList, loading } = this.props;
    console.info("cartlist:");
    console.info(cartList);
    return (
      <>
        {this.state.redirectToAddProductPage && <Redirect to="/product" />}
        <h2>Products</h2>
        {loading ? (
          <Spinner />
        ) : (
            <>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary add-product"
                onClick={() => this.setState({ redirectToAddProductPage: true })}
              >
                Add Product
            </button>
              {products && products.length > 0 && (
                <ProductList
                  onDeleteClick={this.handleDeleteProduct}
                  products={products}
                  onAddToCart={this.onAddToCart.bind(this)} //change
                />
              )}
            </>
          )}
        {cartList.length > 0 && (

          <ProductCartList
            cartList={cartList}
            onChangeQty={this.props.actions.onChangeQty}
          />

        )}
      </>
    );
  }
}

ProductsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
  // onChangeQty: PropTypes.object.isRequired,
  // cartList: PropTypes.array.isRequired,
  // onAddToCart: PropTypes.func.isRequired
};

function mapStateToProps(state) {

  return {
    products:
      state.authors.authors.length === 0
        ? []
        : state.productReducer.products.map(product => {
          return {
            ...product,
            authorName: state.authors.authors.find(
              a => a.id === product.authorId
            ).name
          };
        }),
    authors: state.authors.authors,
    loading: state.apiCallsInProgress > 0,
    cartList: state.productReducer.cartList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteProduct: bindActionCreators(productActions.deleteProduct, dispatch),
      onChangeQty: bindActionCreators(productActions.onChangeQty, dispatch),
      onAddToCart: bindActionCreators(productActions.onAddToCart, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
