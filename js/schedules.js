
/* tab functionality */
function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;

}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();





/* pop up box to add new bill*/
// Get the popup + button that opens the popup + span to close it
var popup = document.getElementById("billPopup");
var btn = document.getElementById("writeBill");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the popup
btn.onclick = function() {
    popup.style.display = "block";
}

// When the user clicks on <span> (x), close the popup
span.onclick = function() {
    popup.style.display = "none";
}






var nameArray = ['Dec WIFI', 'Dec RENT'];
var costArray = ['50.00', '2300.00'];
var dueArray = ['2018-12-15', '2018-12-17'];

/* check if local storage already exists for bill names and costs */
if(localStorage.getItem('names')){}
else{localStorage.setItem('names', JSON.stringify(nameArray));}

if(localStorage.getItem('cost')){}
else{localStorage.setItem('cost', JSON.stringify(costArray));}

if(localStorage.getItem('due')){}
else{localStorage.setItem('due', JSON.stringify(dueArray));}





displayBill();

/* for displaying the bills when first enter screen */
function displayBill(){
  // get names string and convert to array
  var string = localStorage.getItem('names');
  nameArray = JSON.parse(string);

  var string2 = localStorage.getItem('cost');
  costArray = JSON.parse(string2);

  var string3 = localStorage.getItem('due');
  dueArray = JSON.parse(string3);

  // loop through names and add bills
  for (var i = 0; i < nameArray.length; i++){
    var li = document.createElement("li"); // create list element
    var ul = document.getElementById("billList"); // where put list
    var br = document.createElement("br"); // break in list
    var br2 = document.createElement("br"); // break in list
    var h = document.createElement("h2");


    var name = nameArray[i]; // the name of the bill
      h.append(name);
    var cost = costArray[i]; // cost of the bill
    var due = dueArray[i];


    li.append(h);
    li.append("Cost: $" + cost);
    li.append(br2);
    li.append("Due Date: " + due);
    ul.append(li);
  }
}





/* for adding a bill */
function addBill(){
  var name = document.getElementById("billID").value;
  var cost = document.getElementById("amountID").value;
  var due = document.getElementById("dueID").value;

  // get names string and convert to array
  var string = localStorage.getItem('names');
  var string2 = localStorage.getItem('cost');
  var string3 = localStorage.getItem('due');
  nameArray = JSON.parse(string);
  costArray = JSON.parse(string2);
  dueArray = JSON.parse(string3);

  // add name to array and put in localStorage
  nameArray.push(name);
  costArray.push(cost);
  dueArray.push(due);
  localStorage.setItem('names', JSON.stringify(nameArray));
  localStorage.setItem('cost', JSON.stringify(costArray));
  localStorage.setItem('due', JSON.stringify(dueArray));

  // adding the bill to the physical list
  var li = document.createElement("li");
  var ul = document.getElementById("billList");
  var br = document.createElement("br");
  var br2 = document.createElement("br");
  var h = document.createElement("h2");


  h.append(name);
  li.append(h);
  li.append("Cost: $" + cost);
  li.append(br2);
  li.append("Due Date: " + due);
  ul.append(li);

  popup.style.display = "none";
}
