
var trivia = [
// This object contains the following fields:
// question = the question being asked
// answers = an array of 4 possible answers, includes the correct answer
// correctAnswer = the index of the array element that is the correct answer
// image = the name of the image file to be displayed along with this question.
{
    question: "Which soft drink was originally called Brad's Drink?",
    answers: ["Coca-Cola", "Mountain Dew", "Pepsi", "Dr Pepper"],
    correctAnswer: 2,
    image: "pepsi.jpg"
},
{   question: "Who is the most wonderful wife in the world?",
    answers: ["Beverly Goldberg", "My Sweetheart!", "Mary Poppins", "June Cleaver"],
    correctAnswer: 1,
    image: "cheryl.jpg"
}
];

// declare variables
var questionNumber = 0;
var time = 0;
var intervalID;
var wins = 0;
var losses = 0;
var timeOuts = 0;


function endOfGame () {
    $("#graphics").empty();
    $("#result").text("Game Over!");
    $("#graphics").append("<p>Number of wins: " + wins + "</p>");
    $("#graphics").append("<p>Number of losses: " + losses + "</p>");
    $("#graphics").append("<p>Number of time outs: " + timeOuts + "</p>");
    $("#restart").show();
};

function checkForLastQuestion () {
    questionNumber = questionNumber + 1;
    if (questionNumber >= trivia.length) {
        endOfGame();
    } else {
        showQuestion();
    };
};

function endOfQuestion (result) {
    //stop the timer
    clearTimeout(intervalID);
    //display message according to the result
    switch (result) {
        case "NoTime":
            $("#result").text("Time's Up!");
            timeOuts = timeOuts +1;
            break;
        case "correct":
            $("#result").text("Correct!");
            wins = wins + 1;
            break;
        case "wrong":
            $("#result").text("Wrong!");
            losses = losses + 1;
    }
    // first, empty the contents of the graphics section
    $("#graphics").empty();
    $("#graphics").append("<p>The correct answer was: " + trivia[questionNumber].answers[trivia[questionNumber].correctAnswer] + "</p>");
    $("#graphics").append("<img src='assets/images/" + trivia[questionNumber].image + "' height :250px; width: 200px>");

    //pause for 5 seconds and then display next question
    intervalID = setTimeout(checkForLastQuestion, 5000);
    
};

function decrement () {
    //reduce the time variable by 1
    time = time - 1;
    //determine whether time is up
    $("#timer").text(time);
    if (time < 1) {
        endOfQuestion("NoTime");
    } 
};


function checkAnswer (answer) {
    //first stop the timer
    clearTimeout(intervalID);
    //clear out any existing elements
    $("#graphics").empty();
    //determine whether answer was correct and display results
    if (answer === trivia[questionNumber].correctAnswer) {
        endOfQuestion("correct");
    } else {
        endOfQuestion("wrong");
    };
};

function listQuestions () {
    // first, empty the contents of the graphics section
    $("#graphics").empty();
    // now, create a button for each possible answer.
    for (var i = 0; i <= 3; i++) {
        var newButton = $("<button>");
        newButton.text(trivia[questionNumber].answers[i]);
        newButton.attr("button-value", i);
        newButton.attr("onClick", "checkAnswer(" + i + ")");
        newButton.attr("class","answerButton");
        newButton.css("width","400px");
        $("#graphics").append(newButton);
    };
};

function showQuestion () {
    //initiate the timer
    time = 30;

    $("#startup").hide();
    $("#timerSection").show();
    $("#timer").text(time);
    $("#question").show();
    $("#question").text(trivia[questionNumber].question);
    $("#result").show();
    $("#result").text("");
    $("#graphics").show();
    listQuestions();
    $("#restart").hide();
    //start the timer
    intervalID = setInterval(decrement, 1000);
};


function startGame() {
    console.log("startGame");
    //reinitialize counters    
    questionNumber = 0;
    time = 0;
    intervalID;
    wins = 0;
    losses = 0;
    timeOuts = 0;

    //show or hide the appropriate parts of the window
    $("#startup").show();
    $("#timerSection").hide();
    $("#question").hide();
    $("#result").hide();
    $("#graphics").hide();
    $("#restart").hide();
};

// Start the game!

startGame();