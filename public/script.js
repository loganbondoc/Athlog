// variables for forms
const sessionForm = document.getElementById("session-form");
const trackerPage = document.getElementById("tracker");
const newSessionPage = document.getElementById("new-session");

const repTable = document.getElementById("rep-table");
const repCounter = document.getElementById("rep-counter");

const sessionContainer = document.getElementById("past-session-container");
const pastTable = document.getElementById("past-table");



var sessions = [];
localStorage.setItem('numSessions', '0');
localStorage.setItem('sessionInProgress', 'false');
localStorage.setItem('timerRunning', 'false');
localStorage.setItem('currentExerciseIndex', '0');
localStorage.setItem('sessions', '');
localStorage.setItem('numReps', '0');

var pullArms = ["Bicep Curls", "Hammer Curls", "Lateral Rows", "Lateral Pull-Downs", "Pull Ups", "Rear Delt Fly"];
var pushArms = ["Bench Press", "Tricep Dips", "Tricep Pushdowns", "Chest Fly", "Lateral Raises", "Shoulder Press"];
var pushLegs = ["Squats", "Leg Press", "Seated Leg Extensions", "Bulgarian Split Squats", "Hack Squat", "Glute Kickbacks"];
var pullLegs = ["Romanian Dead Lifts", "Seated Leg Curls", "Nordic Curls", "Hip Thrusts", "Calf Raises", "Conventional Deadlift"];

// classes
class Exercise {
  constructor(name){
      this.name = name;
      this.reps = [];
      // this.rests = [];
  }
}

class Session {
    constructor(id, name, category, intensity, competency, date){
        this.id = id;
        this.name = name;
        this.category = category;
        this.intensity = intensity;
        this.competency = competency;
        this.date = date;
        
        //auto generated attributes
        this.exercises = [];

        switch(this.category){
          case "Push-Arms":
            var categoryNames = pushArms;
            break;
          case "Pull-Arms":
            var categoryNames = pullArms;
            break;
          case "Push-Legs":
            var categoryNames = pushLegs;
            break;
          case "Pull-Legs":
            var categoryNames = pullLegs;
            break;
        }
        
        // creating exericise objects and adding them to exercises array
        for (let i = 0; i < categoryNames.length; i++){
          let currentExercise = new Exercise(categoryNames[i]);
          this.exercises.push(currentExercise);
        }

        switch(this.competency){
          case "Beginner":
            this.sets = 2;
            break;
          case "Intermediate":
            this.sets = 3;
            break;
          case "Advanced":
            this.sets = 4;
            break;
        }
      
        switch(this.intensity){
          case "Light":
            this.restMinutes = 4;
            break;
          case "Moderate":
            this.restMinutes = 3;
            break;
          case "Intense":
            this.restMinutes = 2;
            break;
        }
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

// By default tracker is hidden
trackerPage.style.display = "none";

// function to switch to from new session form to tracker
sessionForm.addEventListener("submit", generateSession);
sessionForm.addEventListener("submit", changeSessionPage);


function generateSession(event) {
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

  var sessionId = localStorage.getItem('numSessions') + "-" + name + "-" + category;
  var date = new Date();

  let currentSession = new Session(sessionId, name, category, intensity, competency, date);
  sessions.push(currentSession);
  newNumSessions = parseInt(localStorage.getItem('numSessions'));
  newNumSessions += 1;
  localStorage.setItem('numSessions', newNumSessions);
  localStorage.setItem('sessionInProgress', 'true');
  console.log(sessions[0]);

  // generate rep table
  for(let i = 0; i < 6; i++){
    
    // creating headers for exercise names
    var row = document.createElement("tr");
    var header = document.createElement("th");
    header.innerHTML = currentSession.exercises[i].name;
    row.appendChild(header);
    
    // creating cells for exercises
    for (let j = 0; j < currentSession.sets; j++){
      var cell = document.createElement("td");
      cell.classList.add('rep-cell');
      row.appendChild(cell);
    }

    repTable.appendChild(row);
  }

  // setting default timer
  document.getElementById("timer-time").innerHTML = "0" + currentSession.restMinutes + ":00";
}

// Hides tracker page based on is a session is in progress or not
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

repCounter.addEventListener("submit", recordReps);
repCounter.addEventListener("submit", checkSession);
repCounter.addEventListener("submit", startRest);

// check if session is finished
function checkSession(){
  // check if exercises is more than 6
  // check if each exercise has the amount of sets in it
  // if it is changeSessionPage and add to Sessions

  let currentSession = sessions[sessions.length - 1];
  if (
    parseInt(localStorage.getItem('currentExerciseIndex')) >= 5 &&
    parseInt(localStorage.getItem('numReps')) >= (currentSession.sets * 6)){
      console.log("ok im finished");
      // stringify and add session to local storage
      localStorage.setItem('sessions', JSON.stringify(sessions));

      // reset things to defaults
      localStorage.setItem('sessionInProgress', 'false');
      localStorage.setItem('currentExerciseIndex', '0');
      localStorage.setItem('numReps', '0');

      // remove table contents
      while (repTable.hasChildNodes()){
        repTable.removeChild(repTable.firstChild);
      }

      // changing back to new session page
      changeSessionPage();

  } else {
    console.log("heheh not finished yet");
  }
}

function recordReps(event){
  // add it to the exercise object
  // if exercise object is full, make a new one
  // if all exercises are done change session page back

  event.preventDefault();

  let repAmount = document.getElementById("reps").value;
  let currentSession = sessions[sessions.length - 1];

  if (currentSession.exercises[parseInt(localStorage.getItem('currentExerciseIndex'))].reps.length >= currentSession.sets){
    let newIndex = parseInt(localStorage.getItem('currentExerciseIndex'));
    newIndex += 1;
    localStorage.setItem('currentExerciseIndex', newIndex.toString());
    console.log("moving on!");
  }

  // add to table display
  var cellArray = document.getElementsByClassName('rep-cell');
  let cell = cellArray[parseInt(localStorage.getItem('numReps'))];
  cell.innerHTML = repAmount;

  let currentExerciseIndex = currentSession.exercises[parseInt(localStorage.getItem('currentExerciseIndex'))];
  currentExerciseIndex.reps.push(repAmount);

  let newNumReps = parseInt(localStorage.getItem('numReps'));
  newNumReps += 1;
  localStorage.setItem('numReps', newNumReps.toString());

  console.log(currentSession.exercises);
}

// start rest timer countdown
function startRest(event){
  event.preventDefault();

  localStorage.setItem('timerRunning', 'true');

  // turn submit button into stop timer button
  var startButton = document.getElementById("rest-start");
  startButton.style.display = "none";
  var stopButton = document.createElement("button");
  stopButton.innerHTML = "Stop";
  repCounter.appendChild(stopButton);
  stopButton.addEventListener('click', function(){
    stopButton.remove();
    startButton.style.display = "block";
    clearInterval(x);
  });

  // Following code adapted from https://www.w3schools.com/howto/howto_js_countdown.asp
  // Set the date we're counting down to
  let currentSession = sessions[sessions.length - 1];
  var startTime = new Date();
  var targettedTime = startTime.setMinutes(startTime.getMinutes() + currentSession.restMinutes);

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = targettedTime - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds.length == 1){
      seconds = "0" + seconds;
    }

    // Display the result in the element with id="timer-time"
    document.getElementById("timer-time").innerHTML = "0" + minutes + ":" + seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
      stopButton.remove();
      startButton.style.display = "block";
      clearInterval(x);
    }
  }, 1000);
  }

