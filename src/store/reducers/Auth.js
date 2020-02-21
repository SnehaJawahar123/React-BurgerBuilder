import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

let initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        token: action.idToken,
        userId: action.userId
    })
}

const authFailed =(state, action) =>{
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const logoutUser =(state, action)=>{
    return updateObject(state, {
        userId: null,
        token: null,
        error: null
    })
}

const redirectFromAuth =(state, action)=>{
    return updateObject(state, {redirectPath : action.path})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_STARTED: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAILED: return authFailed(state, action)
        case actionTypes.LOGOUT_USER: return logoutUser(state, action)
        case actionTypes.REDIRECT_FROM_AUTH: return redirectFromAuth(state, action)
        default: return state
    }
}

export default reducer

