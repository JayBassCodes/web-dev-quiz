// Questions
var questions = [
    {
        title: "Which is NOT a data type:",
        choices: ["strings", "booleans", "texture", "numbers"],
        answer: "texture"
    },
    {
        title: "Which symbol is used to enclose a JS function.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "curly brackets"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "What symbol is used to signify ending a line of code.",
        choices: ["comma", "curly brackets", "semicolon", "colon"],
        answer: "semicolon"
    },
    {
        title: "What would you use to execute a line of code over again until certain criteria is met:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "for loops"
    },

];

// Variables
var score = 0;
var questionsIndex = 0;
var content = document.querySelector("#content");
var time = document.querySelector("#time");
var timer = document.querySelector("#startTimer");


var timeLeft = 76;
var interval = 0;
var penalty = 5;
var createUl = document.createElement("ul");


timer.addEventListener("click", function() {
    if (interval === 0) {
        interval = setInterval(function() {
            timeLeft--;
            time.textContent = "Time:" + timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                time.textContent = "Out of Time"
            }
        }, 1000);
    }
    // Calls Function to display questions after starting timer
    display(questionsIndex);
});

// Function to display qustions
function display(questionsIndex) {
    content.innerHTML = "";
    createUl.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
    var prompt = questions[questionsIndex].title;
    var choice = questions[questionsIndex].choices;
    content.textContent = prompt;
    }

    choice.forEach(function(item) {
        var listItem = document.createElement("li");
        content.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.textContent = item;
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;
    console.log(element)
     if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
         if (element.textContent == questions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionsIndex].answer;
    } else {
        timeLeft = timeLeft - penalty;
        createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionsIndex].answer;
        }
    }
// goes to the next question
    questionsIndex++;

    // shows results when done
     if (questionsIndex >= questions.length) {
     allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
        // if not done it will display next question
    } else {
        display(questionsIndex);
    }
    content.appendChild(createDiv);
}

function allDone() {
    content.innerHTML = "";
    time.innerHTML = "";

     // Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    content.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    content.appendChild(createP);

     if (timeLeft >= 0) {
        // score display
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(interval);
        createP.textContent = "Your final score is: " + timeRemaining;

        content.appendChild(createP2);
    }
    // initials enter display
     var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    content.appendChild(createLabel);

    // input element for initials
     var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    content.appendChild(createInput);

    // submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    content.appendChild(createSubmit);

     createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highScores.html");
        }
    });

}

