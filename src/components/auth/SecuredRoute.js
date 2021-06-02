import React from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './auth';
import { TodoContextProvider } from '../../context/TodoContext';
import { MemoContextProvider } from '../../context/MemoContext';

function SecuredRoute(props) {
  const {component: Component, path, checkingSession} = props;
  return (
    <Route path={path} render={() => {
        if (checkingSession) {
          return <h3 className="text-center">Validating session...</h3>;
        }
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div></div>;
        }

        if(path.indexOf('memo') != -1){
          return (
            <MemoContextProvider>
              <Component />
            </MemoContextProvider>
          )
        }
        if(path.indexOf('todo') != -1){
          return (
            <TodoContextProvider>
              <Component />
            </TodoContextProvider>
          )
        }
        return <Component />
    }} />
  );
}

export default SecuredRoute;