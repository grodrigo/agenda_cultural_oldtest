//import Auth0Lock from 'auth0-lock';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';

import axios from 'axios';
import { API_URL } from './../constants';

//with Auth0Lock instead of WebAuth you can embed the login in your app, but I couldn't continue with valid requests,
//so, it's for later checks... (uncomment the lines with lock and comment lines with auth0)

export default class Auth {
  debug;
  accessToken;
  idToken;
  expiresAt;
  userProfile;
  scopes;
  userId;
  requestedScopes = 'openid profile user_metadata read:messages write:messages';
  tokenRenewalTimeout;

  // lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
  //   autoclose: true,
  //   auth: {
  //     redirectUrl: AUTH_CONFIG.callbackUrl,
  //     responseType: 'token id_token',
  //     params: {
  //       scope: this.requestedScopes
  //     }
  //   }
  // });

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: this.requestedScopes
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.userHasScopes = this.userHasScopes.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.scheduleRenewal();

    this.debug = false;
    /* debug mode */
    if (this.debug){
    this.accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FWTFNVU00T0RrMVEwUTRNRUl6UmpWR09EUTBRak14TlVNNVJVSkZOa1kzTXpReE5qbEJPUSJ9.eyJpc3MiOiJodHRwczovL2Rldi10ZXN0MS5hdXRoMC5jb20vIiwic3ViIjoieGhDdkh4NVRncmxlWDZyd1hiTFlXd05ZdTVJYzN2SkpAY2xpZW50cyIsImF1ZCI6ImxvY2FsaG9zdDozMDAwIiwiaWF0IjoxNTUwNTMzNDM3LCJleHAiOjE1NTA2MTk4MzcsImF6cCI6InhoQ3ZIeDVUZ3JsZVg2cndYYkxZV3dOWXU1SWMzdkpKIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.KNbhwrBeB07CmB02tEFMGq0MFRZlL1R1J_LUh9EWxEb2NwScy7veqThbLmUQQplKFpQx612tned_NA3YxsWRANB1zQ3ztj04JDYsr9NX-UnkR-dbQOtJws8uoM3h-7aRYMihphbEojSJwHku6dChjKYT16xoWx52widdiaGLJ6bfGxCn2AojTW-IOTVOx2oIOt00ZNKzRSai5CxEtwifFJFkIImIERP7x1-97xAmas97GEq8DNsS79Rcx4cOzBKPyUALJycTrqTRfI7wlJMIBaL3RNEACbat59gvaQbJi_ZkZq5RWMIO-mZsdK0onj8-bbsXwV6MLkrR79imkmYPyA";
    localStorage.setItem('isLoggedIn', 'true');
    }
  }

  // login() {
  //   // Call the show method to display the widget.
  //   this.lock.show();
  // }

  // handleAuthentication() {
  //   // Add a callback for Lock's `authenticated` event
  //   this.lock.on('authenticated', this.setSession.bind(this));
  //   // Add a callback for Lock's `authorization_error` event
  //   this.lock.on('authorization_error', (err) => {
  //     console.log(err);
  //     alert(`Error: ${err.error}. Check the console for further details.`);
  //     history.replace('/home');
  //   });
  // }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  //not working
  updateUser(authResult) {
    this.getProfile();
    console.log(authResult.profile.picture);
    const headers = { 'Authorization': `Bearer ${authResult.accessToken}`}
    axios.post(`${API_URL}/eventos`, {
            'descripcion':authResult.profile.picture,
            'lugar': authResult.profile.nickname,
            'fecha': '2019-02-18T21:55:52.959Z'
          }, { headers })
      .catch(error => console.log(error));
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    // schedule a token renewal
    this.scheduleRenewal();

    // Set the users scopes
    this.scopes = authResult.scope || this.requestedScopes || '';
    console.log(this.scopes);
    // navigate to the home route
    history.replace('/home');

//    save the user profile in our database
//    this.updateUser(authResult);
  }

  renewSession() {
    if (this.debug) return;
//    this.lock.checkSession({}, (err, authResult) => {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         console.log("renovando sesion");
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  getProfile(cb) {
//      invalid function
//    this.lock.client.userInfo(this.accessToken, (err, profile) => {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user scopes
    this.scopes = null;

    // Remove user profile
    this.userProfile = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // Clear token renewal
    clearTimeout(this.tokenRenewalTimeout);

    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    if (this.debug) return true;
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  userHasScopes(scopes) {
    if (this.debug) return '';
    const grantedScopes = this.scopes.split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    console.log("timeut en "+timeout);
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }

}

