import React from 'react';
import classes from './Order.css'

const order = (props) => {
    let orderIngredients = []
        for (let ingredient in props.ingredients) {
            orderIngredients.push( {
                ingredientName : ingredient,
                ingredientValue: props.ingredients[ingredient]
            })
        }
    return (
        <div className={classes.Order}> 
        <p><strong>Ingredients </strong> : {orderIngredients.map(ing => (
            <span key={ing.ingredientName}
                style={{
                    border: '1px solid #ccc',
                    padding: '5px',
                    display :'inline-block',
                    textTransform: 'capitalize',
                    margin:' 0 8px',
                    boxShadow: '0px 2px 3px #eee',
                    boxSizing: 'border-box'

                }}> {ing.ingredientName} ({ing.ingredientValue})
            </span>
        ))} </p>
        <p><strong>Price </strong> : <strong>{Number.parseFloat(props.price.toFixed(2))}</strong></p>
     </div>
    )
}
export default order;