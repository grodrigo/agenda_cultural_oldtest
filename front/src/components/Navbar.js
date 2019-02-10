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
                <AppBar position="static">
                    <Toolbar className="nav-wrapper">
                        <IconButton className="navbar-icon" color="inherit" aria-label="Menu">
                          <Typography variant="h4" color="inherit" className="navbar-logo">
                            Agenda Cultural
                          </Typography>
                        </IconButton>
                        <Button component={Link} to="/">
                          Eventos
                        </Button>
                        <Button component={Link} to="/eventos/add">
                          Agregar Evento
                        </Button>
                        <Button component={Link} to="/about">
                          About
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar;
