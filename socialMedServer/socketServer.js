var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  var me;
  socket.on('newmsg',function(message){
    console.log('message envoyé');
    date = new Date().toLocaleDateString();;
    message.date = date;
    socket.broadcast.emit('newmsg', message);
  });

});

http.listen(3100, function(){
  console.log('listening on *:3100');
});



