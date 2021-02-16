import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Home from './containers/pages/Home/Home';
import WorkoutView from './components/pages/Workouts/View/View';
import WorkoutSessionCreate from './components/pages/Workouts/View/Sessions/Create/Create'
import WorkoutCreate from './components/pages/Workouts/Create/Create';
import Signout from './components/Auth/Signout/Signout';
import WorkoutList from './components/pages/Workouts/List/List';

const asyncWorkouts = asyncComponent(() => {
  return import('./components/pages/Workouts/List/List');
});

const asyncHome = asyncComponent(() => {
  return import('./containers/pages/Home/Home');
});

class App extends Component {
    componentDidMount () {
        this.props.onCheckAuth();
        console.log( this.props.isAuth);
        console.log( this.props.redirect);
        this.props.history.push( this.props.redirect );
        return <Redirect to={ this.props.redirect }/>;
    }

  render () {
   let routes =  <Router>
          <Switch>
            <Route path='/' exact  component={ Home } />
          </Switch>
    </Router>;

    if ( this.props.isAuth ) {
      routes = (
        <Router>
          <Switch>
            <Route path='/signout' exact component={ Signout } />
            <Route path='/workouts/:id/sessions/create' component={WorkoutSessionCreate} />
            <Route path='/workouts/create' component={WorkoutCreate} />
            <Route path='/workouts/:id' component={WorkoutView} />
            <Route path='/workouts' exact component={WorkoutList} />
            <Redirect to='/workouts' from='/' />
          </Switch>
        </Router>
      );
    }

    return (
      <Layout auth={this.props.isAuth}>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.signin.token !== null,
    redirect: state.signin.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch( actions.checkSignedIn() )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( App ));
