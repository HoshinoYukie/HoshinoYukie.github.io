"use strict";

var gl;
var points;
var colors;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = new Float32Array([
		1.0, -1.0, 1.0, 0, 0, 1.0,
		-1.0, -1.0, 0, 1.0, 0, 1.0,
        0, 1.0, 0, 0, 1.0, 1.0
	]);

	var fsize = vertices.BYTES_PER_ELEMENT;

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	var aPosition = gl.getAttribLocation( program, "aPosition" );
	var aColor = gl.getAttribLocation( program, "aColor" );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
	gl.vertexAttribPointer( aPosition , 3 , gl.FLOAT , false , fsize * 6 , 0);
	gl.enableVertexAttribArray( aPosition );
	// Associate external shader variables with data buffer
	gl.vertexAttribPointer( aColor , 4 , gl.FLOAT, false , fsize * 6 , fsize * 2 ); 
	gl.enableVertexAttribArray( aColor );

	render();
}

function render(){
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
}