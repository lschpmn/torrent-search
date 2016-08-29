'use strict';

import io from 'socket.io-client';

export default class SearchNetwork {
  /**
   * @param {Redux.Store} store
   */
  constructor(store) {
    this._searchTerm = '';
    this._socket = null;
    console.log('created');
    
    store.subscribe(() => {
      const {searchTerm} = store.getState();
      console.log(searchTerm);
      
      if(searchTerm !== this._searchTerm) {
        this._searchTerm = searchTerm;
        this.newSearch();
      }
    });
  }
  
  newSearch() {
    console.log('Sent to server');
    
    if(!this._socket) {
      this._socket = io('http://me:5001');
    }
    
    this._socket.emit('search', {searchTerm: this._searchTerm});
  }
}