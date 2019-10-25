import React from 'react'
import classes from '../../BurgerControls/BurgerControl/BurgerControl.module.css'

const BurgerControl = (props)=>{
    return(
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button className={classes.More} onClick={props.more}>More</button>
            <button className={classes.Less} onClick={props.less} disabled={props.disabled}>Less</button>
        </div>
    )
}

export default BurgerControl