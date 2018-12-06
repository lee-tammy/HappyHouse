refreshPage();

function refreshPage(){
  $( ".notification-group" ).remove();

  //compile the template
  var source = $("#entry-notifications").html();
  var template = Handlebars.compile(source);

  var parentDiv = $("#list-of-notifications");

  //copied from the slides

  var user = (JSON.parse(localStorage.getItem("current-user")))['user-name'];
  var newComplexData = JSON.parse(localStorage.getItem(user + "-notifications"));
  if (newComplexData != null) {
    for (var i = (newComplexData.length - 1); i >= 0; i--) {
      var curData = newComplexData[i];
      var curHtml = template(curData);
      parentDiv.append(curHtml);
    }
  }
}

function deleteNotification(button){
  var parent = button.parentNode;
  var grandFather = parent.parentNode;
  grandFather.removeChild(parent);

  var children = parent.childNodes;
  var taskName = children[3].innerHTML;
  var type = children[5].innerHTML;

  var currentUser = (JSON.parse(localStorage.getItem("current-user")))["user-name"];
  var notifications = JSON.parse(localStorage.getItem(currentUser + "-notifications"));
  var filtered = notifications.filter(function(value){
    if(value["taskName"] != taskName || value["type"] != type){
      return value;
    }
  })

  localStorage.setItem(currentUser + "-notifications", JSON.stringify(filtered));
  refreshPage();
}
