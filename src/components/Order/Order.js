import React from 'react'
import classes from './Order.module.css'

const order = props => {

    const ingredients =[]

    for(let ing in props.ingredients){
        ingredients.push({
            name: ing,
            count: props.ingredients[ing] 
        })
    }
    console.log(ingredients)

    const IngTags = ingredients.map(el=>{
      return  <span 
      style={{border:'1px solid #bbb',
              padding: '5px',
            margin:'5px',
        backgroundColor: '#ddd',
    textTransform:'capitalize' }}
        key ={el.name}>{el.name} ({el.count})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients:  {IngTags} </p>
            <p>Price <strong>Rs. {props.price}</strong></p>
        </div>
    )

}

export default order