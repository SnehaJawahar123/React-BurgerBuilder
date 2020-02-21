import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

import {connect} from 'react-redux'
import * as burgerBuilderAction from '../../store/actions/index'
import {Redirect} from 'react-router-dom'


export class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 75,
        orderModal: false,
        loading: false
    }

    componentDidMount(){
        this.props.onInitIngredient();
        console.log('CDM')
    }


    // addHandler = (type) => {
    //     let updatedCount = this.state.ingredients[type] + 1;
    //     let updatedIngredients = { ...this.state.ingredients }
    //     updatedIngredients[type] = updatedCount;
    //     let updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type]
    //     this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
    // }

    // lessHandler = (type) => {
    //     if (this.state.ingredients[type] > 0) {
    //         var updatedCount = this.state.ingredients[type] - 1;
    //         var updatedIngredients = { ...this.state.ingredients }
    //         updatedIngredients[type] = updatedCount;
    //         let updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type]
    //         this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
    //     }

    //}

    openModal = () => {
        if(!this.props.isAuthenticated) {
            this.props.onSetRedirectPath('/checkoutSummary')
            // redirect = <Redirect to='/auth'/>// cant use redirect
            this.props.history.push('/auth')
        }
        else this.setState({ orderModal: true })
    }

    cancelModal = () => {
        this.setState({ orderModal: false })
    }

    checkout = () => {
        // console.log(this.props)

        // const query = []
        // for(let i in this.props.ings){
        //     query.push(i + '=' + this.props.ings[i])
        // }
        // query.push('price='+this.state.totalPrice)
        // const queryString = query.join('&')
        // console.log('che'+queryString)
        // this.props.history.push({
        //     pathname: '/checkoutSummary',
        //     search: '?' + queryString
        // })

       this.props.history.push('/checkoutSummary')
    }

    render() {

        var order = 0;


        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            order += disabledInfo[key]
            disabledInfo[key] = (disabledInfo[key] === 0)

        }

        let orderSummary =  <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        cancel={this.cancelModal}
        checkout={this.checkout} />

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                {this.redirect}
                <Modal showModal={this.state.orderModal} close={this.cancelModal}>
                   {orderSummary}
                </Modal>
                {this.props.ings ?
               (<React.Fragment> 
               <Burger ingredients={this.props.ings} />
                <BurgerControls
                    more={this.props.onAddIngredient}
                    less={this.props.onRemIngredient}
                    totalPrice={this.props.price}
                    disabled={disabledInfo}
                    orderDisabled={order === 0}
                    ordered={this.openModal} 
                    isAuthenticated={this.props.isAuthenticated}/>
                    </React.Fragment> ) : <Spinner /> }
                
            </Aux>
        )
    }
}

const mapStatetoProps =state=>{
 return{
     ings: state.burgerBuilder.ingredients,
     price: state.burgerBuilder.price,
     isAuthenticated: state.auth.token !=null
 }
}

const mapDispatchtoProps = dispatch=>{
    return{
        onAddIngredient : (ing)=> dispatch(burgerBuilderAction.addIngredient(ing)),
        onRemIngredient : (ing)=> dispatch(burgerBuilderAction.remIngredient(ing)),
        onInitIngredient : ()=> dispatch(burgerBuilderAction.initIngredients()),
        onSetRedirectPath: (path)=> dispatch(burgerBuilderAction.redirectFromAuthPath(path))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));