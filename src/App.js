import React, { Component } from 'react';
import Tables  from './components/table/Table';
import './App.css';

let headers = [
  "Company",
  "Contact",
  "Country"
];
let data = [
  ['Alfreds Futterkiste','Maria Anders','Germany'],
  ['Centro comercial Moctezuma','Francisco Chang','Mexico'],
  ['Ernst Handel','Roland Mendel','Austria'],
  ['Island Trading','Helen Bennett','UK'],
  ['Laughing Bacchus Winecellars','oshi Tannamuri','Canada']
];

class App extends Component {


  render() {
    return (
      <div className="container">
        <Tables header={headers} data={data}/>


      </div>
    );
  }
}

export default App;
