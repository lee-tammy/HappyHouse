var localStorage = window.localStorage;

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