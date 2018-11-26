var localStorage = window.localStorage;
//localStorage.clear();
console.log(localStorage);
var groupMembers = {
    "members":[{name: "Tammy Lee", userName: "lee-tammy"}, 
                {name:"Janselle Justo", userName: "janju129"}, 
                {name:"Allison Patacsil", userName: "agpatacsi"}],
    "address": "9500 Gilman Dr., La Jolla, CA 92020"
}

localStorage.setItem("cogs 120 house", JSON.stringify(groupMembers));

// DIFFERENT USERS
var leeTammyInfo = {
    "name" : "Tammy Lee", 
    "user-name": "lee-tammy",
    "email": "tal066@ucsd.edu",
    "phone-number": "(415)231-1239",
    "group": "cogs 120 house"
}
localStorage.setItem("lee-tammy", JSON.stringify(leeTammyInfo));

var justoJanselleInfo = {
    "name": "Janselle Justo",
    "user-name": "janju129",
    "email": "jcjusto@ucsd.edu",
    "phone-number": "(608)298-2791",
    "group": "cogs 120 house"
}
localStorage.setItem("janju129", JSON.stringify(justoJanselleInfo));


var patacsilAllisonInfo = {
    "name": "Allison Patacsil",
    "user-name": "agpatacsi",
    "email": "apatacsi@ucsd.edu",
    "phone-number": "(639)452-4829",
    "group": "cogs 120 house"
}
localStorage.setItem("agpatacsi", JSON.stringify(patacsilAllisonInfo));

/*function addToStorage(key, value){
    console.log(localStorage);
    if(localStorage.getItem(key) != null){
        var newArr = JSON.parse('[]');
        
        var data = localStorage.getItem(key);

        //var data = ;
        console.log("HELLO" + data);

        console.log(data.length);
        for(var i = 0; i < data.length; i++){
            console.log("in loop" + (data[i]));
            newArr.push(JSON.stringify(data[i]));
            
            
        }
        
        newArr.push(JSON.stringify(value));


        console.log(newArr);
        localStorage.setItem(key, newArr);
        
      var data = localStorage.getItem("created-tasks");
       for(i in data){
            console.log(i["taskName"]);
        }

        console.log(localStorage);

        
    }else{
        var data = [];
        data.push(value)
        localStorage.setItem(key, JSON.stringify(data));
    }
}*/

function addToStorage(key, value){
    let tasks = JSON.parse(localStorage.getItem(key)) || [];
        // add to it,
    tasks.push(value);
        // then put it back.
    localStorage.setItem(key, JSON.stringify(tasks));
}

function getFromStorage(key){
    return localStorage.getItem(key);
}

function printStorage(key){
    console.log(localStorage.getItem(key));
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