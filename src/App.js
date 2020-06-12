import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import logout from './containers/Auth/Logout/Logout'
import Orders from './containers/Orders/Orders'
import { connect } from 'react-redux'
import * as action from './store/actions/index'
class App extends Component {

  componentDidMount() {
    this.props.checkUserAuthenticated();
  }

  render () {

    return (
      <div>
        <Layout>
        <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/logout" component={logout}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/"   exact component={BurgerBuilder}/>
      </Switch>
        </Layout>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
 return {
  checkUserAuthenticated : () => dispatch(action.checkAuthState())
 }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
