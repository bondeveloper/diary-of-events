import { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Home from './containers/pages/Home/Home';

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/workouts' component="" />
      </Switch>
    )
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.signin.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch( actions.checkSignedIn() )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( App ));
