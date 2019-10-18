import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'

const burger = (props) => {

    var transformedIngredients = Object.keys(props.ingredients)
    .map((igkey)=>{
        return [...Array(props.ingredients[igkey])].map((_, i)=>{
            return  <BurgerIngredient type={igkey} key={(Math.random() * 100).toFixed()}/>
        })
    })

    console.log(transformedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>

        </div>
    )
}

export default burger