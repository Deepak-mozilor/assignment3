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

function render(){
    const container=document.querySelector('.task-container');
    container.textContent='';
    for(let items of task_arr){
        const task=document.createElement('div');
        const para = document.createElement('p');
        const del=document.createElement('button');
        const mark=document.createElement('button');

        del.setAttribute('class','delete');
        mark.setAttribute('class','mark_done');
        para.style.display = "inline-block";

        del.textContent='Delete';
        mark.textContent='Mark as Done';
        para.textContent=items.text;

        task.appendChild(para);
        task.appendChild(del);
        task.appendChild(mark);
        container.appendChild(task);
    }
}