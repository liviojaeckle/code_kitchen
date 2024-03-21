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

function game() {
    playArea();
}

game();