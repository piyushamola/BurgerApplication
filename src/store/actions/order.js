import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'
export const purchaseOrderSuccess = (orderData, id) => {
    return {
        type : actionTypes.PURCHASE_ORDER_SUCCESS,
        orderData: orderData,
        id: id
    }
}


export const purchaseOrderFail = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAIL,
        error: error
    }
}


export const purchaseOrder = (order, token) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json?auth=' + token, order).then(response => {
            dispatch(purchaseOrderSuccess(response.data, response.data.name))
        })
        .catch(error => {
            dispatch(purchaseOrderFail(error))
        });
    }
}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START
    }
}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        let queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("/orders.json" + queryParams).then((res) => {
            let fetchedOrders = [];
            for( let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch((err) => {
            dispatch(fetchOrdersFail(err))
        })
    }
}


