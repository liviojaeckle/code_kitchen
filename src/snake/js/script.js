const canvas = document.getElementById('playArea');
const ctx = canvas.getContext('2d');
const field = 30;

function playArea() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = field; x < canvas.width; x += field) {
        ctx.strokeStyle = 'rgba(0, 3, 0, 1)';
        ctx.strokeRect(x, 0, field, canvas.height);
    }

    for (let y = field; y < canvas.height; y += field) {
        ctx.strokeStyle = 'rgba(0, 3, 0, 1)';
        ctx.strokeRect(0, y, canvas.width, field);
    }
}

let snake = [{ x: 3 * field, y: 2 * field }];
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode === 37 && d !== "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode === 38 && d !== "DOWN") {
        d = "UP";
    } else if (event.keyCode === 39 && d !== "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode === 40 && d !== "UP") {
        d = "DOWN";
    }
}

function showSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "blue" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, field, field);
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, field, field);
    }
}

function moveSnake() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === "LEFT") snakeX -= field;
    if (d === "UP") snakeY -= field;
    if (d === "RIGHT") snakeX += field;
    if (d === "DOWN") snakeY += field;
    
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height) {
        clearInterval(gameInterval);
        alert("Game Over");
    }

    snake.unshift({x: snakeX, y: snakeY});
    snake.pop();
}

function game() {
    playArea();
    showSnake();
    moveSnake();
}

let gameInterval = setInterval(game, 100);