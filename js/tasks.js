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
    });

    document.querySelector(".close").addEventListener("click", function(){
        document.querySelector(".popup-background").style.display="none";
        document.querySelector(".popup-content").style.display="none";
    });

    var submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
        document.querySelector(".popup-background").style.display = "none";
        document.querySelector(".popup-content").style.display="none";
    });

     function addTask(){
       var ul = document.getElementById("tasks");

       var message = document.getElementById("task-description");
       var li = document.createElement("li");
       li.id = message.value;

       var checkbox = document.createElement("input")
       checkbox.type="checkbox";
       checkbox.name="checkbox";
       checkbox.onclick = checkNew;
       checkbox.classList = "task_checkbox"
       checkbox.id = message.value;
       li.appendChild(checkbox);

       var p = document.createElement("p");
       p.innerHTML = message.value;
       p.classList = "task_name";
       li.appendChild(p);

       var br1 = document.createElement("br");
       li.appendChild(br1);

       let firstDiv = document.createElement('div');
       let currentUser = (JSON.parse(localStorage.getItem("current-user")))["name"];
       let creator = document.createElement("p");
       creator.innerHTML = currentUser;
       creator.classList = "creator";
       firstDiv.appendChild(creator);
       firstDiv.classList = "username_div";
       li.appendChild(firstDiv);

       let secondDiv = document.createElement('div');
       let timeCreated = document.createElement("p");


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


       //timeCreated.innerHTML = "insert time this task was created";
       timeCreated.innerHTML = "Created at " + n;
       timeCreated.classList = "time";
      secondDiv.appendChild(timeCreated);
      secondDiv.classList = "time_div";
      li.appendChild(secondDiv);

       ul.appendChild(li);


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
        //removeFromTasks();
       // addToTheirToDoList(val, currentUser);

      let tasksChecked = [];

        $("input[name='checkbox']").each(function() {
            var $this = $(this);
            if($this.is(":checked")){
              console.log($this[0].id)
              tasksChecked.push($this[0].id);

              $this.parent().remove()
            }
        });

        console.log("tasksChecked: " + tasksChecked);
        for(i in tasksChecked){
          console.log("task: " + JSON.parse(localStorage.getItem("createdTasks")));
          var task = (JSON.parse(localStorage.getItem("createdTasks"))).find(function(element) {


            console.log("element's: " + element["taskName"]);
            console.log("other one:" + tasksChecked[i]);
            return element["taskName"] === tasksChecked[i];
          });

          console.log(task);
          console.log("before: ");
          console.log(localStorage);
          let assignee = (JSON.parse(localStorage.getItem("cogs 120 house")))["members"].find(function(element){
            return element["name"] == val;
          })

          removeFromTasks(tasksChecked[i]);
          //console.log(JSON.stringify(assignee));
          addToTheirToDoList(assignee, task);

          console.log(localStorage)
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

        document.getElementById("defaultOpen").click();
      }
