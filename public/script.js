// variables for forms
const sessionForm = document.getElementById("session-form");
const trackerPage = document.getElementById("tracker");
const newSessionPage = document.getElementById("new-session");

var sessions = [];
var numSessions = 0;
var sessionId;
var sessionInProgress = false;

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
        // exercises = [];
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
  let name = document.getElementById("name").value;
  // let category = document.getElementById("category");
  // let intensity = document.getElementById("intensity");
  // let competency = document.getElementById("competency");

  // sessionId = numSessions + "-" + name + "-" + category;
  // date = new Date();

  // let currentSession = new Session(sessionId, name, category, intensity, competency, date);
  // sessions.push(currentSession);
  // numSessions += 1;
  console.log(name);
  sessionInProgress = true;
  // console.log(sessions[0].name.value);
}

function changeSessionPage(){
  if (sessionInProgress == false) {
    trackerPage.style.display = "none";
    newSessionPage.style.display = "block";
  } else {
    trackerPage.style.display = "block";
    newSessionPage.style.display = "none";
  }
}

