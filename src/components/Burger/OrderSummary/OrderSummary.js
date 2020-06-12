import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Auxj/Aux'

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('[ordersummary]');
    }

    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients).map((inKey) => {
            return (
            <li style ={{ textTransform : "capitalize"}} key={inKey}>
                <span>{inKey}</span> : {this.props.ingredients[inKey]}
           </li>
            )
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Continue to Checkout</p>
                <p><strong>Price : {this.props.totalPrice}</strong></p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;