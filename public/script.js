// variables for forms
const sessionForm = document.getElementById("session-form");
const trackerPage = document.getElementById("tracker");
const newSessionPage = document.getElementById("new-session");

var sessions = [];
var numSessions = 0;
localStorage.setItem('sessionInProgress', 'false');

// classes
class Session {
    constructor(id, name, category, intensity, competency, date){
        this.id = id;
        this.name = name;
        this.category = category;
        this.intensity = intensity;
        this.competency = competency;
        this.date = date;
        
        //auto generated attributes
        let exercises = [];
    }

    addExercise(exercise){
      ;
    }
}

class Exercise {
    constructor(name){
        this.name = name;
        reps = [];
        rests = [];
    }

    addReps(reps){
      ;
    }

    addRest(rest){
      ;
    }
}

// navbar code adapted from: https://www.w3schools.com/howto/howto_js_tabs.asp
function openPage(evt, pageName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";

    if (pageName != "new-session"){
      trackerPage.style.display = "none";
    } else {
      changeSessionPage();
    }
  }

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
trackerPage.style.display = "none";

// function to switch to from new session form to tracker
sessionForm.addEventListener("submit", generateSession);
sessionForm.addEventListener("submit", changeSessionPage);


function generateSession() {
  // get all attributes from the form
  // generate a unique id
  // create a new session, with the id as its name
  // add it to an array of all sessions

  event.preventDefault();
  var name = document.getElementById("name").value;
  
  // getting category
  let categoryOptions = document.getElementsByName("category");
  for (let option of categoryOptions){
    if (option.checked == true){
      var category = option.value;
    }
  }

  // getting intensity
  let intensityOptions = document.getElementsByName("intensity");
  for (let option of intensityOptions){
    if (option.checked == true){
      var intensity = option.value;
    }
  }

  // getting competency
  let competencyOptions = document.getElementsByName("competency");
  for (let option of competencyOptions){
    if (option.checked == true){
      var competency = option.value;
    }
  }

  sessionId = numSessions + "-" + name + "-" + category;
  date = new Date();

  let currentSession = new Session(sessionId, name, category, intensity, competency, date);
  sessions.push(currentSession);
  numSessions += 1;
  localStorage.setItem('sessionInProgress', 'true');
  console.log(sessions[0]);
}

function changeSessionPage(){
  if (localStorage.getItem('sessionInProgress') === 'false') {
    trackerPage.style.display = "none";
    newSessionPage.style.display = "block";
  } else if (localStorage.getItem('sessionInProgress') === 'true') {
    trackerPage.style.display = "block";
    newSessionPage.style.display = "none";
  } else {
    console.log("help");
  }
}

// window.addEventListener("DOMContentLoaded", function () {
//   var isNewSessionHidden = localStorage.getItem("isNewSessionHidden");
//   if (isNewSessionHidden === "true") {
//     newSessionPage.style.display = "none";
//   }
// });

// function toggleNewSessionPage() {
//   newSessionPage.style.display =
//     newSessionPage.style.display === "none" ? "block" : "none";

//   // Store the state of the "new-session" section
//   localStorage.setItem(
//     "isNewSessionHidden",
//     newSessionPage.style.display === "none"
//   );
// }

// var newSessionButton = document.querySelector(".tablinks:nth-child(2)");
// newSessionButton.addEventListener("click", toggleNewSessionPage);
