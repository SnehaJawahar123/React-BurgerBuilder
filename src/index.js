import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'

import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import burgerBuilderReducer from './store/reducers/BurgerBuilder'
import orderReducer from './store/reducers/order'
import auth from './store/reducers/Auth'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const composeEnhancers = process.env.REACT_APP_NODE_ENVX === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer ,
    order: orderReducer,
    auth : auth
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app =
    (<Provider store ={store}><BrowserRouter>
        <App/>
    </BrowserRouter></Provider>)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
