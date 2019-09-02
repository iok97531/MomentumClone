const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let list = [];

function updateToDosId(removedId)
{
    toDos.forEach(function(toDo)
    {
        if (toDo.id > removedId)
        {
            toDo.id = toDo.id - 1;
        }
    });

    list.forEach(function(li)
    {
        if (li.id > removedId)
        {
            li.id = li.id - 1;
        }
        
    });
}

function deleteToDo(event)
{
    const btn = event.target;
    const li = btn.parentNode;
    const removedId = li.id;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo)
    {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;

    if(toDos.length !== 0)
    {
        updateToDosId(removedId);
    }
    saveToDos();
}

function saveToDos()
{
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text)
{
    const li = document.createElement("li");
    
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.className = "toDo";
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    list.push(li);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}
function loadToDos()
{
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null)
    {
        const paredToDos = JSON.parse(loadedToDos);
        paredToDos.forEach(function(toDo)
        {
            paintToDo(toDo.text);
        });
    }
}

function init()
{
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();