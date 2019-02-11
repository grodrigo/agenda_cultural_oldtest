import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Grid container spacing={8}>
        <Grid item xs={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={4}>
          <Main />
        </Grid>
      </Grid>
    </div>
    <div className="fixed-action-btn">
      <Link to="/eventos/add" className="btn-floating btn-large red">
        <i className="fa fa-plus"></i>
      </Link>
    </div>
  </div>
)

export default App;
