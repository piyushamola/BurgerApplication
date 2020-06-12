import React, { Component } from "react";
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as orderActions from '../../store/actions/index'
class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }
    render() {
        let order = <Spinner/>
        if (!this.props.loading) {
        order = (
            <div>
               {this.props.orders.map(order => (
                   <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
               ))}
            </div>
        )

               }

        return order;
    }
}
const mapStateToProps = state  => {
    return {
        loading : state.order.loading,
        orders : state.order.orders,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder : (token, userId) => dispatch(orderActions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));