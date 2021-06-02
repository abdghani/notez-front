import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../auth/auth';

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    console.log();
    
    this.props.history.replace('/notes');
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);