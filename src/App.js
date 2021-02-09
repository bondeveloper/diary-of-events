import { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Home from './containers/pages/Home/Home';
import WorkoutList from './components/pages/Workouts/List/List';
import WorkoutView from './components/pages/Workouts/View/View';
import WorkoutSessionCreate from './components/pages/Workouts/View/Sessions/Create/Create'
import WorkoutCreate from './components/pages/Workouts/Create/Create';

const asyncWorkouts = asyncComponent(() => {
  return import('./components/pages/Workouts/List/List');
});

class App extends Component {
  componentDidMount () {
    this.props.onCheckAuth();
  }
  render () {
   let routes = <Switch>
                  <Route to='/' component={Home} />
                </Switch>

    if ( this.props.isAuth ) {
      routes = (
        <Switch>
          <Route path='/workouts/:id/sessions/create' component={WorkoutSessionCreate} />
          <Route path='/workouts/create' component={WorkoutCreate} />
          <Route path='/workouts/:id' component={WorkoutView} />
          <Route to='/workouts' exact component={asyncWorkouts} />
        </Switch>
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
    isAuth: state.signin.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch( actions.checkSignedIn() )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( App ));
