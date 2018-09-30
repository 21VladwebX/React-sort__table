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
      <div>
        <div className="preloader">
          <div className="preloader-wrap">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="container">

          <Tables header={headers} data={data}/>


        </div>
      </div>

    );
  }
}

export default App;
