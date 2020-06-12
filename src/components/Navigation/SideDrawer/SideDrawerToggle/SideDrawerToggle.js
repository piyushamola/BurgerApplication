import React from 'react'
import classes from './SideDrawerToggle.css'

const sideDrawerToggle = (props) => (
  <div className = {classes.SideDrawerToggle} onClick={props.toggle}>
      <div></div>
      <div></div>
      <div></div>
  </div>
)

export default sideDrawerToggle;