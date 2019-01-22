/* eslint-disable max-len */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login.js';
import Dashboard from './dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  setParentState = (value) => {
    this.setState({
      name: value
    });
  };
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact render={(props) => <Login setParentState={this.setParentState} {...props} />} />
          < Route path="/dashboard" render={(props) => <Dashboard email={this.state.name} {...props} />} />
        </div>
      </Router>

    );
  }
}
export default App;
