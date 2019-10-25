import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const burger = (props) => {

    var transformedIngredients = Object.keys(props.ingredients)
    .map((igkey)=>{
        return [...Array(props.ingredients[igkey])].map((_, i)=>{
            return  <BurgerIngredient type={igkey} key={i +igkey}/>
        })
    })

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger