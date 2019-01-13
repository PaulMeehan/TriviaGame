
var trivia = [
// This object contains the following fields:
//    question = the question being asked
//    answers = an array of 4 possible answers, includes the correct answer
//    correctAnswer = the index of the array element that is the correct answer
//    image = the name of the image file to be displayed along with this question.
{
    question: "Which soft drink was originally called Brad's Drink?",
    answers: ["Coca-Cola", "Mountain Dew", "Pepsi", "Dr Pepper"],
    correctAnswer: 2,
    image: "pepsi.jpg"
},
{   question: "What is the longest line of constant latitude of the Earth?",
    answers: ["Prime Meridian", "Tropic of Cancer", "Equator", "Arctic Circle"],
    correctAnswer: 2,
    image: "globe.jpg"
},
{   question: "Croissant is a type of pastry.  In French, what does the word 'croissant' mean?",
    answers: ["Cramp", "Crust", "Crimson", "Crescent"],
    correctAnswer: 3,
    image: "croissant.jpg"
},
{   question: "In the US, what is a president who never served in Congress known as?",
    answers: ["Washington outsider", "Jefferson outcast", "Arthur nomad", "Lame duck"],
    correctAnswer: 0,
    image: "washington.jpg"
},
{   question: "Which famous American university is part of Colonial Williamsburg?",
    answers: ["Williams","William and Mary", "Kings College", "Columbia"],
    correctAnswer: 1,
    image: "wande.jpg"
}
];

// declare variables
var currentQuestionNumber = 0;  // index of current question
var time = 0;                   // number of seconds left to answer current questions
var intervalID;                 // interval id
var wins = 0;                   // number of questions answered correctly
var losses = 0;                 // number of questions answered incorrectly
var timeOuts = 0;               // number of questions where time ran out
var questionNumbers = [];       // array of trivia index numbers to select from

function endOfGame () {
    $("#queston").text("");
    $("#graphics").empty();
    $("#result").text("Game Over!");
    $("#graphics").append("<p>Number of wins: &nbsp; " + wins + "</p>");
    $("#graphics").append("<p>Number of losses: &nbsp;" + losses + "</p>");
    $("#graphics").append("<p>Number of timeouts: &nbsp;" + timeOuts + "</p>");
    $("#restart").show();
};

function checkForLastQuestion () {
    if (questionNumbers.length === 0) {
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
    $("#graphics").append("<p>Correct answer: " + trivia[currentQuestionNumber].answers[trivia[currentQuestionNumber].correctAnswer] + "</p>");
    $("#graphics").append("<img src='assets/images/" + trivia[currentQuestionNumber].image + "' height :250px; width: 200px>");

    //pause for 5 seconds and then display next question
    intervalID = setTimeout(checkForLastQuestion, 5000);
    
};

function decrement () {
    //reduce the time variable by 1
    time = time - 1;
    if (time < 10) {
        $("#timer").css("color", "red");
    };
    $("#timer").text(time);

    //determine whether time is up
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
    if (answer === trivia[currentQuestionNumber].correctAnswer) {
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
        newButton.text(trivia[currentQuestionNumber].answers[i]);
        newButton.attr("button-value", i);
        newButton.attr("onClick", "checkAnswer(" + i + ")");
        newButton.attr("class","answerButton");
        newButton.css("width","400px");
        $("#graphics").append(newButton);
    };
};

function showQuestion () {
    //initiate the timer
    time = 20;
    $("#timer").css("color", "white");

    // randomly select next question number
    var randomNum = Math.floor(Math.random() * questionNumbers.length);
    currentQuestionNumber = questionNumbers[randomNum];
    // remove that value from the question numbers array
    questionNumbers.splice(randomNum, 1);

    $("#startup").hide();
    $("#timerSection").show();
    $("#timer").text(time);
    $("#question").show();
    $("#question").text(trivia[currentQuestionNumber].question);
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
    // fill question numbers array with an index number for each element of trivia object
    questionNumbers = [];
    for (i=0; i < trivia.length; i++) {
        questionNumbers.push(i);
    }

    //reset the counters    
    time = 0;
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