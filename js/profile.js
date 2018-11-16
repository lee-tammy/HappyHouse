let currentUser = JSON.parse(localStorage.getItem("current-user"));

// FOR CURRENT USER HTML
var profile = document.getElementById("profile");

var profile_box = document.createElement("DIV");
profile_box.classList.add("profile_box");
profile.appendChild(profile_box);

let picture = document.createElement("IMG");
picture.src = "images/" + currentUser["user-name"] + "-profile-picture.jpg";
picture.classList.add("to_add");
profile_box.appendChild(picture);
//picture.style.border = "2px solid black";

let name = document.createElement("P");
name.id = "name";
name.innerHTML = currentUser["name"];
profile_box.appendChild(name);


let emailDiv = document.createElement("div");

let emailPicture = document.createElement("IMG");
emailPicture.src = "images/email.png";
emailPicture.classList = "emailPicture";
emailDiv.appendChild(emailPicture);

let email = document.createElement("p");
email.id = "email";
email.innerHTML = currentUser["email"];
email.classList = "email";
emailDiv.appendChild(email);
profile_box.appendChild(emailDiv);


let phoneDiv = document.createElement("div");

let phonePicture = document.createElement("IMG");
phonePicture.src = "images/phone.png";
phonePicture.classList = "phonePicture";
phoneDiv.appendChild(phonePicture);

let phoneNumber = document.createElement("p");
phoneNumber.id = "phoneNumber";
phoneNumber.innerHTML = currentUser["phone-number"];
phoneNumber.classList = "phoneNumber";
phoneDiv.appendChild(phoneNumber);
profile_box.appendChild(phoneDiv);

// FOR GROUP HTML
let group = currentUser["group"];
var groupFromLocalStorage = JSON.parse(localStorage.getItem(group));

var groupHTML = document.getElementById("group");

let groupName = document.createElement("h1");
groupName.innerHTML = group;
groupName.classList = "groupName";
groupHTML.appendChild(groupName);

let groupInfoDiv = document.createElement("div");
let groupAddressPicture = document.createElement("img");
groupAddressPicture.src = "images/house.png";
groupAddressPicture.classList = "groupAddressPicture";
groupInfoDiv.appendChild(groupAddressPicture);

let groupAddress = document.createElement("p");
groupAddress.innerHTML = groupFromLocalStorage["address"];
groupAddress.classList = "groupAddress";
groupInfoDiv.appendChild(groupAddress);

groupHTML.appendChild(groupInfoDiv);


let members = groupFromLocalStorage["members"];

var counter = 0;

for(i in members){
    if(members[i] != currentUser["user-name"]){
        var groupDiv = document.createElement("div");
        groupDiv.style.display = "flex";
        groupDiv.classList.add("group_div");

        if (counter == 0){
            groupDiv.style.marginLeft = "25%";
        }
        counter++;
        let groupMemberInfo = JSON.parse(localStorage.getItem(members[i]["userName"]));

        let groupMemberPicture = document.createElement("IMG");
        groupMemberPicture.classList.add("group_member_picture");
 
        groupMemberPicture.src = "images/" + members[i]["userName"] + "-profile-picture.jpg";

        let groupMemberInfoHTML = document.createElement("div");
        groupMemberInfoHTML.style.marginLeft = "10px";
        
        let groupMemberName = groupMemberInfo["name"];
        let groupMemberNameHTML = document.createElement("P");
        groupMemberNameHTML.innerHTML = groupMemberName;
        groupMemberNameHTML.style.textAlign = "center";
        groupMemberInfoHTML.appendChild(groupMemberNameHTML);
        
        let groupMemberEmail = groupMemberInfo["email"];
        let groupMemberEmailHTML = document.createElement("p");
        groupMemberEmailHTML.innerHTML = groupMemberEmail;
        groupMemberEmail.classList = "groupMemberEmail";
        groupMemberInfoHTML.appendChild(groupMemberEmailHTML);

        let groupMemberPhoneNumber = groupMemberInfo["phone-number"];
        let groupMemberPhoneNumberHTML = document.createElement("p");
        groupMemberPhoneNumberHTML.innerHTML = groupMemberPhoneNumber;
        groupMemberPhoneNumber.classList = "groupMemberPhoneNumber";
        groupMemberInfoHTML.appendChild(groupMemberPhoneNumberHTML);

        groupDiv.appendChild(groupMemberPicture);
        groupDiv.appendChild(groupMemberInfoHTML);


        groupHTML.appendChild(groupDiv);
    }
}