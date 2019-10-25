import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentDidMount(){
        console.log('c did mount');
    }
    
    
    shouldComponentUpdate(){
        console.log('[Order Summary] will updtae');
    }


    render() {

        const IngredientSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return <li key={igkey}><span style={{ textTransform: 'capitalize' }}>{igkey}:</span> {this.props.ingredients[igkey]}</li>
            })


        return (<React.Fragment>
            <strong>Order Summary</strong>
            <p>Below are the ingredients chosen for the Burger</p>
            <p>Total Price:<strong> Rs.{this.props.price}</strong></p>
            <ul>
                {IngredientSummary}
            </ul>
            <p>Would you like to check out?</p>
            <Button btnType='Success' clicked={this.props.checkout}>Continue</Button>
            <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>

        </React.Fragment>)
    }
}

export default OrderSummary