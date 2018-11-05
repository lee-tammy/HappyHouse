document.getElementById("openingTab").click();

    /*
     * FUNCTIONS IN THE NEW TAB
     */
     function writeTask(){
       document.getElementById("initial").style.display = "none";
       document.getElementById("makeTask").style.display = "block";
       document.getElementById("atbutton").style.display = "none";

     }

     function addTask(){
       var ul = document.getElementById("tasks");

       /*var c = document.createElement("input");
       c.type="checkbox";
       ul.appendChild(c);*/

       var message = document.getElementById("newTask");
       var li = document.createElement("li");
       li.setAttribute('id',message.value);
       li.appendChild(document.createTextNode(message.value));
       ul.appendChild(li);

       newTaskHome()
     }

    /* To go to the home screen for new task tab */
    function newTaskHome(){
      document.getElementById("initial").style.display = "block";
      document.getElementById("pendingApproval").style.display = "none";
      document.getElementById("assigning").style.display = "none";
      document.getElementById("makeTask").style.display = "none";
      document.getElementById("atbutton").style.display = "block";
      document.getElementById("checkNewTask").checked = false;
      document.getElementById("checkNewTask2").checked = false;
      document.getElementById("checkNewTask3").checked = false;
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

      if(document.getElementById("checkNewTask").checked==true){
        document.getElementById("tasks1").style.display = "none";
      }

      if(document.getElementById("checkNewTask2").checked==true){
        document.getElementById("tasks2").style.display = "none";
      }

      if(document.getElementById("checkNewTask3").checked==true){
        document.getElementById("tasks3").style.display = "none";
      }
    }

    /* To assign a task */
    function toAssign(){
      document.getElementById("assignButton").style.display = "none";
      document.getElementById("assignButton2").style.display = "none";
      document.getElementById("assignButton3").style.display = "none";
      document.getElementById("initial").style.display = "none";
      document.getElementById("assigning").style.display = "block";
      document.getElementById("atbutton").style.display = "none";
    }

    /* for the checkbox in new tab*/
    function checkNew(){
      var checkbox = document.getElementById("checkNewTask");
      var text = document.getElementById("assignButton");
      if (checkbox.checked == true){
        text.style.display = "block";
      }
      else{
        text.style.display = "none";
      }

      var checkbox = document.getElementById("checkNewTask2");
      var text = document.getElementById("assignButton2");
      if (checkbox.checked == true){
        text.style.display = "block";
      }
      else{
        text.style.display = "none";
      }

      var checkbox = document.getElementById("checkNewTask3");
      var text = document.getElementById("assignButton3");
      if (checkbox.checked == true){
        text.style.display = "block";
      }
      else{
        text.style.display = "none";
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