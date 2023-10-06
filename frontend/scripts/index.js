var tasks = [];

function renderTasks(){
    document.querySelectorAll('.task').forEach(element => element.remove())

    for(let task of tasks){
        let newTask = document.createElement('div')
        newTask.classList.add('task')

        let newP = document.createElement('p')
        newP.innerText = task.task
        
        let checkBox = document.createElement('input')
        checkBox.setAttribute('type','checkbox')

        checkBox.addEventListener('change', (event) => {

        })

        let btnDiv = document.createElement('div')
        btnDiv.classList.add('button-container')

        let editBtn = document.createElement('button')
        editBtn.innerText = 'Edit'
        
        let removeBtn = document.createElement('button')
        removeBtn.innerText = 'Remove'

        editBtn.addEventListener('click', () => {
            let edit = prompt("Edit Task", task.task)
            editTask(task, edit)
        })
        
        removeBtn.addEventListener('click', () => {
            deleteTask(task)
        })

        newTask.appendChild(newP)
        newTask.appendChild(checkBox)

        btnDiv.appendChild(editBtn)
        btnDiv.appendChild(removeBtn)
        
        newTask.appendChild(btnDiv)

        document.getElementById('task-container').appendChild(newTask)
    }
}

function toggleTask(todo, done){
    tasks.indexOf[todo].done = done
    renderTasks()
}

function editTask(task, edit){
    tasks[tasks.indexOf(task)].task = edit;
    renderTasks()
}

function deleteTask(task){
    tasks = tasks.filter((t) => t!== task)
    renderTasks()
}

document.addEventListener('DOMContentLoaded', function(){

    document.forms.createTask.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const data = new FormData(event.target)
        
        let a = data.get('nextask');

        let task = { task: a, done: false }
        tasks.push(task)

        renderTasks()
    })

    document.getElementById('epileptic').addEventListener('input', (event) => {
        const inputValue = event.target.value
        if (inputValue === 'true') {
            document.body.classList.add('epileptic');
        } else {
            document.body.classList.remove('epileptic');
        }
    }) // TODO: FIX


    
})