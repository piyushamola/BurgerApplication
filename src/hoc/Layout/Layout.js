 import React, { Component } from 'react';
 import Aux from '../Auxj/Aux';
 import classes from './Layout.css';
 import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
 import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
 import { connect } from 'react-redux'

 class Layout extends Component {

    state = {
        showSideDrawer : false
    }
    sideDrawerClosedHander = () => {
        this.setState({showSideDrawer: false});
    }

    drawerToggleHandler = () => {
        this.setState((prev) => {
            return { showSideDrawer : !prev.showSideDrawer }
        });
    }
    render() {
        return (
        <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} change={this.drawerToggleHandler}/>
        <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHander}></SideDrawer>
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        )
    }
 }

 const maStateToProps = state => {
     return {
        isAuthenticated : state.auth.token !== null
     }
 }

export default connect(maStateToProps)(Layout);