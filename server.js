var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var address =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

server.listen(port, address,function() {
    console.log("Listening on port " + port);
});

io.sockets.on('connection', function(socket) {
	socket.on('send', function(data){
		io.sockets.emit('message', data);
	});
});
