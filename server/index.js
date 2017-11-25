'use strict';

const app = require('http').createServer();
const Promise = require('bluebird');
const io = require('socket.io')(app);
const TorrentFinder = require('./TorrentFinder/index');

app.listen(5001);

io.on('connection', function (socket) {
  socket.on('search', ({term}) => {
    let results = [];

    Promise.each(TorrentFinder.Search({ term, page: 0 }), _results => {
      results = TorrentFinder.MergeResults(results, _results);

      socket.emit('results', results);
    });
  });
});