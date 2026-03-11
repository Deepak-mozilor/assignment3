let task_arr=[];
let count=0;
const add=document.getElementById('add');

add.addEventListener('click', addTask);


function addTask(){
    let task_text = prompt("Please add your Task!");
    count++;
    task_arr.push({ id : count, text: task_text, completed : false});

    render();
}


function deleteTask(event){
    const id = Number(event.target.id);

    let index=task_arr.findIndex(item => item.id === id);
    task_arr.splice(index,1);
    render();
}

function mask_done_task(event){
    const id = Number(event.target.id);

    let index=task_arr.findIndex(item => item.id === id);
    task_arr[index].completed=true;

    render();
}

const clear=document.querySelector('#clear');

clear.addEventListener('click', () => {
    task_arr = task_arr.filter(task => task.completed === false);
    render();
});

function render(){
    const container=document.querySelector('.task');
    container.textContent='';

    const complete_container = document.querySelector('.complete');
    complete_container.textContent='';

    for(let items of task_arr){
        if(items.completed === false){
            const task=document.querySelector('.task');
            const para = document.createElement('p');
            const del=document.createElement('button');
            const mark=document.createElement('button');

            del.setAttribute('class','delete');
            del.setAttribute('id',items.id);
            mark.setAttribute('class','mark_done');
            mark.setAttribute('id',items.id);

            del.textContent='Delete';
            mark.textContent='Mark as Done';
            para.textContent=items.text;

            task.appendChild(para);
            task.appendChild(del);
            task.appendChild(mark);
        }
        else{
            const complete = document.querySelector('.complete');
            const para = document.createElement('p');
            const unmark = document.createElement('button');

            unmark.setAttribute('id',items.id);
            unmark.setAttribute('class','unmarked');

            unmark.textContent='unmark';
            para.textContent=items.text;

            complete.appendChild(para);
            complete.appendChild(unmark);
        }
        
    }
    const delete_btn=document.querySelectorAll('.delete');

    delete_btn.forEach(del => {
        del.addEventListener('click',deleteTask);
    });

    const mark_done_btn=document.querySelectorAll('.mark_done');

    mark_done_btn.forEach(mark => {
        mark.addEventListener('click',mask_done_task);
    });

    const unmark_btn=document.querySelectorAll('.unmarked');

    unmark_btn.forEach( unmark => {
        unmark.addEventListener('click', () =>{
            const id=Number(unmark.id);

            let index=task_arr.findIndex(item => item.id === id);
            task_arr[index].completed=false;

            render();
        });
    });
}