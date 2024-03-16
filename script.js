document.addEventListener('DOMContentLoaded', function () {
    /* elements from HTML */
    const todoForm = document.querySelector('.todo-form'); // the form element with inside the input el toinput the new task 
    const todoInput = document.querySelector('.todo-input'); // to actually write the task text 
    const todoList = document.querySelector('.todo-list'); // the container where the tasks will be shown 
    const filterButtons = document.querySelectorAll('.filter-buttons button'); // to filter the tasks 

    let tasks = []; //initialize the array to store the tasks

    loadTasks(); // loads the tasks using the addtask function

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // prevents the default form submission hence no automatic refresh
        const taskText = todoInput.value.trim(); // retrieves the text entered in the todoInput field removing any whitespace
        if (taskText === '' || taskText.length < 4) { // check if the task text is empty or less than 4 characters
            if (taskText === '') {
                alert('Please enter the text!');// Show an alert message
            } else {
                alert('The text should be at least 4 characters long!');
            }
    
            todoInput.style.border = '5px solid red'; // add a red border to the input field
    
            return; // Exit the function since the input is not valid
        }
       
        todoInput.style.border = '';  // if the task text passes validation, remove the red border
        addTask(taskText); // proceed with adding the task
        
        todoInput.value = '';  // this clears the input field ( by placing an empty string '')
        saveTasksToLocalStorage(); //calling the function to save the updated task list
    });
    

    document.querySelector('.clear-completed').addEventListener('click', function () {
        clearCompletedTasks(); // Selecting the element (button) with the class clear completed, and when the button is clicked (evenlistener), it calls the function clearCompletedTask which will  clear the completed tasks and delete them from local storage 
    }); 

    filterButtons.forEach(button => { // iterate over each button in the filterbuttons collection
        button.addEventListener('click', function () { // this attaches for each button click an even listener
            const filter = button.textContent.toLowerCase(); // this convers to lowercase the text content of the button clicked, and then makes it the criteria in the filtertasks function
            filterTasks(filter);
        });
    });

    function addTask(taskText, completed = false, isNew = true) { // tasktext is the text of the task, completed is related to the filter and defaulted to no, isnew is defaulted to true and indicates if the task being added is new or not
        const taskElement = document.createElement('div'); // this part creates a <div> element and assign the task class for CSS (for the UI)
        taskElement.classList.add('task');
        if (completed) {
            taskElement.classList.add('completed'); // if the completed parameter is true, it adds the CSS class completed (for the UI, to make it mark as completed)
        }
        taskElement.textContent = taskText; //this adds the text to the task element to show the task row it in the page
        todoList.appendChild(taskElement); // this appends the taskElement to the todolist (to display the tasks)

    taskElement.addEventListener('click', function () {  // add an event listener to the task element to mark it as completed when clicked
        if (taskElement.classList.contains('completed')) { // toggle the 'completed' class for the task element to visually mark it as completed or uncompleted
            taskElement.classList.remove('completed'); // if it's already completed, remove the class
        } else {
            taskElement.classList.add('completed'); // if it's not completed, add the class
        }

        let index = -1;// this section serves to find the index of the task in the tasks array that matches the clicked task's text
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].text === taskText) {
                index = i;
                break; // exit the loop once a match is found after assigning the index of the matching task to the index variable
            }
        }

        if (index !== -1) { // if a matching task is found, because if the index is -1, no matching task was found
            tasks[index].completed = !tasks[index].completed; // toggle the completion status by flipping the completed property using the NOT operator (!)
        }

        saveTasksToLocalStorage();// save the updated tasks list to local storage
    });


        if (isNew) {
            tasks.push({  //  if this task is new (isNew = true), we add it to the tasks list, it basically pushes the task text and its completion status to the tasks array
                text: taskText,
                completed: completed
            });
        }
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // saves the tasks array to local storage after converting it to a string
    }

    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks')) || []; // loads the tasks from local storage and parses the string to an array
        tasks.forEach(task => { // adds each task from the array to the task list
            addTask(task.text, task.completed, false);
        });
    }

    function clearCompletedTasks() { // this functions serves to remove the completed tasks from the DOM
        const completedTasks = document.querySelectorAll('.task.completed');
        completedTasks.forEach(task => {
            task.remove();
        });
        tasks = tasks.filter(task => !task.completed); // remove completed tasks from the tasks array, otherwise it remains in the task list, even if toggled as completed
        saveTasksToLocalStorage();
    }

    function filterTasks(filter) { // function to make the filter buttons work
        const taskElements = document.querySelectorAll('.task');
        taskElements.forEach(taskElement => {
            switch (filter) {
                case 'all':
                    taskElement.style.display = 'block'; // display all tasks
                    break;
                case 'active':
                    if (!taskElement.classList.contains('completed')) { // display only active tasks (not completed)
                        taskElement.style.display = 'block';
                    } else {
                        taskElement.style.display = 'none';
                    }
                    break;
                case 'completed':
                    if (taskElement.classList.contains('completed')) { // display only completed tasks
                        taskElement.style.display = 'block';
                    } else {
                        taskElement.style.display = 'none';
                    }
                    break;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const backgroundImages = ['back.jpg', 'back1.jpg', 'back3.jpg', 'back4.jpg']; // array of background images
    const randomIndex = Math.floor(Math.random() * backgroundImages.length); // generate a random index
    const selectedImage = backgroundImages[randomIndex]; // get the randomly selected image
    document.body.style.backgroundImage = `url('${selectedImage}')`; // apply the selected image as background
});
