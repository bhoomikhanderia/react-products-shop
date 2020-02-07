import React from 'react';

class TotalRow extends React.Component {

    calculateTotal(total) {
        return Number(total).toFixed(2);
    }

    render() {
        return (
            <tr className="border-bottom">
                <td className='total-row__label'><strong>{this.props.label}</strong></td>
                <td className='total-row__total'>${this.calculateTotal(this.props.total)}</td>
            </tr>
        );
    }
}

export default TotalRow;