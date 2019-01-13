# Trivia Game

### Programmer: Paul Meehan
### Date: 1/13/2019

This application is a trivia game where the user is presented with a series of random general-knowledge questions, each with a list of 4 possible answers.  They have 30 seconds to select their answer before running out of time.  

At the end of the game, the user is given their score in the form of total number of correct answers, wrong answers, as well as the number of questions that timed out.

**User Instructions**

Start the game by clicking on "Start the game!" button on the startup screen.  You will then be given the first question.

Choose your answer by clicking on the button with your choice.  You have 20 seconds to make a guess, otherwise the question times out.  Note that the timer turns red when you have less than 10 seconds left.

After each question you will be told whether you were correct, incorrect, or timed out.  In any case, you will be given the correct answer.  The next question will be given in 5 seconds without user input.

You will be given a total of 5 questions, after which the game ends and you will be given the total number of questions guessed right, wrong or timed out.

You can then restart the game by clicking the "Start Over" button.


**Technical Information**

The questions are stored in the JavaScript file in an array of objects.  Each object contains the question, an array of possible answers, the index of the correct answer, and the name of the image file to be displayed.  

The total number of questions can be increased by adding objects to this array.  The program adapts to the number of questions in the array automatically.  No additional program chances will be needed.  

All questions will be included in each game, but they are displayed in a random order each game.  Each question will only be presented only once per game.

Randomization is achieved by using the questionNumbers array which is initialized with the numbers from 0 to one less than the total number of questions.  Picking a new question consists of randomly selecting a number from 0 to the number of elements in the questionNumbers array and then using the value at that index for the question number.  That value is then removed from the array.  This ensures each question is only asked once per game.


