// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Helper function to read all current task texts from the DOM and save them to Local Storage.
     * This ensures Local Storage always reflects the current state of the visible list.
     */
    function saveTasksToStorage() {
        const tasks = [];
        // Iterate over all <li> elements in the task list
        taskList.querySelectorAll('li').forEach(li => {
            // Get the text content, excluding the text of the "Remove" button.
            // We retrieve the first text node, which holds the task description.
            let taskTextNode = li.firstChild;
            if (taskTextNode && taskTextNode.nodeType === Node.TEXT_NODE) {
                 tasks.push(taskTextNode.textContent.trim());
            }
        });
        // Serialize the array to JSON and save it under the key 'tasks'
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Creates a single task element (li with button) and appends it to the DOM.
     * Optionally saves the task to Local Storage.
     * @param {string} taskText - The text content of the task.
     * @param {boolean} [save=true] - Flag to determine if the task should be saved to Local Storage.
     */
    function addTask(taskText, save = true) {
        // Task creation and DOM manipulation
        const li = document.createElement('li');
        // Set text content for the task
        li.textContent = taskText;
        
        // Add a base class and click listener for completion feature (from previous task)
        li.classList.add('todo-item'); 
        li.addEventListener('click', function() {
            this.classList.toggle('completed'); 
        });

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event for removal
        removeButton.onclick = function() {
            // 1. Remove from DOM
            taskList.removeChild(li); 
            // 2. Update Local Storage after removal
            saveTasksToStorage();
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // --- Local Storage Logic (only if saving is enabled) ---
        if (save) {
            // Update Local Storage after adding the new item
            saveTasksToStorage();
            // Clear the input field only when manually adding a new task
            taskInput.value = ""; 
        }
    }

    /**
     * Loads tasks from Local Storage when the page loads.
     */
    function loadTasks() {
        // Retrieve and parse tasks, defaulting to an empty array if none are found
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // For each stored task, call addTask with the save flag set to false
        // The 'false' prevents the task from being saved back to storage immediately (avoiding redundancy)
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    // --- Event Listeners to trigger addTask ---

    // Event listener for the "Add Task" button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task."); 
            return;
        }
        addTask(taskText); // Calls addTask with save=true (default)
    });

    // Event listener for the 'Enter' keypress in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText); // Calls addTask with save=true (default)
            } else {
                alert("Please enter a task.");
            }
        }
    });

    // Invoke the function to load saved tasks immediately after DOM content is loaded
    loadTasks();
});