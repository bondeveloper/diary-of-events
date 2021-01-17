import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path='/' component="" />
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

export default App;
