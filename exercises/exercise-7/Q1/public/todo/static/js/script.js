const addButton = document.getElementById("add-todo-submit");
const todoItems = document.getElementById("todo-items");
let itemNumber = 2;

addButton.addEventListener("click", () => {
  const addText = document.getElementById("add-todo-text");
  if(addText === '') {
    alert('Field is empty');
    return;
  }
  const html = `<div id="todo-item-section-${itemNumber}" class="todo-item-section">
    <p id="todo-item-${itemNumber}" class="todo-item">${addText.value}</p>
    <div class="todo-ctrl-btns">
      <input
        id="edit-btn-${itemNumber}"
        class="edit-btn"
        type="button"
        value="Edit"
        onclick="editTodo(this.id)"
      />
      <input
        id="remove-btn-${itemNumber}"
        class="remove-btn"
        type="button"
        value="Remove"
        onclick="removeTodo(this.id)"
      />
    </div>
  </div>`;
  addText.value = "";
  todoItems.insertAdjacentHTML("beforeend", html);

  itemNumber++;
});

const editTodo = (id) => {
  const itemId = id.charAt(id.length - 1);
  const todoItem = prompt(
    "Edit todo item:",
    document.getElementById(`todo-item-${itemId}`).textContent
  );
  document.getElementById(`todo-item-${itemId}`).innerHTML = todoItem;
};

const removeTodo = (id) => {
  const itemId = id.charAt(id.length - 1);
  document.getElementById(`todo-item-section-${itemId}`).remove();
};
