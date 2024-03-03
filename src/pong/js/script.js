const canvas = document.getElementById('pongGame');
const ctx = canvas.getContext('2d');

canvas.width =800;
canvas.height = 600;

ctx.fillStyle = 'red';
ctx.fillRect(200, 200, 200, 200);

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 25,
};

function showBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

showBall();
