import React from "react";
import styled from "styled-components";

const Singleorder = styled.div`
  text-align: center;
  margin: 20px;
  h3 {
    background: #000;
    width: 50%;
    margin: 0px auto;
    color: #fff;
    padding: 10px;
  }
  table {
    width: 50%;
    margin: 0px auto;
    thead {
      background: #0ccac4;
      color: #fff;
      th {
        padding: 10px;
      }
    }
  }
`;
const Order = props => (
    <Singleorder>
        <h3>Order {props.order.id + 1}</h3>
        <h5>Products</h5>
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
            </tr>
            </thead>
            <tbody>
            {props.order.products.map(product => (
                <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td>{product.price * product.qty}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <h5>Your Details</h5>
        <div>
            <p>
                <strong>First Name:</strong>
                {props.order.user_info.fname}
            </p>
            <p>
                <strong>Last Name:</strong>
                {props.order.user_info.lname}
            </p>
            <p>
                <strong>Suburb:</strong>
                {props.order.user_info.suburb}
            </p>
            <p>
                <strong>State:</strong>
                {props.order.user_info.state}
            </p>
            <p>
                <strong>Postcode:</strong>
                {props.order.user_info.postcode}
            </p>
            <p>
                <strong>Phone:</strong>
                {props.order.user_info.phoneno}
            </p>
        </div>
    </Singleorder>
);
export default Order;
