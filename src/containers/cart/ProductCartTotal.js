import React from 'react';
import TotalRow from "./ProductTotalRow";

class CartTotal extends React.Component {

    total() {
        let items = this.props.cartList;
        let total = 0;
        for (let x = 0; x < items.length; x ++) {
            total += items[x].price * items[x].qty;
        }
        return total;
    }

    render() {



        return (
            <table className="full-width border table">
                <thead>
                <tr className="border-bottom bg-dark text-white">
                    <th className='totals__heading' colSpan={2}>Totals</th>
                </tr>
                </thead>
                <tbody className='totals__details'>

                <TotalRow label='Total Amount' total={this.total()}/>
                </tbody>
            </table>
        );
    }
}

export default CartTotal;