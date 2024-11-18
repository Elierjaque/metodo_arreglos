// Arreglo para almacenar las tareas
let tasks = [];
let taskIdCounter = 1;

// Referencias a los elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const taskList = document.getElementById('taskList');


// Función para agregar una tarea
function addTask(event) {
    event.preventDefault(); // Evita la recarga de la página

        const taskDescription = taskInput.value.trim();
        if (taskDescription === '') {
            alert('Por favor, escribe una tarea');
            return;
        }
   

    // Crear una nueva tarea con un ID secuencial
    const newTask = {
        id: taskIdCounter, // Asigna el ID actual del contador
        description: taskDescription,
        completed: false
     };

    tasks.push(newTask); // Agrega la tarea al arreglo
    taskIdCounter++; // Incrementa el ID para la siguiente tarea

    renderTasks();
    updateCounters();
    taskInput.value = ''; // Limpia el campo de entrada
    }

    // Función para eliminar una tarea por su ID
    function deleteTask(taskId) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
            updateCounters();

    // Agregar la tarea al arreglo
    tasks.push(newTask);

    // Actualizar la interfaz
    renderTasks();
    updateCounters();

    // Limpiar el campo de entrada
    taskInput.value = '';
}

// Función para eliminar una tarea por su ID
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    updateCounters();
}


// Función para marcar una tarea como completada
function toggleTaskStatus(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });

    renderTasks();
    updateCounters();
}

// Función para renderizar las tareas en la lista
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar la lista existente

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.id}   ${task.description}`;
        li.className = taskList;

        // Aplicar estilo si la tarea está completada
        if (task.completed) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }

        // Botón para cambiar el estado de la tarea
        const toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Tarea Completada' : 'Tarea Pendiente';
        toggleButton.onclick = () => toggleTaskStatus(task.id);

        // Botón para eliminar la tarea y con stylo css
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-btn';/*con esto le doy stylo ccs al boton eliminar*/
        deleteButton.onclick = () => deleteTask(task.id);

        // Añadir los botones al elemento de la lista
        li.appendChild(toggleButton);
        li.appendChild(deleteButton);

        // Añadir el elemento a la lista
        taskList.appendChild(li);
    });
}


// Función para actualizar los contadores
function updateCounters() {
    totalTasks.textContent = tasks.length; // Total de tareas
    completedTasks.textContent = tasks.filter(task => task.completed).length; // Tareas completadas
}

// Evento para agregar una nueva tarea
taskForm.addEventListener('submit', addTask);
