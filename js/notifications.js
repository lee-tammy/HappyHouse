var complexData = [
  {   'index': 1,
      'nameOfUser' : 'Janselle',
      'notificationText': 'needs an item! Check your Tasks Tab.',
      'timeStamp' : '2 Days Ago'
  },
  {   'index': 2,
      'nameOfUser' : 'Allison',
      'notificationText': 'took on a task! Check your Tasks Tab',
      'timeStamp' : '1 Day Ago'
  },
  {   'index': 3,
      'nameOfUser' : 'Allison',
      'notificationText': 'completed a Task! Check your Tasks Tab.',
      'timeStamp' : '1 Hours Ago'
  },
  {   'index': 4,
      'nameOfUser' : 'Tammy',
      'notificationText': 'needs an item! Check your Tasks list.',
      'timeStamp' : '20 Minutes Ago'
  },
]

//compile the template
var source = $("#entry-notifications").html();
var template = Handlebars.compile(source);

var parentDiv = $("#list-of-notifications");

//copied from the slides

for (var i = (complexData.length - 1); i >= 0; i--) {
  var curData = complexData[i];
  var curHtml = template(curData);
  parentDiv.append(curHtml);
}
