import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }


    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {

        let OrderList = <Spinner />
        if (!this.props.loading) {
            OrderList = this.props.ord.map(el => (
                <Order ingredients={el.ingredients}
                    key={el.key}
                    price={el.price} />
            ))
        }

        return (
            <div>
                {OrderList}
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ord: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Orders, axios))