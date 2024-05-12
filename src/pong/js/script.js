const canvas = document.getElementById('pongGame');
const ctx = canvas.getContext('2d');

canvas.width =700;
canvas.height = 400;

let playerName1 = prompt("Spieler 1:");
let playerName2 = prompt("Spieler 2:");

let score1 = 0;
let score2 = 0;

let paused = false;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 8;
const paddleWidth = 10;
const paddleHeight = 100;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

let ballSpeedX = 8;
let ballSpeedY = 8;


function showBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawPaddles() {
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";

    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.roundRect(0, paddle1Y, paddleWidth, paddleHeight, 10);
    ctx.fill();

    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.roundRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 10);
    ctx.fill();

    ctx.shadowBlur = 0;
}

function checkCollisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight) {
    if (ballY + ballRadius > paddleY && ballY - ballRadius < paddleY + paddleHeight) {
        if (ballSpeedX > 0 && ballX + ballRadius > paddleX && ballX < paddleX + paddleWidth) {
            return true;
        } else if (ballSpeedX < 0 && ballX - ballRadius < paddleX + paddleWidth && ballX > paddleX) {
            return true;
        }
    }
    return false;
}

function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(playerName1 + ": " + score1, canvas.width / 4, 30);
    ctx.fillText(playerName2 + ": " + score2, 3 * canvas.width / 4, 30);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX - ballRadius <= 0) {
        score2++;
    } else if (ballX + ballRadius >= canvas.width) {
        score1++;
    }

    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (checkCollisionWithPaddle(0, paddle1Y, paddleWidth, paddleHeight)) {
        ballSpeedX = -ballSpeedX;
    }
    
    if (checkCollisionWithPaddle(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight)) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

}

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowUp") {
        paddle1Y -= 40;
        if (paddle1Y < 0) paddle1Y = 0;
    }

    if (event.key === "ArrowDown") {
        paddle1Y += 40;
        if (paddle1Y + paddleHeight > canvas.height) paddle1Y = canvas.height - paddleHeight;
    }

    if (event.key === "g") {
        paddle2Y -= 40;
        if (paddle2Y < 0) paddle2Y = 0;
    }

    if (event.key === "b") {
        paddle2Y += 40;
        if (paddle2Y + paddleHeight > canvas.height) paddle2Y = canvas.height - paddleHeight;
    } else if (event.key === "p" || event.key === "P") {
    paused = !paused; 
    pauseScreen();
}

});

function pauseScreen() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
}


function drawFieldBorder() {
    const borderWidth = 10; 
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, canvas.width, borderWidth);
    ctx.fillRect(0, 0, borderWidth, canvas.height);
    ctx.fillRect(canvas.width - borderWidth, 0, borderWidth, canvas.height);
    ctx.fillRect(0, canvas.height - borderWidth, canvas.width, borderWidth);
}


function game() {
    if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFieldBorder();
        showBall();
        drawPaddles();
        moveBall();
        drawScore();
    }
    requestAnimationFrame(game);
}
game();

