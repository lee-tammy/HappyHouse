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

       var checkbox = document.createElement("input")
       checkbox.type="checkbox";
       checkbox.name="checkbox";
       checkbox.onclick = checkNew;
       checkbox.style.cssText = "transform:scale(1.5); margin:10px;";
       li.appendChild(checkbox);

       var h3 = document.createElement("h3");
        h3.style.cssText = "display:inline-block;"
       h3.innerHTML = message.value;       
       li.appendChild(h3);

       var br1 = document.createElement("br");
       li.appendChild(br1);

       li.appendChild(document.createTextNode("made by YOU"));
       
       var br2 = document.createElement("br");
       li.appendChild(br2);

       li.appendChild(document.createTextNode("insert time this task was created"));
      
       var br3 = document.createElement("br");
       li.appendChild(br3);

       ul.appendChild(li);

        
        // Putting task into local storage
        var info = {
            "taskName": message.value, "userName": "This user", "timeCreated": "now" 
           };
        
        addToStorage("created-tasks", info);

        newTaskHome()
     }

    /* To go to the home screen for new task tab */
    function newTaskHome(){
      document.getElementById("initial").style.display = "block";
      document.getElementById("pendingApproval").style.display = "none";
      document.getElementById("assigning").style.display = "none";
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

        $("input[name='checkbox']").each(function() {
            var $this = $(this);
            if ($this.is(":checked")) {
                $(this).parent().remove()
            }
        });

        document.getElementById("assignButton").style.display = "none";
      
    }

    /* To assign a task */
    function toAssign(){
      document.getElementById("initial").style.display = "none";
      document.getElementById("assigning").style.display = "block";
      document.getElementById("atbutton").style.display = "none";
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
    /* for the checkbox in in-progress tab*/
    function checkFunctionIP(){
      var checkbox = document.getElementById("myCheckIP");
      var text = document.getElementById("textIP");
      if (checkbox.checked == true){
        text.style.display = "block";
      }
      else{
        text.style.display = "none";
      }

      var checkbox = document.getElementById("myCheckIP2");
      var text = document.getElementById("textIP2");
      if (checkbox.checked == true){
        text.style.display = "block";
      }
      else{
        text.style.display = "none";
      }

      var checkbox = document.getElementById("myCheckIP3");
      var text = document.getElementById("textIP3");
      if (checkbox.checked == true){
        text.style.display = "block";
      }
      else{
        text.style.display = "none";
      }

      var checkbox = document.getElementById("myCheckIP4");
      var text = document.getElementById("textIP4");
      if (checkbox.checked == true){
        text.style.display = "block";
      }
      else{
        text.style.display = "none";
      }

    }

    /* to show the home screen of the in-progress tab */
    function inProgressHome(){
      document.getElementById("myCheckIP").checked = false;
      document.getElementById("initialIP").style.display = "block";
      document.getElementById("initialIP2").style.display = "block";
      document.getElementById("initialIP3").style.display = "block";
      document.getElementById("initialIP4").style.display = "block";
      document.getElementById("messageThread").style.display = "none";
      document.getElementById("instIP1").style.display = "block";
      document.getElementById("instIP2").style.display = "none";
    }

    /* to add a message */
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

    /* to send a message */
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

        document.getElementById("defaultOpen").click();
      }