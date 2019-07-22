let todos = getSavedTodos();

const filters = {
    filterText : "",
    hideCompleted : false
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.filterText = e.target.value;
   renderTodos(todos, filters);   
})

document.querySelector("#add-todo").addEventListener("submit", function(e) {
    e.preventDefault();
    let text =  e.target.elements.todo.value.trim()
    if(text.length > 0){
        todos.push({
            id: uuidv4(),
           text,
        completed : false
        });
       saveTodos(todos);
        renderTodos(todos, filters);
        e.target.elements.todo.value = '';
    } else {
        alert('Todo text cannot be empty')
    }
})

document.querySelector('#toggleTodos').addEventListener('change', function(e) {
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters);
});
