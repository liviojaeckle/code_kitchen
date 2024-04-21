const canvas = document.getElementById('playArea');
const ctx = canvas.getContext('2d');
const field = 30;

let food = {
    x: Math.floor(Math.random() * (canvas.width / field)) * field,
    y: Math.floor(Math.random() * (canvas.height / field)) * field
};

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let speed = 100;
let eaten = 0;

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

function checkCollision(head, snake) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
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

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, field, field);
}

function showSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "blue" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, field, field);
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, field, field);
    }
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 5, canvas.height - 10);
    ctx.fillText("Highscore: " + highScore, canvas.width - 140, canvas.height - 10);
}

function increaseSpeed() {
    if (eaten % 5 === 0 && eaten !== 0) {
        speed = Math.max(50, speed - 10);
        clearInterval(gameInterval);
        gameInterval = setInterval(game, speed);
    }
}

let paused = false;
function pause() {
    paused = !paused;
    if (paused) {
        clearInterval(gameInterval);
    } else {
        gameInterval = setInterval(game, speed);
    }
}

function moveSnake() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === "LEFT") snakeX -= field;
    if (d === "UP") snakeY -= field;
    if (d === "RIGHT") snakeX += field;
    if (d === "DOWN") snakeY += field;

    if (snakeX < 0) {
        snakeX = canvas.width - field;
    } else if (snakeX >= canvas.width) {
        snakeX = 0;
    }

    if (snakeY < 0) {
        snakeY = canvas.height - field;
    } else if (snakeY >= canvas.height) {
        snakeY = 0;
    }

    let newHead = {x: snakeX, y: snakeY};

    if (checkCollision(newHead, snake)) {
        clearInterval(gameInterval);
        alert("Game Over");
        return;
    }

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / field)) * field,
            y: Math.floor(Math.random() * (canvas.height / field)) * field
        };
        score += 1;
        eaten += 1;
        increaseSpeed();
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

function game() {
    playArea();
    drawFood();
    showSnake();
    moveSnake();
    drawScore();
}

let gameInterval = setInterval(game, speed);