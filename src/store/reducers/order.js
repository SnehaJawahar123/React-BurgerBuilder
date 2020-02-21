import * as actionTypes from '../actions/actionTypes'

let initialState ={
    orders: [],
    loading: false,
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ORDER_SUCCESS:{
            console.log('state', state)
            let newState = JSON.parse(JSON.stringify(state))
            console.log('new1 ', newState)
            newState.orders.push({   //dont use concat here as it wil return a new obj
                ...action.orderData,
                id: action.orderId
            })
            console.log('new2 ', newState)

            newState.loading = false
            console.log(newState)
            return newState
        }
        case actionTypes.ORDER_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.ORDER_BURGER_STARTED:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_ORDER_STARTED:{
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_ORDER_FAILED:{
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.FETCH_ORDER_SUCCESS:{
            return {
                ...state,
                orders : action.orders,
                loading : false
            }
        }
        default : return state
    }
}

export default reducer