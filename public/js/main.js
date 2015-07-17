window.onload = function() {
	var socket = io.connect();
	var canvas = $('#drawCanvas')[0];
	var red = $('#redColor')[0];
	var green = $('#greenColor')[0];
	var blue = $('#blueColor')[0];
	var color = 'black';
	
	var ctx = canvas.getContext("2d");
	var redCtx = red.getContext("2d");
	var greenCtx = green.getContext("2d");
	var blueCtx = blue.getContext("2d");
	
	redCtx.beginPath();
	redCtx.arc(100,75,50,0,2*Math.PI, false);
	redCtx.fillStyle = 'red';
	redCtx.fill();
	redCtx.stroke();
	
	greenCtx.beginPath();
	greenCtx.arc(100,75,50,0,2*Math.PI);
	greenCtx.fillStyle = 'green';
	greenCtx.fill();
	greenCtx.stroke();
	
	blueCtx.beginPath();
	blueCtx.arc(100,75,50,0,2*Math.PI);
	blueCtx.fillStyle = 'blue';
	blueCtx.fill();
	blueCtx.stroke();

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
		};
	}

	var drawOnCanvas = function(x, y, drawColor) {
		console.log("Cords: "+x,y);
		ctx.fillStyle = drawColor;
		ctx.fillRect( x, y, 4, 4);
	};
	
	$(red).click( function(e) {
		color = 'red';
	});
	
	$(green).click( function(e) {
		color = 'green';
	});

	$(blue).click( function(e) {
		color = 'blue';
	});

	$(canvas).mousemove(function(e){
	 if(e.which==1)
	 {
		 var pos = getMousePos(canvas, e);
		 drawOnCanvas(pos.x, pos.y, color);
		 socket.emit('send', { x: pos.x, y: pos.y, color: color });
	 }
	});
	
	socket.on('message', function(data){
		if(data) {
			drawOnCanvas(data.x, data.y, data.color);
		}
	});
}