var date= new Date();
var key;
var months= [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

var renderCalendar = ()=>{


date.setDate(1);

var monthDays = document.querySelector(".days");
var lastDay= new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
var prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();
var firstDayIndex = date.getDay();
var lastDayIndex = new Date(date.getFullYear(),date.getMonth()+1,0).getDay();
var nextDays = 7-lastDayIndex-1;




document.querySelector(".date h1").innerHTML=
months[date.getMonth()];

document.querySelector(".date p").innerHTML= new Date().toDateString();

let days = "";

for(let i= firstDayIndex;i>0;i--){
    let x=months[(date.getMonth()+11)%12];
   x+=(prevLastDay-i+1).toString();
   x+="," +date.getFullYear().toString();
   let getLocalStorage = localStorage.getItem(x);//transforming json string into a js object
    if(getLocalStorage== null){
        listArr =[];
    }else{
        listArr= JSON.parse(getLocalStorage);// transforming json string into a js object
    }
   if(listArr.length>0){
    days+=`<div class="prev-date active" id='${x}'>${prevLastDay-i+1}</div>`;
   }else{
    days+=`<div class="prev-date" id='${x}'>${prevLastDay-i+1}</div>`;
   }
     
}

for(let i=1;i<=lastDay;i++){
    let x=months[date.getMonth()];
   x+=(i).toString();
   x+=","+date.getFullYear().toString();
   let getLocalStorage = localStorage.getItem(x);//transforming json string into a js object
   if(getLocalStorage== null){
       listArr =[];
   }else{
       listArr= JSON.parse(getLocalStorage);// transforming json string into a js object
   }   
   if(listArr.length>0){
    if(i=== new Date().getDate() && date.getMonth()=== new Date().getMonth()){
        days+=`<div class="today active" id=${x} >${i}</div>`;
    }
    else days+=`<div class="date active" id=${x}>${i}</div>`;
   }else{
    if(i=== new Date().getDate() && date.getMonth()=== new Date().getMonth()){
        days+=`<div class="today" id=${x} >${i}</div>`;
    }
    else days+=`<div  id=${x}>${i}</div>`;
}
    

}

for(let i=1;i<=nextDays;i++){
   let x=months[(date.getMonth()+1)%12];
   x+=(i).toString();
   x+=","+date.getFullYear().toString();
   let getLocalStorage = localStorage.getItem(x);//transforming json string into a js object
   if(getLocalStorage== null){
       listArr =[];
   }else{
       listArr= JSON.parse(getLocalStorage);// transforming json string into a js object
   }   
   if(listArr.length>0){
    days+=`<div class="next-date active" id=${x}>${i}</div>`;
   }else{
    days+=`<div class="next-date" id=${x}>${i}</div>`;
   }
    
}

monthDays.innerHTML=days;

document.querySelector(".prev").onclick =()=>{
    
date.setMonth((date.getMonth()-1)%12);

renderCalendar();
}

document.querySelector(".next").onclick =()=>{
    
    date.setMonth((date.getMonth()+1)%12);
    renderCalendar();
    }

    
}


renderCalendar();

document.querySelector(".days").onclick=(e)=>{
var todo= document.querySelector(".wrapper-1");

    if(todo.style.display==="none"){
    todo.style.display="block";

    }
    else todo.style.display="none";
      key=e.target.id;

     console.log(key);
   showTasks(key);
}


    
            



//  to-do list

var inputBox= document.querySelector(".input-field input");

var addBtn = document.querySelector(".input-field button");
var todoList =document.querySelector(".todo-list");
var deleteAllBtn =document.querySelector("footer button");
inputBox.onkeyup =()=>{
    let userData = inputBox.value;
    if(userData.trim()!=0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }

}



addBtn.onclick = ()=>{
 
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem(key);
    if(getLocalStorage== null){
        listArr =[];
    }else{
        listArr= JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem(key, JSON.stringify(listArr));
    showTasks(key); 
    addBtn.classList.remove("active");
}

//function to add task list inside ul



function showTasks(key){
    
    let getLocalStorage = localStorage.getItem(key);//transforming json string into a js object
    if(getLocalStorage== null){
        listArr =[];
    }else{
        listArr= JSON.parse(getLocalStorage);// transforming json string into a js object
    }
    var dateBox= document.querySelector(".list-date");
    dateBox.innerHTML= key;
    //document.insertBefore("datebox","inputBox");
    var pending= document.querySelector(".pendingTaskNumber");
    pending.textContent= listArr.length;
    var taskday=document.getElementById(key);
    if(listArr.length >0){
        deleteAllBtn.classList.add("active");
        
        taskday.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
        taskday.classList.remove("active");
    }
    let newLiTag ="";
    
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML= newLiTag;
    inputBox.value= "";
}


//delete task function

function deleteTask(index){
    let getLocalStorage = localStorage.getItem(key);
    listArr= JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(listArr));
    showTasks(key);
}


deleteAllBtn.onclick= ()=>{
    listArr = [];
    localStorage.setItem(key,JSON.stringify(listArr));
    showTasks(key);
}



// digital clock //

setInterval(()=>{
    var time= document.querySelector("#time");
    var date = new Date();
    var hours =date.getHours();
    var minutes= date.getMinutes();
    var seconds= date.getSeconds();
   let day_night ="AM";
    if(hours>12){
        hours = hours - 12;
        day_night="PM";
    }
    if(hours<10){
        hours= "0"+ hours;
    }
    if(minutes<10){
        minutes= "0"+ minutes;
    }
    if(seconds<10){
        seconds= "0"+ seconds;
    }
    time.textContent= hours+ ":" + minutes + ":" +seconds+" " + day_night;
});
 


