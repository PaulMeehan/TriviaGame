
var trivia = {
    question: "Which soft drink was originally called Brad's Drink",
    answers: ["Coca-Cola", "Mountain Dew", "Pepsi", "Dr Pepper"],
    correctAnswer: 2
};


function startGame () {
    console.log("startGame");
    $("#startup").show();
    $("#timerSection").hide();
    $("#questionResult").hide();
    $("#graphics").hide();
    $("#restart").hide();
};

function listQuestions () {
    // first, empty the contents of the graphics section
    $("#graphics").empty();
    // now, create a new unordered list
    // var qlist = $("<ul>");
    for (var i = 0; i <= 3; i++) {
        // qlist.append("<li>" + trivia.answers[i] + "</li>");
        var newButton = $("<button>");
        newButton.text(trivia.answers[i]);
        newButton.attr("button-value", i);
        newButton.attr("onClick", "alert('you chose:" + i + "')");
        newButton.attr("class","answerButton");
        $("#graphics").append(newButton);
    };
    // qlist.append("</ul>");
};

function showQuestion () {
    console.log("showQuestion");
    $("#startup").hide();
    $("#timerSection").show();
    $("#timer").text("30");
    $("#questionResult").show();
    $("#questionResult").text(trivia.question);
    $("#graphics").show();
    listQuestions();
    $("#restart").hide();

};


$(document).ready(function () {

startGame();

});