import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import About from './About/About';
import Eventos from './Evento/Eventos';
import EditEvento from './Evento/EventoEdit';
import EventoDetails from './Evento/EventoDetails';
import Profile from './Profile/Profile';
import Ping from './Ping/Ping';
import Admin from './Admin/Admin';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

// nice and briefly aproach, but I've issues while mounting components
/*
function PrivateRoute ({component: Component, auth, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => !auth.isAuthenticated() === true
        ? <Component auth={auth} {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
*/

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
{/*          another aproach, but with issues while mounting components        */}
{/*          <PrivateRoute auth={auth} path='/eventos' component={Eventos} />  */}
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/eventos" render={(props) => <Eventos auth={auth} {...props} />} />
          <Route path="/eventos/edit/:id" render={(props) => <EditEvento auth={auth} {...props} />} />
          <Route path="/eventos/:id" render={(props) => <EventoDetails auth={auth} {...props} />} />

          <Route path="/about" render={(props) => <About auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/ping" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Ping auth={auth} {...props} />
            )
          )} />
          <Route path="/admin" render={(props) => (
            !auth.isAuthenticated() || !auth.userHasScopes(['write:messages']) ? (
              <Redirect to="/home"/>
            ) : (
              <Admin auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
