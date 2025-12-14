// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Function to add a new task to the list
     */
    function addTask() {
        // Retrieve and trim the value from the input field
        const taskText = taskInput.value.trim();

        // Check if the input is not empty
        if (taskText === "") {
            // NOTE: The user prompt required using alert(). In a production environment, 
            // a custom modal or inline message should be used instead of alert().
            alert("Please enter a task."); 
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // --- Advanced DOM Manipulation: Add a base class to the list item ---
        // This is where classList.add is used to assign a base style (if needed)
        // or a specific type, although we will use event listener for completion.
        li.classList.add('todo-item'); 

        // Add a click listener to the list item to mark it as complete/incomplete
        li.addEventListener('click', function() {
            // --- Advanced DOM Manipulation: Toggle the 'completed' class ---
            // This is the ideal use case for classList.
            this.classList.toggle('completed'); 
        });

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Removes the parent <li> element from the <ul>
            taskList.removeChild(li);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Attach event listener to the input field for the 'keypress' event
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});