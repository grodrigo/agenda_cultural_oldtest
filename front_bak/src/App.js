import React, { Component } from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import { Link } from 'react-router-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  constructor(props){
    super(props);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
        <div>
          <Navbar isAuthenticated={isAuthenticated} />
          <div className="container">
            <Sidebar />
            <Main />
          </div>
          <div className="fixed-action-btn">
            <Link to="/eventos/add" className="btn-floating btn-large red">
              <i className="fa fa-plus"></i>
            </Link>
          </div>
        </div>
      )
  }
}

export default App;
