const localStorageKey = 'to-do-list-gn'

function validateIfExistsNewTask() {
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name ==inputValue)
    return !exists ? false : true
}

function newTask () {
    let input = document.getElementById('input-new-task')
    input.style.border = ''
    

    //Validação de campo vazio
    if(!input.value){
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
    } 
    else if (validateIfExistsNewTask()) {
        alert('Já existe uma tarefa com esse nome')
    }

    //Incrementado no localStorage
    else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value,
            completed:false
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `
        <li data-index="${i}">
            
            <input id='ipt-completed' type="checkbox" title='Marcar a tarefa como concluído' onclick="toggleCompletedTask('${values[i]['name']}')" ${values[i]['completed'] ? 'checked' : ''}>

            <span id="task-name-${i}" style="text-decoration: ${values[i]['completed'] ? 'line-through' : 'none'};">
                ${values[i]['name']}
            </span>

            <input type="text" id="edit-input-${i}" value="${values[i]['name']}" 
                   onblur="saveEdit(${i})" onkeydown="handleKeyPress(event, ${i})" style="display:none;">

            <div class=button-group>
                <button id="btn-edit" title="Editar nome da tarefa" onclick="editTask(${i})">✏️</button>
                <button id='btn-delete' title='Excluir a tarefa da lista' onclick='removeItem("${values[i]['name']}")'>🗑️</button>
            </div>
        </li>`
    }
}

function toggleCompletedTask(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    let task = values.find(x => x.name === taskName)
    if (task) {
        task.completed = !task.completed
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues() 
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

function editTask(index) {
    let taskName = document.getElementById(`task-name-${index}`);
    let editInput = document.getElementById(`edit-input-${index}`);

    if (taskName && editInput) {
        taskName.style.display = "none";
        editInput.style.display = "inline";
        editInput.focus();
    }
}

function saveEdit(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let editInput = document.getElementById(`edit-input-${index}`);

    if (editInput && editInput.value.trim()) {
        values[index].name = editInput.value.trim();
        localStorage.setItem(localStorageKey, JSON.stringify(values));
    }

    showValues();
}

function handleKeyPress(event, index) {
    if (event.key === "Enter") {
        saveEdit(index);
    }
}

showValues()

const themeStorageKey = 'theme-preference';

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    

    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem(themeStorageKey, isLightMode ? 'light' : 'dark');
}

function loadTheme() {
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.createElement('button');
    themeToggleButton.id = 'theme-toggle';
    themeToggleButton.textContent = '🌞/🌙';
    themeToggleButton.title = 'Alternar tema';
    themeToggleButton.onclick = toggleTheme;
    document.body.prepend(themeToggleButton);
});


loadTheme();