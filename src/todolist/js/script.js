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

setInterval(randomEyeMovement, 1000);

