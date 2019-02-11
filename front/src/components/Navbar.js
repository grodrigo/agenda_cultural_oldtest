import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Navbar extends Component{
    render(){
        return (
            <div className="navbar-container"   >
              <nav>
                <div className="nav-wrapper">
                  <a href="#" className="brand-logo">Logo</a>
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to={'/eventos/add'}>Agregar</Link></li>
                    <li><Link to={'/eventos'}>Home</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                  </ul>
                </div>
              </nav>
            </div>
        )
    }
}

export default Navbar;
