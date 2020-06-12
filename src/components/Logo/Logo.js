import React from 'react'

import burgerLogo from '../../assets/images/original.png'
import classes from '../Logo/Logo.css'
const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"></img>
    </div>
)

export default logo;