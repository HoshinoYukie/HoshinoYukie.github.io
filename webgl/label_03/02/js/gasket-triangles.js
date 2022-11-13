"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;
var radius = 1;
var points = [];
var colors = [];

var numTimesToSubdivide = 3;

window.onload = function initTriangles(){
	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket

	// first, initialise the corners of the gasket with three points.
	var vertices = [
		0.0000, 	0.0000, 	-1.0000,
		0.0000, 	0.9428,		0.3333,
	   -0.8164, 	-0.4714, 	0.3333,
		0.8164, 	-0.4714, 	0.3333,
	];

	var t = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );

	divideTriangle( t, u, v, w, numTimesToSubdivide );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// enable hidden-surface removal
	gl.enable( gl.DEPTH_TEST );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var colorBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );

	renderTriangles();
};

function triangle( a, b, c, color ){
	//var k;
    //var zerovec3 = vec3.create();
    //vec3.zero( zerovec3 );
    //var radian = 0 * Math.PI / 180.0;

    //var a1 = vec3.create();
    //var b1 = vec3.create();
    //var c1 = vec3.create();

    //vec3.rotateZ( a1, a, zerovec3, radian);
    //vec3.rotateZ( b1, b, zerovec3, radian);
    //vec3.rotateZ( c1, c, zerovec3, radian);

	var colorBox = [
		1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 0.0,
	];

	for (var i = 0; i < 3; i++){
		colors.push( colorBox[ color * 3 + i ] );
	}
	points.push( a[0], a[1], a[2] );

	for (var i = 0; i < 3; i++){
		colors.push( colorBox[ color * 3 + i ] );
	}
	points.push( b[0], b[1], b[2] );

	for (var i = 0; i < 3; i++){
		colors.push( colorBox[ color * 3 + i ] );
	}
	points.push( c[0], c[1], c[2] );

	// for( k = 0; k < 3; k++ )
	// 	points.push( a[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( b[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( c[k] );
}

function tdTri( a, b, c, d ){
	triangle( a, b, d, 0 );
	triangle( a, c, b, 1 );
	triangle( a, c, d, 2 );
	triangle( b, c, d, 3 );
}

function divideTriangle( a, b, c, d, count ){
	// check for end of recursion
	if( count == 0 ){
		tdTri( a, b, c, d );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var ac = vec3.create();
		vec3.lerp( ac, a, c, 0.5 );
		var ad = vec3.create();
		vec3.lerp( ad, a, d, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var bd = vec3.create();
		vec3.lerp( bd, b, d, 0.5 );
		var cd = vec3.create();
		vec3.lerp( cd, c, d, 0.5 );

		divideTriangle( a, ab, ac, ad, count - 1 );
		divideTriangle( ab, b, bc, bd, count - 1 );
		divideTriangle( ac, bc, c, cd, count - 1 );
		divideTriangle( ad, bd, cd, d, count - 1 );
	}
}

function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_TEST );
	gl.drawArrays( gl.TRIANGLES, 0, points.length / 3 );
}