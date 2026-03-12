let task_arr = JSON.parse(localStorage.getItem("tasks")) || []; //local storage
let count = task_arr.length;                                    //count for id
let last_added = null;

render();

const add=document.getElementById('add');                       //add btn and function
const task_input = document.querySelector('.task-input');    
task_input.focus();                               

task_input.addEventListener('keydown',(e) =>{
    if(e.key==='Enter'){
        addTask(task_input.value);
    }
});

add.addEventListener('click', () => addTask(task_input.value));
function addTask(text){           
    let task_text = text;

    if(task_text === null || task_text.trim() === ""){
        alert("Task cannot be empty!");
        return;
    }
    count++;
    last_added = count;
    task_arr.push({ id : count, text: task_text, completed : false});
    task_input.value='';
    render();
}


function deleteTask(event){                                     //delete function
    const id = Number(event.target.id);
    let index=task_arr.findIndex(item => item.id === id);
    task_arr.splice(index,1);
    render();
}

function mask_done_task(event){                                 //mark completed function(toggle function)
    const id = Number(event.target.id);
    let index=task_arr.findIndex(item => item.id === id);
    task_arr[index].completed=true;

    render();
}

const clear_all = document.querySelector('#clear-all');         //clear all btn
clear_all.addEventListener('click', () => {
    task_arr=[];
    render();
});

const clear=document.querySelector('#clear');                   //clear completed list 
clear.addEventListener('click', () => {
    task_arr = task_arr.filter(task => task.completed === false);
    render();
});



function render(){                                          
    localStorage.setItem("tasks", JSON.stringify(task_arr));    //save changes to local storage

    const container=document.querySelector('.task');
    container.textContent='';

    const complete_container = document.querySelector('.complete');
    complete_container.textContent='';


    for(let items of task_arr){
        const para = document.createElement('p');

        if(items.id === last_added){
            para.classList.add("add-anim");
        }
        if(items.completed === false){                      //check if task is completed or not
            const task=document.querySelector('.task');
            const del=document.createElement('button');
            const mark=document.createElement('button');
            

            del.setAttribute('class','delete');
            del.setAttribute('id',items.id);
            mark.setAttribute('class','mark_done');
            mark.setAttribute('id',items.id);
            para.setAttribute('id',items.id);

            del.textContent='Delete';
            mark.textContent='Mark as Done';
            para.textContent=items.text;

            task.appendChild(para);
            task.appendChild(del);
            task.appendChild(mark);
        }
        else{                                               //if completed add to completed section 
            const complete = document.querySelector('.complete');
            const unmark = document.createElement('button');

            unmark.setAttribute('id',items.id);
            unmark.setAttribute('class','unmarked');
            para.setAttribute('id',items.id);

            unmark.textContent='unmark';
            para.textContent=items.text;

            complete.appendChild(para);
            complete.appendChild(unmark);
        }
        para.addEventListener('dblclick',() =>{
            const input=document.createElement('input');
            input.classList.add("edit-input");

            input.id = para.id;
            input.value = para.textContent;

            para.replaceWith(input);
            input.focus();

            const id = Number(para.id);
            

            input.addEventListener('keydown',(e) =>{
                if(e.key === 'Enter'){
                    let index=task_arr.findIndex(item => item.id === id);
                    task_arr[index].text=input.value;

                    render();
                }
            });
        });
    }

    const delete_btn=document.querySelectorAll('.delete');          //inside the render function because it is not available at the beginnning
    delete_btn.forEach(del => {
        del.addEventListener('click',deleteTask);
    });


    const mark_done_btn=document.querySelectorAll('.mark_done');    //same for this mark complete btn
    mark_done_btn.forEach(mark => {
        mark.addEventListener('click',mask_done_task);
    });

    const unmark_btn=document.querySelectorAll('.unmarked');        //same for this unmark complete btn 
    unmark_btn.forEach( unmark => {
        unmark.addEventListener('click', () =>{
            const id=Number(unmark.id);

            let index=task_arr.findIndex(item => item.id === id);
            task_arr[index].completed=false;

            render();
        });
    });

    last_added=null;
}

