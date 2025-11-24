let tasks = [];
const submitBtn = document.querySelector(".submit-btn");
const oldTasks = document.querySelector(".task-list");
const task = document.querySelector('#task');
const priority = document.querySelector('#priority');
const errChk = document.querySelector('.error');


const setColor = (obj, newTask) => {
    
    if(obj.priority === 'High') newTask.className='red-font';
    else if(obj.priority === 'Medium') newTask.className = 'yellow-font';
    else if(obj.priority === 'Low') newTask.className = 'blue-font';

}

const createTask = (obj, idx) => {
        let newTaskDiv = document.createElement('div');
        let newTask = document.createElement('h3');
        let taskClose = document.createElement('button');
        taskClose.className = 'del-btn';
        taskClose.innerText = "X";

        taskClose.addEventListener('click', () => {
            tasks.splice(idx, 1);
            saveData();
            displayTasks();
        })

        newTaskDiv.className = 'new-task-div';
        let taskContent = `${obj.task} - ${obj.priority}`;
        newTask.textContent = taskContent;
        setColor(obj, newTask);
        newTaskDiv.append(newTask);
        newTaskDiv.append(taskClose);
        oldTasks.append(newTaskDiv);
}

const displayTasks = () => {
    task.value = '';
    oldTasks.innerHTML = "";
    tasks.forEach((obj, idx) => {
        createTask(obj,idx);
    })
};


const eventHandler = () => {

    if(!task.value || !priority.value) {
        errChk.style.display = "flex";
    }
    else  {
        errChk.style.display = "none";
        const taskAdded = {
            'task': task.value,
            'priority': priority.value,
        }
        const priorityWeight = {'High':3, 'Medium':2, 'Low':1};
        tasks.push(taskAdded);
        tasks.sort((a,b) => {
            return priorityWeight[b.priority] - priorityWeight[a.priority];
        })
        saveData();
        displayTasks();
    }
}


function saveData() {
    localStorage.setItem("data", JSON.stringify(tasks));
}


function showData() {
    tasks = JSON.parse(localStorage.getItem("data")) || [];
    displayTasks();
}
showData();



submitBtn.addEventListener('click', eventHandler)

task.addEventListener('keydown', (e) => {if(e.key === 'Enter') eventHandler()})







