import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProducts, saveProduct } from "../../redux/actions/productActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { newProduct } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageProductPage({
  products,
  authors,
  loadAuthors,
  loadProducts,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    } else {
      setProduct({ ...props.product });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category, price } = product; //change
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";
    if (!price) errors.price = "Price is required"; //change

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveProduct(product)
      .then(() => {
        toast.success("Course saved.");
        history.push("/products");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  // return <Spinner />;
  return authors.length === 0 || products.length === 0 ? (
    <Spinner />
  ) : (
      <ProductForm
        product={product}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    );
}

ManageProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getProductBySlug(products, slug) {
  return products.find(product => product.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {

  const slug = ownProps.match.params.slug;
  const product =
    slug && state.productReducer.products.length > 0
      ? getProductBySlug(state.productReducer.products, slug)
      : newProduct;
  return {
    product,
    products: state.productReducer.products,
    authors: state.authors.authors
  };
}

const mapDispatchToProps = {
  loadProducts,
  loadAuthors,
  saveProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProductPage);
