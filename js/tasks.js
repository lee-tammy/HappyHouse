newTaskHome();

// FOR THE TASKS
document.getElementById("openingTab").click();

    /*
     * FUNCTIONS IN THE NEW TAB
     */
     function writeTask(){
       document.getElementById("initial").style.display = "none";
       document.getElementById("atbutton").style.display = "none";

     }

    var popup = document.getElementById("addNewTaskButton");
    popup.addEventListener("click", function(){
        document.querySelector(".popup-background").style.display="flex";
        document.querySelector(".popup-content").style.display="table";
        $(".task_checkbox").css('visibility', 'hidden');
    });

    document.querySelector(".close").addEventListener("click", function(){
        document.querySelector(".popup-background").style.display="none";
        document.querySelector(".popup-content").style.display="none";
        $(".task_checkbox").css('visibility', 'visible');
    });

    var submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
        document.querySelector(".popup-background").style.display = "none";
        document.querySelector(".popup-content").style.display="none";
        $(".task_checkbox").css('visibility', 'visible');
    });

    function addTask(){
      var message = document.getElementById("task-description");
      let currentUserName = (JSON.parse(localStorage.getItem("current-user")))["user-name"];
      // Putting task into local storage
      var info = {taskName: message.value, userName: currentUserName, timeCreated: "now"};

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


       let currentUserName = (JSON.parse(localStorage.getItem("current-user")))["user-name"];
        // Putting task into local storage
        /*var info =
            {taskName: message.value, userName: currentUserName, timeCreated: "now"};
        */
        var info =
            {taskName: message.value, userName: currentUserName, timeCreated: n};

        addToStorage("createdTasks", info);

        newTaskHome()
     }

    /* To go to the home screen for new task tab */
    function newTaskHome(){
      document.getElementById("initial").style.display = "block";
      document.getElementById("pendingApproval").style.display = "none";
      document.getElementById("assigning").style.display = "none";

      document.getElementById("addNewTaskButton").style.display = "block";

      $( ".entry" ).remove();

      var source = $("#creating-tasks").html();
      var template = Handlebars.compile(source);
      var parentDiv = $("#tasks");

      var items = JSON.parse(localStorage.getItem("createdTasks"));
      if(items != null){
        for(var i = 0; i < items.length; i++){
          let creatorName = (JSON.parse(localStorage.getItem(items[i]["userName"])))["name"];
          var task = {
            taskName: items[i]["taskName"],
            creator: creatorName,
            timeCreated: items[i]["timeCreated"],
          }
          var curHTML = template(task);
          parentDiv.append(curHTML);
        }
      }
    }

    function inProgressRefresh(){
      $( ".in-progress-entry" ).remove();

      var source = $("#in-progress-tasks").html();
      var template = Handlebars.compile(source);
      var parentDiv = $("#inProgressTasks");

      var items = JSON.parse(localStorage.getItem("inProgressTasks"));

      if(items != null){
        for(var i = 0; i < items.length; i++){

          var task = {
            taskName: items[i]["taskName"],
            assignee: items[i]["assignedTo"],
            timeCreated: items[i]["timeCreated"],
          }

          var curHTML = template(task);
          parentDiv.append(curHTML);
        }
      }
    }

    function completeRefresh(){
      
      $( ".complete-entry" ).remove();

      var source = $("#completed-tasks").html();
      console.log(source);
      var template = Handlebars.compile(source);
      var parentDiv = $("#completedTasks");

      var items = JSON.parse(localStorage.getItem("completedTasks"));
      console.log(items);
      if(items != null){
        for(var i = 0; i < items.length; i++){

          var task = {
            taskName: items[i]["taskName"],
            assignee: items[i]["assignedTo"],
            timeCreated: items[i]["timeCreated"],
          }

          var curHTML = template(task);
          parentDiv.append(curHTML);
        }
      }
    }

    /* To show the message about pending approval */
    function assignDone(){
      document.getElementById("pendingApproval").style.display = "block";
      document.getElementById("assigning").style.display = "none";
      var val;
      var f = document.getElementById("assignUser");
      var radios = f.elements["user"];
      for(var i = 0, len = radios.length; i < len; i++){
        if(radios[i].checked){
          val = radios[i].value;
          break;
        }
      }

        document.getElementById("userName").innerHTML = val;

      let tasksChecked = [];

        $("input[name='checkbox']").each(function() {
            var $this = $(this);
            if($this.is(":checked")){
              tasksChecked.push($this[0].id);

              $this.parent().remove()
            }
        });

        for(i in tasksChecked){
          var task = (JSON.parse(localStorage.getItem("createdTasks"))).find(function(element) {
            
            return element["taskName"] === tasksChecked[i];
          });

          let assignee = (JSON.parse(localStorage.getItem("cogs 120 house")))["members"].find(function(element){
            return element["name"] == val;
          })

          removeFromTasks(tasksChecked[i]);
          addToTheirToDoList(assignee, task);
          addToInProgressList(assignee, task);
        }

        document.getElementById("assignButton").style.display = "none";
    }

    function removeFromTasks(taskChecked){
      var taskList = JSON.parse(localStorage.getItem("createdTasks"));
      var filtered = taskList.filter(function(value){

        return value["taskName"] != taskChecked;

      });

      localStorage.setItem("createdTasks", JSON.stringify(filtered));
    }

    function addToTheirToDoList(assignee, task){
      var currentUser = JSON.parse(localStorage.getItem("current-user"));
      var taskValue = {
        assignedBy: currentUser,
        taskInfo: task
      }

      addToStorage(assignee["userName"] + "-toDoList", taskValue);
    }

    function addToInProgressList(assignee, task){
      var currentUser = JSON.parse(localStorage.getItem("current-user"));
      var taskValue = {
        assignedBy: currentUser["name"], 
        assignedTo: assignee["name"],
        taskName: task["taskName"],
        timeCreated:task["timeCreated"]
      }

      addToStorage("inProgressTasks", taskValue);
    }

    /* To assign a task */
    function toAssign(){
      document.getElementById("initial").style.display = "none";
      document.getElementById("assigning").style.display = "block";

      document.getElementById("addNewTaskButton").style.display = "none";
      document.getElementById("assignButton").style.display = "none";
    }

    /* for the checkbox in new tab*/
    function checkNew(){
        var atLeastOneIsChecked = $("input[name='checkbox']:checked").length > 0;

        var button = document.getElementById("assignButton");
      if(atLeastOneIsChecked){
        button.style.display = "block";
      }else{
        button.style.display = "none";
      }

    }

    /*
     * FUNCTIONS IN THE IN-PROGRESS TAB
     */

    /* to show the home screen of the in-progress tab */

    /* HOLD FOR NOW!!!!
    (to add a message)
    function viewChat(){
      document.getElementById("initialIP").style.display = "none";
      document.getElementById("initialIP2").style.display = "none";
      document.getElementById("initialIP3").style.display = "none";
      document.getElementById("initialIP4").style.display = "none";
      document.getElementById("textIP").style.display = "none";
      document.getElementById("messageThread").style.display = "block";
      document.getElementById("instIP1").style.display = "none";
      document.getElementById("instIP2").style.display = "block";
    }

    (send a message)
    function sendMessage(){
      var ul = document.getElementById("chat");
      var message = document.getElementById("message");
      var li = document.createElement("li");
      li.setAttribute('id',message.value);
      li.appendChild(document.createTextNode(message.value));
      var b = document.createElement("br");
      li.appendChild(b);
      li.appendChild(document.createTextNode("-User 1"));
      ul.appendChild(li);
    } */

    /* for the tabs*/
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

