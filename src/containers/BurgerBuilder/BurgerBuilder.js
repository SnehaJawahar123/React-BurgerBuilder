import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'


const INGREDIENT_PRICE = {
    'salad': 10,
    'meat': 50,
    'cheese': 15,
    'bacon': 50
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 75,
        orderModal: false,
        loading: false
    }

    componentDidMount(){
        axios.get('ingredients.json')
        .then(res=>{
            this.setState({ingredients: res.data})
        })
        .catch(err=>{
            console.log(err)
        })
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

    openModal = () => {
        this.setState({ orderModal: true })
    }

    cancelModal = () => {
        this.setState({ orderModal: false })
    }

    checkout = () => {
        console.log(this.props)

        const query = []
        for(let i in this.state.ingredients){
            query.push(i + '=' + this.state.ingredients[i])
        }
        query.push('price='+this.state.totalPrice)
        const queryString = query.join('&')
        console.log('che'+queryString)
        this.props.history.push({
            pathname: '/checkoutSummary',
            search: '?' + queryString
        })
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

        let orderSummary =  <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        cancel={this.cancelModal}
        checkout={this.checkout} />

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal showModal={this.state.orderModal} close={this.cancelModal}>
                   {orderSummary}
                </Modal>
                {this.state.ingredients ?
               (<React.Fragment> 
               <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    more={this.addHandler}
                    less={this.lessHandler}
                    totalPrice={this.state.totalPrice}
                    disabled={disabledInfo}
                    orderDisabled={order === 0}
                    ordered={this.openModal} />
                    </React.Fragment> ) : <Spinner /> }
                
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);