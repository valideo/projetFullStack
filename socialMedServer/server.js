const http = require('http');
const app = require('./app');
const httpSocketServer = require('./socketServer');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, function(){
    console.log('server listening on port ' + port);
});
