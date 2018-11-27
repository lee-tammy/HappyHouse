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

    document.querySelector(".warning-close").addEventListener("click", function(){
      document.querySelector(".popup-warning").style.display="none";
      document.querySelector(".warning-content").style.display="none";
      $(".task_checkbox").css('visibility', 'visible');
    })

    var submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
        document.querySelector(".popup-background").style.display = "none";
        document.querySelector(".popup-content").style.display="none";
        $(".task_checkbox").css('visibility', 'visible');
    });

    function addTask(){

      var message = document.getElementById("task-description");

      if(message.value.length != 0){
        let currentUserName = (JSON.parse(localStorage.getItem("current-user")))["user-name"];

          var info =
              {taskName: message.value, userName: currentUserName, timeCreated: calculateDate()};

          addToStorage("createdTasks", info);

          var members = (JSON.parse(localStorage.getItem("cogs 120 house")))["members"];
          for(var i = 0; i < members.length; i++){
            var notif = members[i]["userName"] + "-notifications";
            info.type = "added to task list";
            addToStorage(notif, info);
          }
      }else{

        document.querySelector(".popup-warning").style.display="flex";
        document.querySelector(".warning-content").style.display="table";
        $(".task_checkbox").css('visibility', 'hidden');
      }

      newTaskHome();
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
      var template = Handlebars.compile(source);
      var parentDiv = $("#completedTasks");

      var items = JSON.parse(localStorage.getItem("completedTasks"));

      if(items != null){
        for(var i = 0; i < items.length; i++){

          var task = {
            taskName: items[i]["taskName"],
            assignee: items[i]["assignee"],
            timeFinished: items[i]["timeFinished"],
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
              tasksChecked.push($this.parent().children()[1].innerHTML);

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
          addToInProgressList(assignee, task);
          addToTheirToDoList(assignee, task);

          task.type = "assigned to you";
          addToStorage(assignee["userName"] + "-notifications", task);

        document.getElementById("assignButton").style.display = "none";
      }
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
