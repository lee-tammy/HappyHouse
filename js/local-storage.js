var localStorage = window.localStorage;

var groupMembers = {
    "members":["lee-tammy", "janju129", "agpatacsi"],
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

function addToStorage(key, value){
    
    if(localStorage.getItem(key) != null){
        var data =[];
        data.push(localStorage.getItem(key));
        data[data.length] = JSON.stringify(value);
        localStorage.setItem(key, data);
        
    }else{
        var data = [];
        data[0] = JSON.stringify(value);
        localStorage.setItem(key, data);
    }
}

function getFromStorage(key){
    return localStorage.getItem(key);
}

function printStorage(key){
    console.log(localStorage.getItem(key));
}