const field = 30;
const widthFields = 20;
const heightFields = 15;

const canvas = document.getElementById('playArea');
const ctx = canvas.getContext('2d');
canvas.width = field * widthFields;
canvas.height = field * heightFields;

let food = {
    x: Math.floor(Math.random() * (canvas.width / field)) * field,
    y: Math.floor(Math.random() * (canvas.height / field)) * field
};

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let speed = 100;
let eaten = 0;

function pauseScreen() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
}

function playArea() {
    ctx.fillStyle = 'darkslategray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let x = field; x < canvas.width; x += field) {
        ctx.strokeStyle = 'lightgray';
        ctx.strokeRect(x, 0, field, canvas.height);
    }

    for (let y = field; y < canvas.height; y += field) {
        ctx.strokeStyle = 'lightgray';
        ctx.strokeRect(0, y, canvas.width, field);
    }
}

let paused = false;
function pause() {
    paused = !paused;
    if (paused) {
        clearInterval(gameInterval);
        pauseScreen();
    } else {
        gameInterval = setInterval(game, speed);
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
    if (event.keyCode === 80) {
        pause();
    } else if (event.keyCode === 32) {
        document.location.reload(); }
        else if (!paused) {
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
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, field, field);
}

function gameOver() {
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Press Space to Restart", canvas.width / 2, canvas.height / 2 + 40);
}

function showSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "grey" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, field, field);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, field, field);
    }
}

function drawScore() {
    ctx.fillStyle = "white"; 
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
    ctx.fillText("Highscore: " + highScore, canvas.width - 150, 20);
}

function increaseSpeed() {
    if (eaten % 5 === 0 && eaten !== 0) {
        speed = Math.max(50, speed - 10);
        clearInterval(gameInterval);
        gameInterval = setInterval(game, speed);
    }
}

const winningScore = 10; 

function checkWin() {
    if (score1 >= winningScore || score2 >= winningScore) {
        
        //function
        
        clearInterval(gameInterval);
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
        gameOver();                 
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

document.getElementById('gameTitle').addEventListener('click', function() {
    const title = this;
    if (title.style.animationName === 'rotate, rainbow') {
        title.style.animationName = '';
    } else {
        title.style.animationName = 'rotate, rainbow';
        title.style.animationDuration = '2.5s, 1s';
        title.style.animationIterationCount = 'infinite';
        title.style.animationTimingFunction = 'linear, linear';
    }
});

function game() {
    if (!paused) {
        playArea();
        drawFood();
        showSnake();
        moveSnake();
        drawScore();
    }
}

let gameInterval = setInterval(game, speed);