var badgeNum = document.getElementById("badge");

function initialBadge() {
  localStorage.setItem("badgeNumber", "0");
}

var numTrack = JSON.parse(localStorage.getItem("badgeNumber"));
refreshBadge();

function refreshBadge() {
  if (numTrack != 0){
    showNum = numTrack.toString();
    badgeNum.innerHTML = showNum;
  }
  else {
    badgeNum.style.display = "none";
  }
}

function bumpBadge() {
  numTrack++;
  localStorage.setItem("badgeNumber", JSON.stringify(numTrack));
  refreshBadge();
  if (numTrack == 1) {
    window.location.reload(false);
  }
}

function specialBump() {
  var value = document.getElementById("assignUser");
  var radios = value.elements["user"]

  for(var i = 0, len = radios.length; i < len; i++){
    if (radios[i].checked) {
      value = radios[i].value;
      break;
    }
  }

  var currentUser = (JSON.parse(localStorage.getItem("current-user")))['name'];

  if (currentUser === value) {
    bumpBadge();
  }
}

function clearBadge() {
  numTrack = 0;
  localStorage.setItem("badgeNumber", JSON.stringify(numTrack));
  refreshBadge();
}
