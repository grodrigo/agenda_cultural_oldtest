import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
    axios.get(`http://localhost:3001/api/eventos/${eventoId}`)
    .then(response => {
      this.setState({
        id: response.data.id,
        descripcion: response.data.descripcion,
        fecha: response.data.fecha,
        lugar: response.data.lugar
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  EditEvento(newEvento){
    axios.request({
      method:'put',
      url:`http://localhost:3001/api/eventos/${this.state.id}`,
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
    const value = target.value;
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
            <input type="text" name="descripcion" ref="descripcion" value={this.state.descripcion} onChange={this.handleInputChange} />
            <label htmlFor="descripcion">Descripci?n</label>
          </div>
          <div className="input-field">
            <input type="date" name="fecha" ref="fecha" onChange={this.handleInputChange} />
            <label htmlFor="fecha">Fecha</label>
          </div>
          <div className="input-field">
            <input type="text" name="lugar" ref="lugar" value={this.state.lugar} onChange={this.handleInputChange} />
            <label htmlFor="lugar">Lugar</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditEvento;
