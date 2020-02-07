import React, { Component } from "react";
import Order from "../../components/product/order/Productorder";
import styled from "styled-components";
// import PropTypes from "prop-types";
// import ProductCartList from "./ProductCartList";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as productActions from "../../redux/actions/productActions";
const Confirm = styled.div`
  margin: 20px;
  text-align: center;
`;

class OrderConfirm extends Component {

    render(){
        return(
            <Confirm>
                {this.props.orders ? (
                    <div className="">
                        <h1>Congratulations!! Your order has been placed!</h1>
                        <h1>Order Summary</h1>
                        <Order key={this.props.orders[this.props.orders.length-1].id} order={this.props.orders[this.props.orders.length-1]} />
                    </div>
                ) : null}
            </Confirm>
        );

    }

}


function mapStateToProps(state) {
    return {
        orders: state.productReducer.orders
    };
}
function mapDispatchToProps(dispatch) {
    return {
        // actions: {
        //     clearCart:  bindActionCreators(productActions.clearCart, dispatch)
        //
        // }

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);

