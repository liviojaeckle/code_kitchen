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
        listItem.textContent = newTask;
        document.getElementById('todoList').appendChild(listItem);
        input.value = '';
    } else {
        alert("Du musst eine Aufgabe eingeben.");
    }
}

function deleteTask() {

}
