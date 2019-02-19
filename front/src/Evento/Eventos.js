import React, {Component} from 'react';
import axios from 'axios';
import EventoItem from './EventoItem';
import { API_URL } from './../constants';

class Eventos extends Component{
    constructor(){
        super();
        this.state = {
            eventos: []
        }
    }
    
    getEventos(){
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
        axios.get(`${API_URL}/eventos`, { headers })
          .then(response => this.setState({ eventos: response.data }))
          .catch(error => console.log(error));
      }


    //called before mount and render component
    componentWillMount(){
        //console.log(123);
        this.getEventos();
    }
    render(){
        const { isAuthenticated } = this.props.auth;
        const { message } = this.state;
        const eventoItems = this.state.eventos.map((evento, i) => {
            return(
                    // <li className="collection-item">{evento.descripcion}</li>
                    <EventoItem key={evento.id} item={evento} />
                )
            } )
        return(
            <div>
                <h1>Eventos</h1>
                <ul className="collection">
                    {eventoItems}
                </ul>
            </div>
        )
    }
}

export default Eventos;
