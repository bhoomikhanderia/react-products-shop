import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Error from "../../components/common/Error";
import ProductCartList from "../cart/ProductCartList";
import styled from "styled-components";
import {bindActionCreators} from "redux";
import * as productActions from "../../redux/actions/productActions";

const Checkoutform = styled.div`
  margin: 20px;
  text-align: center;
  div.from-message {
    color: red;
  }
`;

const validationSchema = Yup.object().shape({
    fname: Yup.string()
        .min(3, "Must be more than 2 characters")
        .required("*This field is compulsory"),
    lname: Yup.string()
        .min(3, "Must be more than 3 characters"),
    suburb: Yup.string()
        .min(3, "Must be more than 3 characters")
        .max(255, "Must be shorter than 255")
        .required("*This field is compulsory"),
    state: Yup.string()
        .min(2, "Must be more than 2 characters")
        .max(10, "Must be shorter than 10")
        .required("*This field is compulsory"),
    postcode: Yup.string()
        .min(4, "Must have 4 digits")
        .max(4, "Invalid Postcode")
        .required("*This field is compulsory"),
    phoneno: Yup.string()
        .min(10, "Must have 10 digits")
        .max(10, "Invalid Phone Number")
        .required("*This field is compulsory")
});
class Checkout extends Component {

    render() {
        return (

            <Checkoutform>
                <div className="checkout form">
                    <h3>Please fill following details for Checkout</h3>
                    <h4>Shipping Address</h4>
                    <Formik
                        initialValues={{ fname: "", lname: "", suburb: "", state: "", postcode: "", phoneno: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            this.props.actions.clearCart(
                                values.fname,
                                values.lname,
                                values.suburb,
                                values.state,
                                values.postcode,
                                values.phoneno
                            );
                            setTimeout(() => {
                                resetForm();
                                setSubmitting(false);
                                this.props.history.push("/orderconfirm");
                            }, 500);
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        name="fname"
                                        placeholder="First Name"
                                        value={values.fname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            touched.fname && errors.fname ? "has-error" : null
                                        }
                                    />
                                    <Error touched={touched.fname} message={errors.fname} />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        name="lname"
                                        placeholder="Last Name"
                                        value={values.lname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            touched.lname && errors.lname ? "has-error" : null
                                        }
                                    />
                                    <Error touched={touched.lname} message={errors.lname} />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        name="suburb"
                                        placeholder="Suburb"
                                        value={values.suburb}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            touched.suburb && errors.suburb ? "has-error" : null
                                        }
                                    />
                                    <Error touched={touched.suburb} message={errors.suburb} />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            touched.state && errors.state ? "has-error" : null
                                        }
                                    />
                                    <Error touched={touched.state} message={errors.state} />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        type="number"
                                        name="postcode"
                                        placeholder="Postcode"
                                        value={values.postcode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            touched.postcode && errors.postcode ? "has-error" : null
                                        }
                                    />
                                    <Error touched={touched.postcode} message={errors.postcode} />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        name="phoneno"
                                        placeholder="Phone Number"
                                        value={values.phoneno}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            touched.phoneno && errors.phoneno ? "has-error field" : null
                                        }
                                    />
                                    <Error touched={touched.phoneno} message={errors.phoneno} />
                                </div>
                                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </Checkoutform>

        );
    }
}

const mapStateToProps = state => {
    return {};
};

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            clearCart:  bindActionCreators(productActions.clearCart, dispatch)
        }

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
