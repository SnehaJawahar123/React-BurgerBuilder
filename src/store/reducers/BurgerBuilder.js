import * as actionType from '../actions/actionTypes'

let initialState={
    ingredients: null,
    price:0,
    error: false
}

const INGREDIENT_PRICE = {
    'salad': 10,
    'meat': 50,
    'cheese': 15,
    'bacon': 50
}


const reducer =(state=initialState, action)=>{
    switch(action.type){
        case(actionType.ADD_INGREDIENT):{
           let newState = JSON.parse(JSON.stringify(state))
           newState.ingredients[action.ing] = state.ingredients[action.ing] + 1
           newState.price = state.price + INGREDIENT_PRICE[action.ing]
        //    {
        //             ...state,
        //             ingredients:{
        //                 ...state.ingredients,
        //                 [action.ing] : state.ingredients[action.ing] + 1
        //             },
        //             price : state.price + INGREDIENT_PRICE[action.ing]
        //     }
            return newState
        }
        case(actionType.REM_INGREDIENT):{
            return {
                ...state,
                ingredients :{
                    ...state.ingredients,
                    [action.ing]: state.ingredients[action.ing] -1
                },
                price : state.price - INGREDIENT_PRICE[action.ing]
            }
        }
        case(actionType.SET_INGREDIENT): {
            return{
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        }
        case(actionType.FAILED_INGREDIENT):{
            return {
                ...state,
                error: true
            }
        }
        default: return state
    }
}

export default reducer