import React from 'react';
import auth0Client from "../auth/auth";
import {Link, withRouter} from 'react-router-dom';

class Home extends React.Component  {

    componentDidMount(){
        if(auth0Client.isAuthenticated){
            this.props.history.push('/notes');
        }
    }

    render(){
        return (
            <div>
                Home
            </div>
        )
    }
}

export default withRouter(Home);