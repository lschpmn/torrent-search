'use strict';

const io = require('socket.io')(5001);
const SearchServer = require('./lib/SearchServer');

io.on('connection', function(socket) {
  let currSearch;
  
  socket.on('search', ({searchTerm}) => {
    currSearch = new SearchServer(searchTerm);
    
    currSearch.on('results', results => {
      socket.emit('results', results);
    });
  });
});