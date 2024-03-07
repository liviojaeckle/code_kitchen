const canvas = document.getElementById('pongGame');
const ctx = canvas.getContext('2d');

canvas.width =800;
canvas.height = 600;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 10;
const paddleWidth = 10;
const paddleHeight = 100;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

let ballSpeedX = 0.5;
let ballSpeedY = 0.5;


function showBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawPaddles() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

}

function game() {
    showBall();
    drawPaddles();
    moveBall();
    requestAnimationFrame(game);
}

game();
