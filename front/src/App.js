import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Main />
    </div>
    <div className="fixed-action-btn">
      <Link to="/eventos/add" className="btn-floating btn-large red">
        <i className="fa fa-plus"></i>
      </Link>
    </div>
  </div>
)

export default App;

//import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

// if we need states, use Component instead
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Agenda Cultural</h1>
//       </div>
//     );
//   }
// }

// export default App;
