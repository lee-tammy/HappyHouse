
reload();
/*TABS HEADER*/
function openPage(pageName, elmnt, color){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length; i++){
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for(i = 0; i < tablinks.length; i++){
      tablinks[i].style.backgroundColor="";
    }
    document.getElementById(pageName).style.display="block";
    elmnt.style.backgroundColor=color;
  }

let taskName;
function openCompletePopup(task){
  document.querySelector(".complete-task-popup-background").style.display="flex";
  document.querySelector(".complete-task-popup-content").style.display="table";
  taskName = task;
}

function removeFromList(){
  var currentUser = JSON.parse(localStorage.getItem("current-user"));
  var key = currentUser["user-name"] + "-toDoList";

  var todoListItems = JSON.parse(localStorage.getItem(key));
  var filtered = todoListItems.filter(function(value){
    return value["taskInfo"]["taskName"] != taskName; 
  });
  
  localStorage.setItem(key, JSON.stringify(filtered));

  var members = (JSON.parse(localStorage.getItem("cogs 120 house")))["members"];

  var info = {type: "completed by " + currentUser['name'], taskName: taskName, userName: currentUser['name'], timeCreated: calculateDate()};
  for(var i = 0; i < members.length; i++){
    var notif = members[i]["userName"] + "-notifications";
    addToStorage(notif, info);
  }

  removeFromInProgress();
  reload();
  returnToList();

}

function returnToList(){  
  document.querySelector(".complete-task-popup-background").style.display="none";
  document.querySelector(".complete-task-popup-background").style.display="none";
}

/*GETTING INFO CONTENT*/
function reload(){
  $( ".entry" ).remove();
  var currentUser = JSON.parse(localStorage.getItem("current-user"));
  var currentUserToDoList = currentUser["user-name"] + "-toDoList";

  var source = $("#inProgress").html();
  var template = Handlebars.compile(source);
  var parentDiv = $("#newEntry");

  var items = JSON.parse(localStorage.getItem(currentUserToDoList));
  for(var i = 0; i < items.length; i++){
    var task = {
      taskName: items[i]["taskInfo"]["taskName"],
      assignerName: items[i]["assignedBy"]["name"],
      assignerUserName: items[i]["assignedBy"]["userName"],
    }
    var curHTML = template(task);
    parentDiv.append(curHTML);
  }
}

function removeFromInProgress(){
  var inProgress = JSON.parse(localStorage.getItem("inProgressTasks"));
  let removing = null;
  var filtered = inProgress.filter(function(value){
    if(value["taskName"] == taskName){
      removing = JSON.stringify(value);
    }
    return value["taskName"] != taskName; 
  });
  taskName= null;
  
  addToCompleted(removing);
  localStorage.setItem("inProgressTasks", JSON.stringify(filtered));
}

function addToCompleted(removing){
  var info = {
    taskName: JSON.parse(removing)["taskName"],
    timeFinished: calculateDate(),
    assignee: JSON.parse(removing)["assignedTo"]
  }
  addToStorage("completedTasks", info);
}

function calculateDate(){
  var d = new Date();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var n = hour + ":" + minutes;
  if(hour > 12){
    hour = hour - 12;
    if(minutes < 10){
      n = hour + ":0" + minutes + " pm";
    }
    else{
      n = hour + ":" + minutes + " pm";
    }
  }
  else{
    if(minutes < 10){
      n = hour + ":0" + minutes + " am";
    }
    else{
      n = hour + ":" + minutes + " am";
    }     
  }
  return n;
 }
