import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import LateralBar from './components/Lateralbar';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Grid container spacing={8}>
        <Grid item xs={1}>
          <LateralBar />
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
