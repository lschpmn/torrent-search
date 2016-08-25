'use strict';

import React, {Component} from 'react';
import {AppBar, TextField} from 'material-ui';

export default class Head extends Component {
  render() {
    const left = <TextField 
      inputStyle={{color: 'white '}}
      id="search"
    />;
    
    return <AppBar
      title="Torrent Search"
      titleStyle={{paddingLeft: '100px'}}
      iconElementLeft={left}
    />;
  }
}