'use strict';

import io from 'socket.io-client';

export default class SearchClient {
  /**
   * @param {Redux.Store} store
   */
  constructor(store) {
    this._store = store;
    this._searchTerm = '';
    this._socket = null;
    
    store.subscribe(() => {
      const {searchTerm} = store.getState();
      
      if(searchTerm !== this._searchTerm) {
        this._searchTerm = searchTerm;
        this.newSearch();
      }
    });
  }
  
  /**
   * @param {Boolean} isLoading
   */
  loading(isLoading) {
    this._store.dispatch({
      type: 'LOADING',
      isLoading
    });
  }
  
  newSearch() {
    if(!this._socket) {
      this._socket = io('http://me:5001');
      
      this._socket.on('results', results => {
        this.loading(false);
        this._store.dispatch({
          type: 'UPDATE_RESULTS',
          results
        });
      });
      
      this._socket.on('error', () => this.loading(false));
    }
    
    this.loading(true);
    this._socket.emit('search', {searchTerm: this._searchTerm});
  }
}