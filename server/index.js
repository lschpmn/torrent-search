'use strict';

const app = require('http').createServer();
const io = require('socket.io')(app);
const PirateBaySite = require('./TorrentFinder/sites/PirateBaySite');

app.listen(5001);

io.on('connection', function (socket) {
  socket.on('search', ({searchTerm}) => {
    PirateBaySite
      .Search({ term: searchTerm, page: 0 })
      .then(results => socket.emit('results', results))
      .catch(err => socket.emit('error', err));
  });
});