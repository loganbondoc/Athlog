# Athlog
Athlog, is a web application designed to generate workout programs and track performance by logging an individual’s repetitions, workout dates and rest times.

### The key user needs of the application are to:
- To provide a streamlined way for users to review their past workout performance
- To create a web application accessible for athletes of all technological proficiencies and ages
- To generate workout programs that accommodate for users with varying goals and physiological proficiencies




## Running this application
The program is run on a basic node server utilising the express framework, sass for styling and parcel for hot reloading.

### To locally host the application, run ```npm run dev``` in the terminal

The application is responsively designed, and will change its appearance when the screen is **less than 700px**

### If express is not installed
- Install it by running ```npm install express``` in the terminal
### If parcel is not installed
- Install it by running ```npm install --save-dev parcel``` in the terminal
### If sass is not installed
- Install it by running ```npm install sass``` in the terminal




## The development process of Athlog
### Through developing Athlog, I was able to significantly build:
- My confidence in object oriented programming, as despite having a small amount of experience in it through other languages, gaining the experience of using objects and being able to store them in local storage was particularly useful.
- My proficiency in using SCSS. This assessment task was my first project utilising a SCSS file structure to style my website, in which I found it significantly easier and tidier in comparison to cramming all of my code into a single CSS file. Furthermore, the ability to assign certain stylings to variables was particularly useful, as I found myself applying it to colours to generate a palette, which I could then refer to throughout the entire file.

### However, through the development process I came across various challenges:
- When developing the New Session Form, I spent an *unnecessarily* large amount of time attempting to find a way to dynamically assign variables to objects using template literal strings, as a means to retrieve specific objects later. However, the tutor recommended against this method and instead advised the use of a loop that would search for certain objects based on their attributes. Through this, I utilised the **id** attribute of the sessions objects to later retrieve them in the past sessions page.
- Within the original plans for the tracking page, I originally wanted to include plus and minus buttons on the number input, that would allow users to either input a number using the buttons or through typing. This however was unable to be implemented, as the arrows that are included within a number input by default are unable to be styled to that extent and the idea had to be scrapped.




## Future implementations
### Within the next iteration of Athlog, there are various changes I would like to make:
- I would like to properly implement the mobile design of the past sessions page that I had planned in the mockups, as due to time restrictions, I was unable to properly implement the table as a pop-up when clicking on a specific session cell.
- Removing the muscle images on the home page and replacing it with graphs that are generated based on a users progress in specific exercises.
- The implementation of rest recording into the application could easily be added and would further enhance the graphs displayed on the home page.