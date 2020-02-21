import * as actionTypes from './actionTypes'
import axios from 'axios'

const authStarted = ()=>{
    return {
        type: actionTypes.AUTH_STARTED
    }
}

const authSuccess =(token, userId)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        error: null
    }
}

const authFailed = error =>{
    console.log(error)
    return{
        type: actionTypes.AUTH_FAILED,
        error
    }
}

export const logoutUser = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expDate')

    return {
        type: actionTypes.LOGOUT_USER
    }
}

const authLogOut = expirationTime =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logoutUser())
        }, expirationTime*1000) //converts millisec to seconds
    }
} 

export const auth = (email, password, isSignUp, cb)=>{
    return dispatch=>{
        dispatch(authStarted())
        const reqData ={
            email: email,
            password: password,
            returnSecureToken : true
        }
        console.log(reqData)
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${ isSignUp ? 'signUp' : 'signInWithPassword'}?key=AIzaSyC_W63cXqVkwLDz7SvaPj3UjkQGQgtlCKE`, reqData)
        .then(res=>{
            console.log(res)  
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('userId', res.data.localId)
            localStorage.setItem('expDate', new Date(new Date().getTime() + (res.data.expiresIn*1000)))          
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(authLogOut(res.data.expiresIn))
           // cb(null)
        })
        .catch(err=>{
            cb({error:err})
            dispatch(authFailed(err))
        })
        
    }
}

export const redirectFromAuthPath = path =>{
    return {
        type: actionTypes.REDIRECT_FROM_AUTH,
        path
    }
}

export const authCheckState =()=>{
    return dispatch=>{
        if(!localStorage.getItem('token')) dispatch(logoutUser())
        else{
            const expirationDate = new Date(localStorage.getItem('expDate'))
            if(expirationDate <= new Date()){
                dispatch(logoutUser())
            } 
            else {
                dispatch(authSuccess(localStorage.getItem('token'),localStorage.getItem('userId')))
                dispatch(authLogOut((expirationDate.getTime() - new Date().getTime())/1000))//get time gives it in milli sec
            }
        }
    }
}