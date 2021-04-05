import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Search from './pages/Search';
import User from './pages/User';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user/:user" render={ (props) => <User { ...props } /> } />
        <Route path="/" component={ Search } />
      </Switch>
    );
  }
}

export default App;
