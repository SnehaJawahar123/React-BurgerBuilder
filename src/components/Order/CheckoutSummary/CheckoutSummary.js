import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary =(props)=>{
    return(
        <div className={classes.checkout}>
            <br/><br/>
            <Burger ingredients={props.ingredients}/>
            <Button btnType='Danger' clicked={props.cancelCheckout}> CANCEL</Button>
            <Button btnType='Success' clicked={props.continueCheckout}> CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary