import React, {Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{

    state ={
        ingredients: {
            'salad': 2,
            'meat': 1,
            'cheese': 3
        }
    }

    render(){
        return(
            <Aux>
                <div>Burger </div>
                <div>Burger Controls</div>
                <Burger ingredients={this.state.ingredients}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;