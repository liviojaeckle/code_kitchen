document.getElementById('input').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const input = document.getElementById('input');
    const newTask = input.value.trim();
    if (newTask) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        const taskText = document.createElement('span');
        taskText.textContent = newTask;

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.onclick = function() { this.parentNode.classList.toggle('completed'); };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.onclick = function() { deleteTask(listItem); };

        listItem.appendChild(taskText);
        listItem.appendChild(doneButton);
        listItem.appendChild(removeButton);
        document.getElementById('todoList').appendChild(listItem);
        input.value = '';
    } else {
        alert("Du musst eine Aufgabe eingeben.");
    }
}

function deleteTask(item) {
    item.remove();
}

function randomEyeMovement() {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        const offset = 6;

        const x = Math.random() * 2 * offset - offset; 
        const y = Math.random() * 2 * offset - offset;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
}

setInterval(randomEyeMovement, 400);

document.addEventListener('DOMContentLoaded', () => {
    const faces = document.querySelectorAll('.face');
    faces.forEach(face => {
        face.addEventListener('click', function() {
            this.classList.toggle('face-alternate-color');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        eye.addEventListener('click', function(event) {
            event.stopPropagation();
            this.classList.toggle('red');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mouths = document.querySelectorAll('.mouth');
    mouths.forEach(mouth => {
        mouth.addEventListener('click', function(event) {
            event.stopPropagation();
            this.classList.toggle('green');
        });
    });
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString();
    let minutes = now.getMinutes().toString();
    let seconds = now.getSeconds().toString();

    if (hours.length < 2) {
        hours = '0' + hours;
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
}

setInterval(updateClock, 1000);
document.addEventListener('DOMContentLoaded', updateClock); 
