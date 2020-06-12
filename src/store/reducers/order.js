import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_ORDER_SUCCESS :
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
        return {
            ...state,
            orders: state.orders.concat(newOrder),
            loading: false,
            purchased: true
        }

        case actionTypes.PURCHASE_ORDER_FAIL:
        return {
            ...state,
            loading: false
        }

        case actionTypes.PURCHASE_ORDER_START:
        return {
            ...state,
            loading: true
        }

        case actionTypes.PURCHASE_INIT: 
        return {
            ...state,
            purchased: false
        }

        case actionTypes.FETCH_ORDERS_START : 
        return {
            ...state,
            loading: true
        }

        case actionTypes.FETCH_ORDERS_SUCCESS: 
        return {
            ...state,
            loading: false,
            orders: action.orders
        }

        case actionTypes.FETCH_ORDERS_FAIL: 
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    return state;
}

export default orderReducer;