import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


const INGREDIENT_PRICE = {
    'salad': 10,
    'meat': 50,
    'cheese': 15,
    'bacon': 50
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            'salad': 0,
            'meat': 0,
            'cheese': 0,
            'bacon': 0
        },
        totalPrice: 75,
        orderModal: false
    }


    addHandler = (type) => {
        let updatedCount = this.state.ingredients[type] + 1;
        let updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount;
        let updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type]
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
    }

    lessHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            var updatedCount = this.state.ingredients[type] - 1;
            var updatedIngredients = { ...this.state.ingredients }
            updatedIngredients[type] = updatedCount;
            let updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type]
            this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
        }

    }

    openModal= ()=>{
        this.setState({orderModal: true})
    }

    cancelModal =()=>{
        this.setState({orderModal:false})
    }

    checkout =()=>{
        alert('You can continue')
    }

    render() {

        var order = 0;

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            order += disabledInfo[key]
            disabledInfo[key] = (disabledInfo[key] === 0)

        }

        return (
            <Aux>
                <Modal showModal={this.state.orderModal}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancel={this.cancelModal} 
                        checkout={this.checkout}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    more={this.addHandler}
                    less={this.lessHandler}
                    totalPrice={this.state.totalPrice}
                    disabled={disabledInfo}
                    orderDisabled={order === 0}
                    ordered={this.openModal} />
            </Aux>
        )
    }
}

export default BurgerBuilder;