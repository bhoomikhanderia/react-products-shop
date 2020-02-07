import React, {Component} from "react";
import { Link } from "react-router-dom";
import Order from "../product/order/Productorder";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as productActions from "../../redux/actions/productActions";

class HomePage extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Welcome to Product Shopping!</h1>
                <p>Purchase latest Books, Courses etc.</p>
                <Link to="about" className="btn btn-primary btn-lg">
                    Learn More
                </Link>
                <h3 className="mt-3">Previous Order Summary</h3>
                {this.props.orders.length ? (
                    <div>
                        {this.props.orders.map(order => {
                            return <Order key={order.id} order={order}/>;
                        })}
                    </div>
                ) : (
                    <p>No previous orders, go shop now!</p>
                )}
            </div>
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
        // }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
