import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { API_URL } from './../constants';

class EditEvento extends Component{

  constructor(props){
    super(props);
    this.state = {
      id:'',
      descripcion:'',
      fecha:'',
      lugar:''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getEventoDetails();
  }

  getEventoDetails(){
    let eventoId = this.props.match.params.id;
    axios.get(`${API_URL}/eventos/${eventoId}`)
    .then(response => {
      this.setState({
        id: response.data.id,
        descripcion: response.data.descripcion,
        fecha: response.data.fecha.substr(0, 10),
        lugar: response.data.lugar
      }, () => {
//        console.log(this.state); // onLoad
      });
    })
    .catch(err => console.log(err));
    }

  EditEvento(newEvento){
        const { getAccessToken } = this.props.auth;
        const authHeaders = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.request({
      method:'put',
      headers: authHeaders,
      url:`${API_URL}/eventos/${this.state.id}`,
      data: newEvento
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newEvento = {
      descripcion: this.refs.descripcion.value,
      fecha: this.refs.fecha.value,
      lugar: this.refs.lugar.value
    }
    this.EditEvento(newEvento);
    e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return (
     <div>
        <br />
       <Link className="btn grey" to="/">Back</Link>
       <h1>Editar Evento</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <label htmlFor="descripcion">Descripción</label>
            <input type="text" name="descripcion" ref="descripcion" value={this.state.descripcion} onChange={this.handleInputChange.bind(this)} />
          </div>
          <div className="input-field">
            <label htmlFor="fecha">Fecha</label>
            <input type="date" name="fecha" ref="fecha" value={this.state.fecha} onChange={this.handleInputChange.bind(this)} />
          </div>
          <div className="input-field">
            <label htmlFor="lugar">Lugar</label>
            <input type="text" name="lugar" ref="lugar" value={this.state.lugar} onChange={this.handleInputChange.bind(this)} />
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditEvento;
