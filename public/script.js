// classes
class Session {
    constructor(name, category, intensity, level){
        this.name = name;
        this.category = category;
        this.intensity = intensity;
        this.level = level;
        
        //auto generated attributes
        exercises = [];
        //date
        //id
    }
}

class Exercise {
    constructor(name, reps){
        this.name = name;
        this.reps = reps;
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