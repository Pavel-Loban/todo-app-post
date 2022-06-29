 var inputData = document.querySelector('#inputTask');
 var btnAddTask = document.querySelector('#btn-add');
 var ulList = document.querySelector('#list');
 var spans = document.getElementsByTagName('span');
//  var newli = document.querySelectorAll('#list li');
 var allLi = document.getElementsByTagName('li');

 var notDone = document.querySelector('#notDone');
 var done = document.querySelector('#done');
 var userInfo = document.querySelector('#userInfo');

 //<li>Task1 <span>Delete</span></li>
 //
 function createTask(){
    var inputValue = inputData.value;
    inputData.value = '';

    var allLi = document.createElement('li');
    allLi.innerText = inputValue;

    var newSpan = document.createElement('span');
    newSpan.innerText = ' DELETE';

    var newDate = document.createElement('i');
    var date = new Date();

    newDate.innerText = ' - ' + date.getFullYear() + '.' + (date.getMonth() + 1) + '.'+ date.getDate();

    //Проверка,чтобы пустое поле ввода нельзя было добавить как задачу
    if(inputValue.trim() !== ''){
        allLi.append(newSpan);
        allLi.append(newDate);// добавляем дату добавления задачи
        ulList.append(allLi);


        removeTask();
        getActiveList();
    }
 }

 //btnAddTask.onclick = createTask;

 function removeTask(){
     for(let spanItem of spans){
         spanItem.onclick = function(){
            spanItem.parentElement.remove();
         };
     }
 }

 removeTask();

 const getTodos = () => {
    fetch('https://todo-app02022.herokuapp.com/api/post?id=1').then(
        res => res.json()
    ).then(
        data =>{
            // console.log(data)
            ulList.innerHTML = '';
            data.forEach((item) => {
                ulList.innerHTML += `
                <li>${item.content} <span>Delete</span></li>
                `
            })
        }
    )
 };

 getTodos();

 const postTodo = () => {
    var inputValue = inputData.value;

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body : JSON.stringify(
            {
                "title": "test",
                "content": inputValue,
                "user_id": 1
            }
        )
    };
    fetch('https://todo-app02022.herokuapp.com/api/post', options).then(
        res => res.json()
    ).then(
        data => console.log(data)
    );
 };

 btnAddTask.addEventListener('click',postTodo);
 btnAddTask.addEventListener('click',createTask);

 //Счетчик задач, зачеркивание выполненных задач
 function getActiveList(){
    notDone.value = document.getElementsByTagName('li').length - done.value;
    done.value = document.getElementsByClassName('text-decor').length;
    for(let li of allLi){
        li.onclick = function(){
            if(li.classList.contains('text-decor')){
                li.classList.remove('text-decor');
                done.value = document.getElementsByClassName('text-decor').length;
             } else{
                li.classList.add('text-decor');
            }

            done.value = document.getElementsByClassName('text-decor').length;
            notDone.value = allLi.length - done.value;
        };
    }
 }
 getActiveList();

//Сделать активным input
 var lil = spans[0].previousSibling;
 function active(){
    inputData.focus();
 }


 //Кнопка

var div3 = document.getElementsByClassName('container')[3];
 function getButton(){
     var div = document.createElement('div');
     var newbtn = document.createElement('button');

     div.classList.add('container');
     newbtn.classList.add('btn','btn-primary','mt-3');
     newbtn.setAttribute('id','userInfo');
     newbtn.innerText = 'Информация о себе';

     div.append(newbtn);
     div3.after(div);
 }

 getButton();

// Редактирование Модального окна
 var btnUserInfo = document.querySelector('#userInfo');
 var modal = document.querySelector('#exampleModal');
 var infoTitle = document.querySelector('.modal-title');
 var btnCloseModal = document.querySelector('.btn-secondary');
 var modalText = document.querySelector('.modal-body p');

 btnUserInfo.addEventListener('click', function(){
    modal.classList.add('modal_open');
    infoTitle.innerText = 'ФИО разработчика';
    modalText.innerText = 'Лобан Павел Юльянович';
    btnCloseModal.addEventListener('click', function(){
    modal.classList.remove('modal_open');
    });
 });


