import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'
const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];
const buildControls = (props) => (
    <div className= {classes.BuildControls}>
        {
            <p><strong>{props.price.toFixed(2)}</strong></p>} 
            {
            controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)} 
                removed= {() => props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}/>
            ))
        }
        <button 
        disabled = {!props.purchasable} 
        className={classes.OrderButton}
        onClick={props.ordered} >
            { props.auth ? "Order Now" : "Sign up for order" }
        </button>
    </div>
);

export default buildControls;