const pastSessionsNav = document.getElementById("past-sessions-nav");
pastSessionsNav.addEventListener("click", generatePastSessions);

function generatePastSessions(){
  
  // if opened before, clear it
  while (sessionContainer.hasChildNodes()){
    sessionContainer.removeChild(sessionContainer.firstChild);
  }
  
  // generate all past sessions
  sessionsArray = JSON.parse(localStorage.getItem('sessions'));
  
  for (let i = 0; i < sessionsArray.length; i++){
    // creating text nodes for displayed text
    let nameNode = document.createTextNode(sessionsArray[i].name);
    let categoryNode = document.createTextNode(sessionsArray[i].category);
    let hyphenNode = document.createTextNode(" - ");
    
    // formatting date node
    let sessionDate = sessionsArray[i].date;
    console.log(sessionDate);
    let dateFormat = sessionDate.slice(0, 10) + " - " + sessionDate.slice(11, 19);
    let dateNode = document.createTextNode(dateFormat);
    
    // appending text nodes
    let name = document.createElement('h3').appendChild(nameNode);
    let date = document.createElement('h3').appendChild(dateNode);
    let hyphen = document.createElement('h3').appendChild(hyphenNode);
    let category = document.createElement('h2').appendChild(categoryNode);

    // creating div to hold name and date text for styling
    let nameDateContainer = document.createElement('div');
    nameDateContainer.appendChild(name);
    nameDateContainer.appendChild(hyphen);
    nameDateContainer.appendChild(date);
    nameDateContainer.classList.add('name-date-container');

    // creating div to hold category
    let categoryContainer = document.createElement('div');
    categoryContainer.appendChild(category);
    categoryContainer.classList.add('category-container');

    // creating div to hold everything
    let sessionCell = document.createElement('div');
    sessionCell.setAttribute('id', sessionsArray[i].id);
    sessionCell.appendChild(nameDateContainer);
    sessionCell.appendChild(categoryContainer);
    sessionCell.classList.add('session-cell');

    // add event listeners to each to generate table
    sessionCell.addEventListener("click", function(){
      // clear table if there is any previous content filled
      while (pastTable.hasChildNodes()){
        pastTable.removeChild(pastTable.firstChild);
      }

      // look for session with id that matches clicked div
      for(let j = 0; j < sessions.length; j++){
        if(this.id == sessions[j].id){
          console.log("found matching!");
          var selectedSession = sessions[j];
        }
      }

      // displaying session in table format
      for(let k = 0; k < selectedSession.exercises.length; k++){
        
        // creating headers for exercise names
        var row = document.createElement("tr");
        var header = document.createElement("th");
        header.innerHTML = selectedSession.exercises[k].name;
        row.appendChild(header);
        
        // creating cells for exercises
        for (let l = 0; l < selectedSession.sets; l++){
          var cell = document.createElement("td");
          cell.classList.add('rep-cell');
          cell.innerHTML= selectedSession.exercises[k].reps[l];
          row.appendChild(cell);
        }
    
        pastTable.appendChild(row);
      }
    });

    // append cell to container
    sessionContainer.appendChild(sessionCell);
  }
}