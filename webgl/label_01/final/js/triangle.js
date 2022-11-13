"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	//var vertices = [
	//	/*-1.0, -1.0, 
	//	 0.0,  1.0, 
	//	 1.0, -1.0,*/ //三角形顶点参数
	//	/*-1.0, -1.0, 
	//	-1.0, 1.0,
	//	1.0, -1.0,
	//	-1.0, 1.0,
	//	1.0, 1.0,
	//	1.0, -1.0*/ //四边形绘制参数 两个三角形拼接
	//	-1.0, 0,
	//	-1.0, -1.0,
	//	0, -1.0,
	//	0, 0,
	//	1.0, 0,
	//	1.0, -1.0
	//];
	var vertices = new Float32Array([
		1.0, -1.0, 1.0, 0, 0, 1.0,
		-1.0, -1.0, 0, 1.0, 0, 1.0,
        0, 1.0, 0, 0, 1.0, 1.0
	]);

	var fsize = vertices.BYTES_PER_ELEMENT; //字节长度

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	var aPosition = gl.getAttribLocation( program, "aPosition" );
	var aColor = gl.getAttribLocation( program, "aColor" );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
	gl.vertexAttribPointer( aPosition , 3 , gl.FLOAT , false , fsize * 6 , 0);
	gl.enableVertexAttribArray( aPosition );
	//gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.vertexAttribPointer( aColor , 4 , gl.FLOAT, false , fsize * 6 , fsize * 2 ); 
	gl.enableVertexAttribArray( aColor );

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLES, 0, 3 ); 三角形绘制函数
	//gl.drawArrays( gl.TRIANGLES, 0, 6 ); 四边形绘制函数
	//gl.drawArrays( gl.TRIANGLES, 0, 3); 三角形和四边形绘制函数
	//gl.drawArrays( gl.TRIANGLE_FAN, 2, 6); 三角形和四边形绘制函数
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
}