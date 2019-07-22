// return saved todos
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    let todoArray = [];

    if(todoJSON !== null) {
       todoArray = JSON.parse(localStorage.getItem('todos'));
       return todoArray;
    } else {
        return [];
    }
}

//Toggle todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
      return todo.id === id
    })
    
    if(todo !== undefined){
        todo.completed = !todo.completed
    }
}

//Remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => {
        return todo.id === id;
    })
    if(todoIndex > -1){
        todos.splice(todoIndex, 1);
    }
}

// save todo's
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

 //generate todo Dom
 const generateTodoDom = (todo) => {

     const todoContainer = document.createElement('label')
     const containerEl = document.createElement('div')
     const todoCheckbox = document.createElement('input');
     const todoText = document.createElement('span');
     const removeButton = document.createElement('button');

    // setup the checkbox
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.checked = todo.completed
    containerEl.appendChild(todoCheckbox);
    todoCheckbox.addEventListener('change', (e) => {
            toggleTodo(todo.id)
            saveTodos(todos)
            renderTodos(todos, filters)
    })

     // setup the todo text
    todoText.textContent = todo.text;
    containerEl.appendChild(todoText);

    // setup the container
    todoContainer.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoContainer.appendChild(containerEl)

    // setup the remove button 
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoContainer.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })
  
    return todoContainer;
}

 // generate summary dom for
 const genSummaryDom = (incompleteTodo) => {
   let todoSummary = document.createElement('h2');
   todoSummary.classList.add('list-title')
    todoSummary.textContent = `You have ${incompleteTodo.length} ${incompleteTodo.length === 1 ? 'todo' : 'todos'} left undone`;
    return todoSummary;
 }

// render todo's
const renderTodos = function(todos, filters){
    const todoContainer = document.querySelector("#todos")

    let filteredTodos = todos.filter(function(todo) {
         return todo.text.toLowerCase().includes(filters.filterText.toLowerCase());
     })
 
     filteredTodos = filteredTodos.filter(function(todo){
         if(filters.hideCompleted){
           return !todo.completed;
         } else {
             return true
         }
     })

    todoContainer.innerHTML = "";
 
     const incompleteTodo = filteredTodos.filter(function(todo){
         return !todo.completed;
     });

     if(filteredTodos.length > 0){
        todoContainer.appendChild(genSummaryDom(incompleteTodo));
        filteredTodos.forEach(function(todo) {
            todoContainer.appendChild(generateTodoDom(todo));
        })
     } else {
         const noTodoText = document.createElement('p')
         noTodoText.textContent = 'There are No Todo\'s To Show'
         noTodoText.classList.add('empty-message')
         todoContainer.appendChild(noTodoText)
     }
         
 }
 