import React from 'react'
import BuildControl from '../BurgerControls/BurgerControl/BurgerControl'
import classes from './BurgerControls.module.css'

var controls = [{ label: 'Salad', type: 'salad' },
{ label: 'Meat', type: 'meat' },
{ label: 'Cheese', type: 'cheese' },
{ label: 'Bacon', type: 'bacon' }]

const burgerControls = (props) => (
        <div className={classes.BuildControls}>
            <div><strong>Total Price: Rs.{props.totalPrice}</strong></div>
            {controls.map(el => {
                return <BuildControl
                    label={el.label}
                    key={el.type}
                    more={() => { props.more(el.type) }}
                    less={() => { props.less(el.type) }}
                    disabled={props.disabled[el.type]} />
            })}
            <button className={classes.OrderButton} disabled={props.orderDisabled} onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGNIN TO ORDER'}</button>
        </div>
    )

export default burgerControls