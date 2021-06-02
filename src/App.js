import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import { Container } from 'semantic-ui-react'

import auth0Client from './components/auth/auth'
import SecuredRoute from './components/auth/SecuredRoute';

// shared Compoennts
import Navbar from './components/shared/Navbar';
import Loading from './components/shared/Loading';
import BackButton from './components/shared/Back';


import Home from './components/main/Home';
import Notes from './components/main/Notes/Notes';
import NotesArchieved from './components/main/Notes/NotesArchieved'
import NotesCreate from './components/main/Notes/NotesCreate';
import NotesOpen from './components/main/Notes/NotesOpen';
import NotesEdit from './components/main/Notes/NotesEdit';
import Todos from './components/main/Todos/Todos';
import Memos from './components/main/Memo/Memos';
import MemosCreate from './components/main/Memo/MemosCreate';

import { TodoContextProvider } from './context/TodoContext';
import { MemoContextProvider } from './context/MemoContext';

import Callback from './components/main/Callback';

class App extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }


  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    };
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render(){
    return (
      <div className=" container is-fullhd">
			  <div className="">
          <Navbar />
          <BackButton  />
          <div className="mg-t-20">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/callback' component={Callback}/>
              <Route exact path='/notes/open/:note_id' component={NotesOpen} />
              <SecuredRoute checkingSession={this.state.checkingSession} exact path='/notes' component={Notes} />
              <SecuredRoute checkingSession={this.state.checkingSession} exact path='/notes/archieved' component={NotesArchieved} />
              <SecuredRoute checkingSession={this.state.checkingSession} exact path='/notes/create' component={NotesCreate} />
              <SecuredRoute checkingSession={this.state.checkingSession} exact path='/notes/edit/:note_id' component={NotesEdit} />
              <SecuredRoute checkingSession={this.state.checkingSession} exact path='/todos' component={Todos} />
              <SecuredRoute checkingSession={this.state.checkingSession} exact path='/memos/create' component={MemosCreate} />
              <SecuredRoute checkingSession={this.state.checkingSession} exact path='/memos' component={Memos} />
             
            </Switch>
          </div>
        </div>
      </div>
        
    )
  }
}

export default withRouter(App);
