import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{
    render(){
        return (
            <div>
                <nav className="blue darken-3">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Agenda Cultural</a>
                        <div data-target="main-menu" className="sidenav-trigger waves-effect waves-light">
                            <i className="fa fa-bars"></i>
                        </div>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/"><i className="fa fa-users"></i>Eventos</Link></li>
                            <li><Link to="/eventos/add"><i className="fa fa-plus"></i>Agregar Evento</Link></li>
                            <li><Link to="/About"><i className="fa fa-question-circle"></i>About</Link></li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="main-menu">
                    <li><Link to="/"><i className="fa fa-users"></i>Eventos</Link></li>
                    <li><Link to="/eventos/add"><i className="fa fa-plus"></i>Agregar Evento</Link></li>
                    <li><Link to="/About"><i className="fa fa-question-circle"></i>About</Link></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;
