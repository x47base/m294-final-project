var tasks;

async function renderTasks(){
    document.querySelectorAll('.task').forEach(element => element.remove());

    try {
        const response = await fetch('http://localhost/tasks', {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const tasks = await response.json(); // Parse the JSON response

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            let newTask = document.createElement('div');
            newTask.classList.add('task');

            let newP = document.createElement('p');
            newP.innerText = task.title;

            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');

            checkBox.addEventListener('change', (event) => {
                // Handle checkbox change
            });

            let btnDiv = document.createElement('div');
            btnDiv.classList.add('button-container');

            let editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';

            let removeBtn = document.createElement('button');
            removeBtn.innerText = 'Remove';

            editBtn.addEventListener('click', () => {
                let edit = prompt("Edit Task", task.task);
                editTask(task, edit);
            });

            removeBtn.addEventListener('click', () => {
                deleteTask(task);
            });

            newTask.appendChild(newP);
            newTask.appendChild(checkBox);

            btnDiv.appendChild(editBtn);
            btnDiv.appendChild(removeBtn);

            newTask.appendChild(btnDiv);

            document.getElementById('task-container').appendChild(newTask);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function toggleTask(todo, completed){
    document.querySelectorAll('.task').forEach(element => element.remove())
    await fetch('http://localhost/tasks',{
        method: "GET"
    }).then(res => {
        tasks = Array.from(res.json())
    })

    tasks.indexOf[todo].completed = completed
    renderTasks()
}

async function editTask(task, edit){
    task.title = edit;

    try {
        const response = await fetch('http://localhost/tasks', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const tasks = await response.json(); // Parse the JSON response
        renderTasks()
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteTask(task){
    const response = await fetch('http://localhost/tasks', {
        method: "GET"
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    let tasks = await response.json();
    tasks = tasks.filter((t) => t !== task)
    
    try {
        const response = await fetch(`http://localhost/task/${task.id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        renderTasks()
    } catch (error) {
        console.error('Error:', error);
    }

    renderTasks()
}


async function handleLogin(user){
    await fetch('http://localhost/auth/cookie/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(res => {
        if(res.ok){
            alert('successfully logged in')
        } else {
            let info = res.json()
            console.log(info)
            alert(info.message)
        }
    })
}

document.addEventListener('DOMContentLoaded', function(){

    renderTasks()

    document.forms.createTask.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const data = new FormData(event.target)
        
        const response = await fetch('http://localhost/tasks', {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const tasks = await response.json(); // Parse the JSON response

        let a = data.get('nextask');

        let task = { id: tasks.length, title: a, completed: false }

        await fetch('http://localhost/tasks',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        }).then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            renderTasks()
        })
    })

    document.getElementById('epileptic').addEventListener('input', (event) => {
        const inputValue = event.target.value
        if (inputValue === 'true') {
            document.body.classList.add('epileptic');
        } else {
            document.body.classList.remove('epileptic');
        }
    }) // TODO: FIX

    document.forms.login.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let user = { email: data.get('l-email'), password: data.get('l-password') }
        handleLogin(user)
    })
    
});
