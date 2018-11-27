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
  var currentUser = (JSON.parse(localStorage.getItem("current-user")))['name'];
  if (currentUser === "Tammy Lee"){
      bumpBadge();
  }

  if (currentUser === "Janselle Justo"){
      bumpBadge();
  }

  if (currentUser === "Allison Patacsil"){
      bumpBadge();
  }
}

function clearBadge() {
  numTrack = 0;
  localStorage.setItem("badgeNumber", JSON.stringify(numTrack));
  refreshBadge();
}
