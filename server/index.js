'use strict';

const io = require('socket.io')(5001);
const SearchMaster = require('./lib/SearchMaster');

io.on('connection', function(socket) {
  let currSearch;
  
  socket.on('search', ({searchTerm}) => {
    currSearch = new SearchMaster(searchTerm);
    
    currSearch.on('results', res => {
      socket.emit('results', {results:  res});
    });
  });
});