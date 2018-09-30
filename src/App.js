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
  constructor(props){
    super(props)
    this.state = {
      preloader: true
    };


  this.preloaderLogic = this.preloaderLogic.bind(this);

  setTimeout(this.preloaderLogic, 3000);

  }


  preloaderLogic(){

    console.log(`this.state.preloader ${ this.state.preloader}`);
    this.setState ({
      preloader: false,
    });
    console.log(`this.state.preloader ${ this.state.preloader}`);
  }

  render() {
    let preloader;
    if(this.state.preloader === true){
      preloader = <div className="preloader">
                    <div className="preloader-wrap">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>;
    }
    else{
      preloader = ``;
    }
    return (
      <div>
        {preloader}

        <div className="container">

          <Tables header={headers} data={data}/>


        </div>
      </div>

    );
  }
}

export default App;
