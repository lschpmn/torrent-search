'use strict';

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Body from './Body';
import Head from './Head';
import reducers from '../reducers';

export default class Root extends Component {
  constructor() {
    super();
    
    this.state = {
      store: createStore(reducers)
    };
    
    //simply logs all state changes
    this.state.store.subscribe(() => console.log(this.state.store.getState()));
    
    this._updateSearchTerm = this._updateSearchTerm.bind(this);
  }
  
  _updateSearchTerm(searchTerm) {
    this.state.store.dispatch({
      type: 'UPDATE_SEARCH_TERM',
      searchTerm
    });
  }
  
  render() {
    return <Provider store={this.state.store}>
      <div style={styles.container}>
        <div style={{display: 'flex'}}>
          <Head search={this._updateSearchTerm} />
        </div>
    
        <div>
          <Body />
        </div>
      </div>
    </Provider>;
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
};