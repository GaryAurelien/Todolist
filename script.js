//SELECTEURS

const inputTodolist = document.querySelector(".inputTodolist");
const buttonTodolist = document.querySelector(".buttonTodolist");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filterTodo");

//ECOUTEURS

document.addEventListener("DOMContentLoaded", getTodos);
buttonTodolist.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

//FUNCTIONS

function addTodo(event) {
  if (inputTodolist.value == "") {
    console.log("ne doit pas etre vide");
  } else {
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerHTML = inputTodolist.value;
    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    //Ajouter la todo au localStorage
    saveLocalTodos(inputTodolist.value);
    //Bouton Check
    const checkButton = document.createElement("button");
    checkButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    checkButton.classList.add("checkBtn");
    todoDiv.appendChild(checkButton);
    //Bouton Supprimer
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.classList.add("deleteBtn");
    todoDiv.appendChild(deleteButton);
    //AJOUTER NOTRE TodoDiv A todoList
    todoList.appendChild(todoDiv);
    inputTodolist.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "deleteBtn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check Mark
  if (item.classList[0] === "checkBtn") {
    item.parentNode.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Checker si il y a des items existant
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Checker si il y a des items existant
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    console.log(todo);
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    //Bouton Check
    const checkButton = document.createElement("button");
    checkButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    checkButton.classList.add("checkBtn");
    todoDiv.appendChild(checkButton);
    //Bouton Supprimer
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.classList.add("deleteBtn");
    todoDiv.appendChild(deleteButton);
    //AJOUTER NOTRE TodoDiv A todoList
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //Checker si il y a des items existant
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
