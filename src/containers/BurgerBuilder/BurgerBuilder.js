import React, { Component } from "react";
import Aux from '../../hoc/Auxj/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner';
import WithErrorComponent from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as bugerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.onInitIngredient();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAdditon = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.totalPrice;
    //     const newPrice = oldPrice + priceAdditon;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount-1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push("/auth")
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // let ingredientsQuery = [];
        // for( let i in this.props.ings) {
        //     ingredientsQuery.push(encodeURIComponent(i)+ "=" + encodeURIComponent(this.props.ings[i]));
        // }
        // ingredientsQuery.push("totalPrice="+ this.props.totalPrice);
        // let query = ingredientsQuery.join("&");
        this.props.onPurchaseInit();
        this.props.history.push({
            pathname:"/checkout"
        })
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = <Spinner />
        let orderSummary = null;

        if(this.props.ings) {
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={ (type) => this.props.onAddIngredient(type)}
                ingredientRemoved={ (type) => this.props.onRemoveIngredient(type)}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                auth = {this.props.isAuthenticated}
                purchasable= {this.updatePurchaseState(this.props.ings)}
                ordered= {this.purchaseHandler}/>
                </Aux>
            )

            orderSummary =    <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.totalPrice.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        }

        if(this.props.error) {
            burger = <p>Something broken in the applications</p>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                 {orderSummary}
                </Modal>
            {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch(bugerBuilderActions.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(bugerBuilderActions.removeIngredient(type)),
        onInitIngredient: () => dispatch(bugerBuilderActions.initIngredient()),
        onPurchaseInit: () => dispatch(bugerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(bugerBuilderActions.authRedirectPath(path))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorComponent(BurgerBuilder, axios));