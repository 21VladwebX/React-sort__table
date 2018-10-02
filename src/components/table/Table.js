import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tables.css'

class Table extends Component {
  static propTypes = {
    header: PropTypes.array,
    data: PropTypes.array
  }

  constructor(props){
    super(props);

    this.sort_on_click = this.sort_on_click.bind(this);
    this.inputClick = this.inputClick.bind(this);
    this.save = this.save.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.togleSearch = this.togleSearch.bind(this);
    this.search = this.search.bind(this);
    this.logState = this.logState.bind(this);
    this._replayToFirst = this._replayToFirst.bind(this);
    this._replayOne = this._replayOne.bind(this);
    this._goOn = this._goOn.bind(this);

    this.state = ({
      data: this.props.data,
      sortBy: null,
      descending: false,
      edit: null,
      search: false
    })

    this.preSearchData = null;
    this.filteredData = null;
    this.logHistory = [];
    this.logHistoryLength = 0;
    this.replayOne = 2;

  }

  sort_on_click (e){
    let column = e.target.cellIndex;
    let data = this.state.data.slice();
    let descending = this.state.sortBy === column && !this.state.descending;
    data.sort(function(a,b){
      return descending ? (a[column] < b[column] ? 1 : -1)
                        : (a[column] > b[column] ? 1 : -1)

    });
    // console.log(data);
    this.logState({
      data: data,
      sortBy: column,
      descending: descending,
    });
    // this.setState({
    //   data: data,
    //   sortBy: column,
    //   descending: descending,
    // });
  };

  inputClick(e){
    // console.log(e.target.attributes.rowkey.value);
    this.logState({
      edit: {
        row: parseInt(e.target.attributes.rowkey.value,10),
        cell: e.target.cellIndex,
      }
    });
    // this.setState({
    //   edit: {
    //     row: parseInt(e.target.attributes.rowkey.value),
    //     cell: e.target.cellIndex,
    //   }
    // });
  }

  save(e){
    e.preventDefault();
    let input = e.target.firstChild;
    let data = this.state.data.slice();

    data[this.state.edit.row][this.state.edit.cell] = input.value;

    this.logState({
      edit: null,
      data: data,
    });
    // this.setState({
    //   edit: null,
    //   data: data,
    // });


  }

  renderSearch(e){
    if(!this.state.search){
      return null;
    }
    return  <tr>{this.props.header.map(function(title, key){
                    return <td key={key}>
                            <input onChange={this.search} idx={key} type="text" className="input-search" key={key} />
                          </td>
                  }, this)}
            </tr>
  }


  togleSearch(e){
    if(this.state.search){
      this.logState({
        data: this.preSearchData,
        search: false
      });
      // this.setState({
      //   data: this.preSearchData,
      //   search: false
      // });
      this.preSearchData = null;
      this.filteredData = null;
    }else{
      this.preSearchData = this.state.data;
      this.filteredData = this.state.data;
      this.logState({
        search: true
      });
      // this.setState({
      //   search: true
      // });
    }
  }

  search(e){

    let text = e.target.value;
    console.log(text);
    if(!text){
      this.logState({
        data: this.preSearchData
      });
     // this.setState({
     //   data: this.preSearchData
     // })
    }

    let rowKey = e.target.attributes.idx.value;
    let searchData;

    if(this.filteredData ){
      searchData = this.filteredData.filter(function(row){
        return row[rowKey].toString().indexOf(text) > -1;
      });
    }else{
      searchData = this.preSearchData.filter(function(row){
        return row[rowKey].toString().indexOf(text) > -1;
      });
    }

    this.filteredData = searchData;
    this.logState({
      data: searchData
    });
    // this.setState({
    //   data: searchData
    // });


  }

  _replayToFirst(){

    if(this.logHistory.length === 0 ){
      console.warn(`No history in stateHistory`);
      return;
    }
    let index = -1;
    let interval = setInterval(function(){
      index++;
      if(index === this.logHistory.length - 1){ // end of history
        clearInterval(interval);
      }
      this.setState(this.logHistory[index]);
    }.bind(this),1000)
  }
  _replayOne(index){
    if(this.logHistory.length === 0 ){
      console.warn(`No history in stateHistory`);
      return;
    }
    console.log(this.logHistory);
    this.setState(this.logHistory[index]);
  }

  _goOn(index){
    if(this.logHistory.length === 0 ){
      console.warn(`No history in stateHistory`);
      return;
    }
    console.log(`index is ${index}`);
    // console.log(this.logHistory[index]);
    this.setState(this.logHistory[index]);
  }

  logState(newState){ // state log

    this.logHistory.push(JSON.parse(JSON.stringify(
      this.logHistory.length === 0 ? this.state : newState
    )));
    this.setState(newState);
  }

  /*life cycle*/
  componentDidMount (){

    var now = -1;
    document.onkeydown = function (e) {

      if(e.altKey && e.shiftKey && e.keyCode === 82){
        //ALT + SHIFT + R
        this._replayToFirst();
      }
      if(e.shiftKey && e.keyCode === 90){
        //SHIFT + Z
        console.log(now);
        now = now === -1  ? this.logHistory.length : now;
        now = now > 0 ? now - 1: 0;
        console.log(`now is ${now}`);
        this._replayOne(now);
      }
      if(e.shiftKey && e.keyCode === 81){
        //SHIFT + Q
        console.log(`now is ${now}`);
        now = now === -1 ? 0 : now > this.logHistory.length - 1 ? now-1 : now;
        now = now + 1;
        console.log(`now is ${now}`);
        this._goOn(now );

      }

    }.bind(this);
  }
  componentDidUpdate() {
    this.logHistoryLength = this.logHistory.length;
    this.replayOne = 1;
  }

    render() {

      return (
        <div>
          <div className="toolbar">
            <button onClick={this.togleSearch}>
              {this.state.search ? 'Enaf' : `Let\`s search`}
            </button>
          </div>
          <div className="tables">
            <table>
              <thead onClick={this.sort_on_click}>
                <tr>
                  {this.props.header.map(function(title, key){
                    if( this.state.sortBy === key){
                      title += this.state.descending ? '\u2191' : '\u2193';
                    }
                    return <th key={key}>{title}</th>;
                  }, this)}
                </tr>
              </thead>

              <tbody >
                {this.renderSearch()}
                {this.state.data.map(function(title, rowKey) {
                  return  <tr key={rowKey} onDoubleClick={this.inputClick}>{
                            title.map(function(title,key){
                              let edit = this.state.edit;
                              if(edit && edit.row === rowKey && edit.cell === key){
                                return  <th key={key}>
                                            <form onSubmit={this.save}>
                                              <input defaultValue={title} type="text"/>
                                            </form>
                                        </th>
                              }
                              return <th rowkey={rowKey} key={key} >{title}</th>
                            }, this)}
                          </tr>
                }, this)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
}

export default Table;
