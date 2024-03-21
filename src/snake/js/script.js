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

let snake = [];
snake[0] = {
    x: 3 * field,
    y: 2 * field
};

function showSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "blue" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, field, field);
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, field, field);
    }
}

document.addEventListener('keydown', function(event) {
    
});


function game() {
    playArea();
    showSnake();
}

game();