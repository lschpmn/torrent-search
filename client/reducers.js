'use strict';

import {combineReducers} from 'redux';

function isLoading(state = false, action) {
  switch(action.type) {
    case 'LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

function results(state = [], action) {
  switch(action.type) {
    case 'UPDATE_RESULTS':
      return action.results;
    default:
      return state;
  }
}

function searchTerm(state = '', action) {
  switch(action.type) {
    case 'UPDATE_SEARCH_TERM':
      return action.searchTerm;
    default:
      return state;
  }
}

export default combineReducers({
  isLoading,
  results,
  searchTerm
});