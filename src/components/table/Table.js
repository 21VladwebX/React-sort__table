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
    this.state = ({
      data: this.props.data,
      sortBy: null,
      descending: false,
      edit: null
    })

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
    this.setState({
      data: data,
      sortBy: column,
      descending: descending,
    });
  };

  inputClick(e){
    console.log(e.target.attributes.rowkey.value);
    this.setState({
      edit: {
        row: parseInt(e.target.attributes.rowkey.value),
        cell: e.target.cellIndex,
      }
    })
  }

  save(e){
    e.preventDefault();
    let input = e.target.firstChild;
    let data = this.state.data.slice();

    data[this.state.edit.row][this.state.edit.cell] = input.value;
    // console.log(input);
    // console.log(e.target);
    this.setState({
      edit: null,
      data: data,
    })

  }

    render() {

      return (
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
      );
    }
}

export default Table;
