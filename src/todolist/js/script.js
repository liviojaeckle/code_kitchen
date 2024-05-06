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
        taskText.onclick = function() { this.parentNode.classList.toggle('completed'); };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.onclick = function() { deleteTask(listItem); };

        listItem.appendChild(taskText);
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