//  Select Elements
let tasks = [];
const submitBtn = document.querySelector(".submit-btn");
const logoutBtn = document.querySelector('.logout-btn');
const oldTasks = document.querySelector(".task-list");
// DOM Elements
const taskInput = document.querySelector('#task'); 
const priorityInput = document.querySelector('#priority');
const errChk = document.querySelector('.error');
const filterTask = document.querySelector('#filter');
// const mailText = document.querySelector('.mail');
// mail.textContent = user.email;


filterTask.addEventListener('change', () => {
    showData();
})


// --- LOGOUT ---
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await fetch('http://localhost:8000/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = 'index.html';
    });
}

// --- HELPER: SET COLOR ---
const setColor = (obj, newTask) => {
    if(obj.priority === 'High') newTask.classList.add('red-font');
    else if(obj.priority === 'Medium') newTask.classList.add('yellow-font');
    else if(obj.priority === 'Low') newTask.classList.add('blue-font');
}

// --- DELETE TASK ---
const deleteTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if(response.ok) {
            showData(); 
        }
    } catch(error) {
        console.error("error deleting task", error);
    }
}

// const editStatus = async () => {
//     newTask.classList.toggle('completed-task');

//         const newStatus = newTask.classList.contains('completed-task');

//         try {
//             await fetch(`http://localhost:8000/todos/${obj.id}`, {
//                 method: 'PATCH',
//                 headers: {'content-Type': 'application/json'},
//                 body: JSON.stringify({
//                     isCompleted: newStatus
//                 }),
//                 credentials: 'include'
//             })
//         } catch(error) {
//             console.error("Error updating status", error);
//             newTask.classList.toggle('completed-task');
//         }
// }

// const editTask = async (e, obj) => {
//     e.stopPropagation();
//     const newText = prompt("Update your task", obj.task);

//     if(newText && newText !== obj.task) {
//         try {
//             const response = await fetch(`http://localhost:8000/todos/${obj.id}`, {
//                 method: 'PATCH',
//                 headers: {'content-Type': 'application/json'},
//                 body: JSON.stringify({
//                     task: newText
//                 }),
//                 credentials: 'include'
//             });

//             if(response.ok) {
//                 obj.task = newText;
//                 newTask.textContent = `${newText} - ${obj.priority}`
//             }
//         } catch(error) {
//             console.error("Error updating task", error);
//         }
//     }
// }

// --- CREATE DOM ELEMENTS ---
const createTaskElement = (obj) => {
    let newTaskDiv = document.createElement('div');
    newTaskDiv.className = 'new-task-div';

    let newTask = document.createElement('h3');
    newTask.classList.add('task-text');

    let editBtn = document.createElement('p');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = '✎';

    editBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const newText = prompt("Update your task", obj.task);

        if(newText && newText !== obj.task) {
            try {
                const response = await fetch(`http://localhost:8000/todos/${obj.id}`, {
                    method: 'PATCH',
                    headers: {'content-Type': 'application/json'},
                    body: JSON.stringify({
                        task: newText
                    }),
                    credentials: 'include'
                });

                if(response.ok) {
                    obj.task = newText;
                    newTask.textContent = `${newText}`
                }
            } catch(error) {
                console.error("Error updating task", error);
            }
        }
    });

    let taskClose = document.createElement('button');
    taskClose.className = 'del-btn';
    taskClose.innerText = "X";

    taskClose.addEventListener('click', () => {
        deleteTask(obj.id);
    });

    let taskContent = `${obj.task}`;
    newTask.textContent = taskContent;
    setColor(obj, newTask);

    if(obj.isCompleted) {
        newTask.classList.add('completed-task');
    }

    newTask.addEventListener('click', async () => {
        newTask.classList.toggle('completed-task');

        const newStatus = newTask.classList.contains('completed-task');

        try {
            await fetch(`http://localhost:8000/todos/${obj.id}`, {
                method: 'PATCH',
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify({
                    isCompleted: newStatus
                }),
                credentials: 'include'
            })
        } catch(error) {
            console.error("Error updating status", error);
            newTask.classList.toggle('completed-task');
        }
    });

    
    newTaskDiv.append(newTask);
    newTaskDiv.append(editBtn);
    newTaskDiv.append(taskClose);
    oldTasks.append(newTaskDiv);
}

// --- DISPLAY TASKS ---
const displayTasks = () => {
    const guide = document.querySelector('.color-indication');
    
    let filteredTasks = tasks;

    if(filterTask.value === 'Pending') {
        filteredTasks = tasks.filter(task => !task.isCompleted);
    }
    else if(filterTask.value === 'Completed') {
        filteredTasks = tasks.filter(task => task.isCompleted);
    }
    
    oldTasks.innerHTML = "";

    if(filteredTasks.length == 0) {
        
        guide.style.display = "none";

        let newTaskDiv = document.createElement('div');
        newTaskDiv.className = 'new-task-div';
        newTaskDiv.style.justifyContent = 'center';

        let newTask = document.createElement('h3');
        newTask.classList.add('no-text');
        if(tasks.length == 0) newTask.textContent = "No tasks found! Add a task!";
        else newTask.textContent =`No ${filterTask.value} Tasks Available!`;
        

        newTaskDiv.append(newTask);
        oldTasks.append(newTaskDiv);
        return;
    }

    guide.style.display = "flex";
    filteredTasks.forEach((obj) => {
        createTaskElement(obj);
    });
};


const addTask = async (taskValue, priorityValue) => {
    errChk.style.display = "none";
    try {
        
        const response = await fetch('http://localhost:8000/todos', {
            method: 'POST',
            
            headers: { 'Content-Type': 'application/json' },
            
            body: JSON.stringify({
                task: taskValue,
                priority: priorityValue
            }),
            credentials: 'include'
        });

        if(response.ok) {
            taskInput.value = ''; 
            showData();
        } else {
            console.log("Server rejected adding task");
        }
    } catch(error){
        console.error("Error adding the task", error);
    }
}

// --- EVENT HANDLER ---
const eventHandler = () => {
    const tVal = taskInput.value;
    const pVal = priorityInput.value;

    if(!tVal || !pVal) {
        errChk.style.display = "flex";
        return;
    } else {
        addTask(tVal, pVal);
    }
}

// --- FETCH DATA ---
const showData = async () => {
    try {
        loader.style.display = 'block';

        const response = await fetch('http://localhost:8000/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        
        if(!response.ok) {
            console.log("Fetch Failed. Status:", response.status);
            return;
        }

        const priorityWeight = {'High':3, 'Medium':2, 'Low':1};

        tasks = await response.json();
        tasks.sort((a,b) => {
            return priorityWeight[b.priority] - priorityWeight[a.priority];
        })
        loader.style.display = 'none';
        
        displayTasks();
    } catch(err) {
        console.error("error fetching tasks", err);
    }
}

submitBtn.addEventListener('click', eventHandler);
taskInput.addEventListener('keydown', (e) => {if(e.key === 'Enter') eventHandler()});


showData();