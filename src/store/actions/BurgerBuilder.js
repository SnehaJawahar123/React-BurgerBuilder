import {ADD_INGREDIENT, REM_INGREDIENT, SET_INGREDIENT, FAILED_INGREDIENT} from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient=(ing)=>{
    return {
        type: ADD_INGREDIENT,
        ing
    }   
}

export const remIngredient=(ing)=>{
    return {
        type: REM_INGREDIENT,
        ing
    }   
}

export const initIngredients =()=>{
    return dispatch=>{
        axios.get('ingredients.json')
        .then(res=>{
            dispatch(setIngredients(res.data))
        })
        .catch(err=>{
            dispatch(failureIngredient())
        })
    }
}

const setIngredients= (ingredients)=>{
    return{
        type: SET_INGREDIENT,
        ingredients
    }
}

const failureIngredient=()=>{
    return{
        type: FAILED_INGREDIENT
    }
}