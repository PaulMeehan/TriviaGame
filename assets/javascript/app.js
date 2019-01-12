
var trivia = [
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
    intervalID = setTimeout(showQuestion, 5000);
    
    questionNumber = questionNumber + 1;
    if (questionNumber >= trivia.length) {
        endOfGame();
    };


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

function startGame () {
    console.log("startGame");
    //show or hide the appropriate parts of the window
    $("#startup").show();
    $("#timerSection").hide();
    $("#question").hide();
    $("#result").hide();
    $("#graphics").hide();
    $("#restart").hide();
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


$(document).ready(function () {

startGame();

});