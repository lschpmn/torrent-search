'use strict';

import React, {Component} from 'react';
import {AppBar, TextField} from 'material-ui';

export default class Head extends Component {
  /**
   * @param {Function} _props.search
   */
  constructor(_props) {
    super(_props);
    this.props = _props;
    
    this.state = {
      searchTerm: ''
    };
    
    this._search = this._search.bind(this);
  }
  
  _search(event) {
    if(event.keyCode !== 13) return;
    
    this.props.search(this.state.searchTerm);
  }
  
  render() {
    const left = <TextField 
      inputStyle={{color: 'white '}}
      id="search"
      onKeyDown={this._search}
      onChange={e => this.setState({searchTerm: e.target.value})}
      value={this.state.searchTerm}
    />;
    
    return <AppBar
      title="Torrent Search"
      titleStyle={{paddingLeft: '100px'}}
      iconElementLeft={left}
    />;
  }
}