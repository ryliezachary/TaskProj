//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);

  //Add task event
  form.addEventListener('submit',addTask);
  //remove task event
  taskList.addEventListener('click',removeTask);
  clearBtn.addEventListener('click',clearTask);
  //filter tasks event
  filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks=[];

  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    //Add class
      li.className='collection-item';
    //Create textnode and append to li
    li.appendChild(document.createTextNode(task));
  
    //Create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //iconhtml
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link
    li.appendChild(link);
      
    //Append li to ul
     taskList.appendChild(li);
  });

}

//Add Task
function addTask(e){
  if(taskInput.value == ''){
    alert('Add a task');
  } else {
  //Create li element
  const li = document.createElement('li');
  //Add class
    li.className='collection-item';
  //Create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //iconhtml
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link
  li.appendChild(link);
    
  //Append li to ul
   taskList.appendChild(li);


   //Store in localStorage
   storeTaskInLocalStorage(taskInput.value);

   //ClearInput
   taskInput.value='';
}
  e.preventDefault();
}

//Add to LocalStorage
function  storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks=[];

  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are your Sure?')){
    e.target.parentElement.parentElement.remove();
    alert('Task Removed');

    //remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  }
 }
}
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks=[];

  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Task
function clearTask(e){
  //taskList.innerHTML='';  

  //faster
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
      }
    clearTasksFromLocalStorage();
}
//clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display='block';
    }else{
      task.style.display='none';
    }
  });
}