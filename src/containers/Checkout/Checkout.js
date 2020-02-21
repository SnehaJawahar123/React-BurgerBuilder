import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search)
        var ing = {}

        for (let par of params.entries()) {
            if (par[0] === 'price') this.setState({ price: par[1] })
            else ing[par[0]] = +par[1]
        }

        this.setState({ ingredients: ing })

    }

    continueCheckout = () => {
        this.props.history.replace('/checkoutSummary/contactData')
    }

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ing) {
            summary = (
                <>
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        continueCheckout={this.continueCheckout}
                        cancelCheckout={this.cancelCheckout} />
                    {/* <Route path={this.props.match.path +'/contactData'} render={(props)=><ContactData  //props is router props (match location history)
        {...this.props}
        ingredients={this.state.ingredients}
    price={this.state.price}/>} /> */}
                    <Route path={this.props.match.path + '/contactData'} component={ContactData} />
                </>
            )
        }

        return summary
    }
}


const mapStatetoProps = state => {
    return {
        ing: state.burgerBuilder.ingredients
    }
}

export default connect(mapStatetoProps)(Checkout)