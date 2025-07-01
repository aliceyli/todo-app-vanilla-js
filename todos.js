let todoItems = ["prep lunch", "go to meet and greet", "code"];
const todoListEl = document.getElementById("todo-list");
const newTodoInput = document.getElementById("new-todo");
const addButton = document.getElementById("add-item");

const createRemoveButton = () => {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", onRemoveClick);
  return removeButton;
};

const createEditButton = () => {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", onEdit);
  return editButton;
};

const createSaveButton = () => {
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", onSaveClick);
  return saveButton;
};

const createInputEl = (input) => {
  const inputEl = document.createElement("input");
  inputEl.value = input;
  return inputEl;
};
const addItem = (item) => {
  todoItems.push(item);
};

const addListEl = (item) => {
  // li element
  const newList = document.createElement("li");
  const newText = document.createTextNode(item);

  newList.appendChild(newText);
  newList.appendChild(createRemoveButton());
  newList.appendChild(createEditButton());

  todoListEl.appendChild(newList);
};

const onEdit = (e) => {
  // if the structure updates, i have to find this and change it.
  // i should probably put this in a function or something?
  // TODO: can use replaceChild() to replace the whole list item with an edit view
  // instead of replacing individual components with replaceWith
  const editButton = e.srcElement;
  const listEl = editButton.parentNode;
  const listTextEl = listEl.firstChild;
  const text = listTextEl.textContent;

  listTextEl.replaceWith(createInputEl(text));

  // replace editButton with saveButton
  editButton.replaceWith(createSaveButton());
};

const onSaveClick = (e) => {
  const saveButton = e.srcElement;
  const listEl = saveButton.parentNode;
  const listInput = listEl.firstChild;
  const text = listInput.value;

  // update input with text
  listInput.replaceWith(document.createTextNode(text));
  saveButton.replaceWith(createEditButton());

  // update data list
};

const onRemoveClick = (e) => {
  const listEl = e.srcElement.parentNode;
  const todoText = listEl.firstChild.textContent;

  // remove element
  listEl.remove();

  // remove from data list
  const idx = todoItems.indexOf(todoText);
  todoItems.splice(idx, 1);
  console.log(todoItems);
};

const onAddClick = () => {
  let inputText = newTodoInput.value;
  if (inputText.length < 3) {
    alert("must be 3 or more characters");
    return;
  }
  addItem(inputText);
  addListEl(inputText);

  newTodoInput.value = "";
};

const onAddInput = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    onAddClick();
  }
};

const renderCurrentList = () => {
  for (let todo of todoItems) {
    addListEl(todo);
  }
};

addButton.addEventListener("click", onAddClick);
newTodoInput.addEventListener("keypress", onAddInput);
renderCurrentList();
console.log(todoItems);
