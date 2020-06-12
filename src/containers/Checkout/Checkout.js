import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary'
import { connect } from 'react-redux'
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from 'react-router-dom';
class Checkout extends Component {
    // state = {
    //     ingredients :null,
    //     totalPrice: 0
    // }
    // componentWillMount() {
    //     let urlParams = new URLSearchParams(this.props.location.search);
    //     let ingredientsParmas = {};
    //     let totalPrice;
    //     for( let i of urlParams.entries()) {
    //         if(i[0] === "totalPrice") {
    //             totalPrice = +i[1]
    //         } else {
    //             ingredientsParmas[i[0]] = +i[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredientsParmas,
    //                     totalPrice: totalPrice})
    // }
    continueClickedHandler = () => {
        this.props.history.replace("/checkout/contacts");
    }

    cancelClickedHandler = () => {
        this.props.history.goBack();
    }
    render () {
        let summary = <Redirect to="/"/>
        if (this.props.ingredients) {
            const purchaseRedirect = (this.props.purchased) ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                <CheckoutSummary
                continueClicked={this.continueClickedHandler}
                cancelClicked={this.cancelClickedHandler}
                ingredients={this.props.ingredients}/>
                <Route path={this.props.match.url + "/contacts"} 
                 component={ContactData} /> 
            </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);