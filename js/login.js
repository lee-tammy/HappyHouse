function goToHomePage(){
    var username = document.getElementById("usernameTextbox").value;
    if(getFromStorage(username) != null){
        document.location.href = "index.html";
        localStorage.setItem("current-user", getFromStorage(username));
    }

}