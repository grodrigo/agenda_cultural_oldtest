import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EventoDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: ''
        }
    }

    componentWillMount() {
        this.getEvento();
    }
    getEvento() {
        let eventoId = this.props.match.params.id;
                axios.get(`http://localhost:3001/api/eventos/${eventoId}`)
            .then(response => {
                //console.log(response.data);
                this.setState({ item: response.data }, () => {
                                    console.log(this.state);
                })
            })
            .catch(error => console.log(error));
    }

    onDelete(){
        let eventoId = this.state.item.id;
        axios.delete(`http://localhost:3001/api/eventos/${eventoId}`)
        .then(response =>  {
            this.props.history.push('/');
        }).catch(error => console.log(error));
    }

    render() {
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <div>
                <Link className="btn grey" to="/">Back</Link>
                <h1>{this.state.item.titulo}</h1>
                <img src={this.state.item.imagen}/>
                <p>{this.state.item.descripcion}</p>
                <ul className="collection">
                    <li className="collection-item">Fecha: {
                        (new Date(this.state.item.fecha)).toLocaleDateString('es-AR', DATE_OPTIONS)}
                    </li>
                    <li className="collection-item">Lugar:{this.state.item.lugar}</li>
                </ul>
                <Link className="btn" to={`/eventos/edit/${this.state.item.id}`}>Editar</Link>
                <button onClick={this.onDelete.bind(this)} className="btn red right">Borrar</button>
            </div>
        )
    }
}

export default EventoDetails;
