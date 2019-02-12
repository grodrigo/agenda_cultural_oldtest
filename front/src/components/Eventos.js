import React, {Component} from 'react';
import axios from 'axios';
import EventoItem from './EventoItem';

class Eventos extends Component{
    constructor(){
        super();
        this.state = {
            eventos: []
        }
    }
    
    getEventos(){
        //promise then an arrow function
        axios.get('http://localhost:3001/api/eventos')
        .then(response => {
//            console.log(response.data);
            this.setState({eventos: response.data}, () =>
            {
                //console.log(this.state);
            })
        })
        .catch(error => console.log(error));
    }

    //called before mount and render component
    componentWillMount(){
        //console.log(123);
        this.getEventos();
    }
    render(){
        const eventoItems = this.state.eventos.map((evento, i) => {
            return(
                // <li className="collection-item">{evento.descripcion}</li>
                <EventoItem key={evento.id} item={evento} />
            )
        })
        return (
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
