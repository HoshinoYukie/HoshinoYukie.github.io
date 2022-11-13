"use strict";

var canvas;
var gl;
//var nLoc;

var n = 300;
var vertices = [];

window.onload = function init(){
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    initAngles(gl);

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    var aAngle = gl.getAttribLocation( program, "aAngle" );
	gl.vertexAttribPointer( aAngle, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( aAngle );

    rander();
}

function initAngles(gl){
    var step = 360 / n;

    for( var i = 0; i < n; i++ ){
        vertices.push( step * i );
    }

    //nLoc = gl.getUniformLocation( program, "n2" );

    return n;
}

function rander(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, n );

    //gl.uniform1f( nLoc , initAngles(gl) );
    //console.log( initAngles(gl) );
    //requestAnimationFrame( rander );
}
