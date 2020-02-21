import {
    ORDER_FAILED,
    ORDER_SUCCESS,
    ORDER_BURGER_STARTED,
    FETCH_ORDER_FAILED,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_STARTED
} from './actionTypes'

import axios from '../../axios-orders'

const orderFailed = (error) => {
    return {
        type: ORDER_FAILED,
        error
    }
}

const orderSuccess = (orderId, orderData) => {
    return {
        type: ORDER_SUCCESS,
        orderId,
        orderData
    }
}

const orderBurgerStarted = () => {
    return {
        type: ORDER_BURGER_STARTED
    }
}

export const orderBurger = (orderData, token) => {
    return dispatch => {

        dispatch(orderBurgerStarted())

        axios.post('orders.json?auth='+token, orderData)
            .then((res) => {
                console.log(res.data)
                dispatch(orderSuccess(res.data.name, orderData))
            })
            .catch((err) => {
                dispatch(orderFailed(err))
            })
    }
}


const fetchOrderSuccess = (fetchedOrders) => {
    return {
        type: FETCH_ORDER_SUCCESS,
        orders: fetchedOrders
    }
}

const fetchOrderFailed = (error) => {
    return {
        type: FETCH_ORDER_FAILED,
        error
    }
}

const fetchOrderStarted = () => {
    return {
        type: FETCH_ORDER_STARTED
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStarted())
        const queryParam = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('orders.json' + queryParam)
            .then(res => {
                let fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        key: key
                    })
                }
                console.log(fetchedOrders)
                dispatch(fetchOrderSuccess(fetchedOrders))
                // this.setState({loading:false, orders: fetchedOrders})

            })
            .catch(e => {
                dispatch(fetchOrderFailed(e))
                // this.setState({ loading: false })
            })
    }
}