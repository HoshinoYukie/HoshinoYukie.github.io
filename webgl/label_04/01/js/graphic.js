"use strict";

var canvas;
var gl;

var radius = 0.8;
var theta = 0.0;
var speed = 3 * 0.01;
var direction = 1;

var n = 24;
var vertices = [];

var currentKey = [];

var color = [];

var rLoc;
var tLoc;

window.onload = function init(){
    initAngles();

    document.getElementById( "numSides" ).onchange = function( event ){
        vertices = [];
        n = event.target.value * 3;
        initAngles();
    }
    document.getElementById( "speed" ).onchange = function( event ){
        speed = event.target.value * 0.01;
    }

    render();
}

function handleKeyDown( event ){
    var key = event.keyCode;
    currentKey[key] = true;
    switch(key) {
        case 32:
            if( speed > 0.0 ){
                speed = 0.0;
            }
            else{
                speed = document.getElementById( "speed" ).value * 0.01;
            }
            break;
        case 65:
            if( radius > 0.05 ){
                radius -= 0.05;
            }
            break;
        case 68:
            if( radius < 1){
                radius += 0.05;
            }
            break;
    }
}
function handleKeyUp( event ) {
    var key = event.keyCode;
    currentKey[key] = false;
}

function initAngles(){
    var step = 360 / n;

    for( var i = 0; i < n; i++ ){
        vertices.push( step * i );
    }
    for( var i = 0; i < n / 3; i++){
        color.push(0.47, 0.42, 0.68, 1.0);
    }

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    tLoc = gl.getUniformLocation( program, "theta" );
    rLoc = gl.getUniformLocation( program, "radius" );

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    var aAngle = gl.getAttribLocation( program, "aAngle" );
	gl.vertexAttribPointer( aAngle, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( aAngle );

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( color ), gl.STATIC_DRAW);

    var aColor = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( aColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aColor );

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    return n;
}

function change(){
    direction *= -1;
}

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, n );

    if( theta > 2 * Math.PI ){
        theta -= (2 * Math.PI);
    }
    else if( theta < -2 * Math.PI ){
        theta += (2 * Math.PI);
    }

    theta += speed * direction;
    gl.uniform1f( rLoc, radius );
    gl.uniform1f( tLoc, theta );
    setTimeout( function(){ requestAnimationFrame( render ) }, 0.05 );
}
