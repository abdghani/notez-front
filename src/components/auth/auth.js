import auth0 from 'auth0-js';
import config from './../../config/authConfig.json'

class Auth {
  constructor() {
    
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: process.env.REACT_APP_AUTH_DOMAIN,
      audience: `https://${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
      clientID: process.env.REACT_APP_AUTH_CLIENTID,
      redirectUri: `${window.location.origin}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile email'
    });
    
    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication = () =>  {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession = (authResult, step) => {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;
    // set the time that the id token will expire at
    // this.expiresAt = authResult.idTokenPayload.exp * 1000 + new Date().getTime();
    this.expiresAt = authResult.idTokenPayload.exp * 1000 ;
    // console.log(this.expiresAt - new Date().getTime());
    
  };

  signOut() {
    this.auth0.logout({
        returnTo: `${window.location.origin}`,
        clientID: process.env.REACT_APP_AUTH_CLIENTID
    });
  }

  authFailed() {
    this.signOut();
    window.reload();
  }

  silentAuth = () => {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          // this.authFailed();
          return reject(err);
        }else{
          this.setSession(authResult);
          resolve();
        }
      });
    });
  };

}

const auth0Client = new Auth();

export default auth0Client;