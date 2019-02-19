import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class EventoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            item:props.item
        }
    }
    render(){
        return(
            <li className="collection-item">
                <Link to={`/eventos/${this.state.item.id}`}>
                {this.state.item.descripcion}</Link>
            </li>
        )
    }
}

export default EventoItem;
