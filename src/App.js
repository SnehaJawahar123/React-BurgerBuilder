import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/logout'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/orders' component={Orders} />
          <Route path='/checkoutSummary' component={Checkout} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (

      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

let mapStatetoProps = state =>{
  return {
    isAuthenticated: state.auth.token !=null
  }
}

let mapDispatchtoProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
