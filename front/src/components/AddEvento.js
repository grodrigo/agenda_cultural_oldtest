import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddEvento extends Component {

    constructor(props){
        super(props);
        this.state = {
            descripcion: "",
            fecha: "",
            lugar: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        //console.log(target.value);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        //alert(this.state.descripcion);
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/api/eventos',
            data: this.state
        }).then(response => {
            this.props.history.push('/');
        }).catch(error => console.log(error.response));
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <Link className="btn grey" to="/">Back</Link>
                <h1>Agregar Evento</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input type="text" name="descripcion" value={this.state.descripcion} 
                            onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="descripcion">Descripción</label>
                    </div>
                    <div className="input-field">
                        <input type="date" name="fecha"  value={this.state.fecha} 
                            onChange={this.handleInputChange.bind(this)} />
                        <label htmlFor="date">Fecha</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="lugar"  value={this.state.lugar} 
                            onChange={this.handleInputChange.bind(this)} />
                        <label htmlFor="place">Lugar</label>
                    </div>
                    <input type="submit" value="Guardar" className="btn" />
                </form>
            </div>
        )
    }
}

export default AddEvento;
