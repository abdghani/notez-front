import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import  {BrowserRouter as Router } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import auth0Client from "./components/auth/auth";

import { TodoContextProvider } from './context/TodoContext';


const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHURL
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    
    let token = auth0Client.idToken;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only'
    }
  },
  onError: ({ networkError, graphQLErrors }) => {
      console.log("aaa");
  }
});

export default (
  <ApolloProvider client={client}>
      <TodoContextProvider>
        <Router>
            <App />
        </Router>
      </TodoContextProvider>
  </ApolloProvider>
);