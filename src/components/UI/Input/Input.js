import React from 'react'
import classes from './Input.css'
const input = (props) => {
    let inputElement = [classes.InputElement];
    if(!props.valid && props.shouldValidate && props.elementTouched) {
        inputElement.push(classes.Valid);
    }
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputElement.join(' ')}
             {...props.elementConfig}
             value={props.value}
             onChange={props.changed}/>
            break;
        case 'textarea':
            inputElement = <textarea className={inputElement.join(' ')}
             {...props.elementConfig}
             value={props.value}
             onChange={props.changed}/>
            break;
        case 'select': 
            inputElement = <select className ={inputElement.join(' ')}
            onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
        default:
            inputElement = <input className={inputElement.join(' ')}
             {...props.elementConfig}
             value={props.value}
             onChange={props.changed}/>
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;