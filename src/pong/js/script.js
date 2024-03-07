const canvas = document.getElementById('pongGame');
const ctx = canvas.getContext('2d');

canvas.width =800;
canvas.height = 600;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 8;
const paddleWidth = 10;
const paddleHeight = 100;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

let ballSpeedX = 4;
let ballSpeedY = 4;


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

    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

}

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowUp") {
        paddle1Y -= 20;
        if (paddle1Y < 0) paddle1Y = 0;
    }

    if (event.key === "ArrowDown") {
        paddle1Y += 20;
        if (paddle1Y + paddleHeight > canvas.height) paddle1Y = canvas.height - paddleHeight;
    }

});

function game() {
    showBall();
    drawPaddles();
    moveBall();
    requestAnimationFrame(game);
}

game();
