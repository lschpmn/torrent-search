'use strict';

import {combineReducers} from 'redux';

function searchTerm(state = 'dragon ball', action) {
  switch(action.type) {
    case 'UPDATE_SEARCH_TERM':
      return action.searchTerm;
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

export default combineReducers({
  searchTerm,
  results
});