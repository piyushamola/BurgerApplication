import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

const toolbar = (props) => (
        <header className={classes.Toolbar}>
        <SideDrawerToggle toggle={props.change}/>
        <div className = {classes.Logo}><Logo/> </div>
        <nav className = {classes.DesktopOnly}>
         <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
       </header>
)

export default toolbar;