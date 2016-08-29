'use strict';

const io = require('socket.io')(5001);

io.on('connection', function(socket) {
  socket.on('search', res => {
    console.log('received message');
    console.log(res);
  });
});