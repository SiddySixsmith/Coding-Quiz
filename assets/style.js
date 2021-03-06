
var countdownTimeText = document.querySelector(".timer-text");
var startButton = document.querySelector(".start-button");
var questionEl = document.getElementById("question");
var choiceA = document.getElementById("choice-a");
var choiceB = document.getElementById("choice-b");
var choiceC = document.getElementById("choice-c");
var choiceD = document.getElementById("choice-d");
var choiceContainers = document.querySelector(".choice-container");
var answerCard = document.getElementById("game");
var gameEl = document.querySelector(".container");
var scoreEl = document.getElementById("score");
var questionCounterEl = document.getElementById("question-counter");
var gameHud = document.querySelector(".game-info");
var endGameScore = document.querySelector(".exit-page");
var finalScoreEl = document.getElementById("final-score");
var saveScoreBtn = document.getElementById('save-score-btn');
const username = document.getElementById('username');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


var currentQuestion = {};
var availableQuestions = [];
var score = 0;
var questionCounter = 0;
var timer;
var timeLeft;
var question;
var possibleAnswers;
var finalScore;

var questions = [
    {
        question: "what is NOT a data type",
        answers: ["a. font-size", "b. Number", "c. string"],
        correctAnswer: 0
    },
    {     
        question: "what is the correct syntax to log something to our console?",
        answers: ["a. please print this", "b. console.log()", "c. consolelog[]"],
        correctAnswer: 1
    },
    {     
        question: "what is a booleen",
        answers: ["a. color codeing", "b. a set of elements", "c. true||false"],
        correctAnswer: 3
    },
    {
        question: "Complete this statement// Returns a random integer from 0 to 10// 'Math.floor(Math.() * 11)'", 
        answers: ["a. random", "b. hide", "c. split"],
        correctAnswer: 0
    },
];  
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 4;
const TIME_PENALTY = 2;
const DELAY = 750;
const MAX_HIGHSCORES = 3;

function init() {
}

function startGame() {
    answerCard.style = "display:inline";
    gameHud.style = "display:flex";
    timeLeft = 20;
    questionCounter = 0;
    score = 0; 
    availableQuestions = [...questions] 
    startTimer()
    loadQuestion();
    startButton.style = "display:none";
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft --;
        renderScores();
        if (timeLeft >=0 ) {
            if (questionCounter > questions.length  && timeLeft > 0) {
                clearInterval(timer);
                gameOver();
            }
        }
        if (timeLeft === 0) { 
            clearInterval(timer); 
            gameOver();     
        }
    }, 1000);
}


function renderScores() {
    scoreEl.textContent = score
    countdownTimeText.textContent = timeLeft;
}


function saveHighscore(event) {
    event.preventDefault(); 

    const scoreToStore = {
        score: finalScore,
        name: username.value
    };

    highScores.push(scoreToStore); 
    highScores.sort((a,b) => {
        return b.score - a.score;
    } )

    highScores.splice(3);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    clearHighscoreHud(); 
}


function clearHighscoreHud() { 
    username.style = "display:none"; 
    saveScoreBtn.style = "display:none";
    finalScoreEl.textContent = 'saved.';
}

username.addEventListener('keyup', function() { 
    saveScoreBtn.disabled = !username.value;
});

saveScoreBtn.addEventListener('click', saveHighscore);

function gameOver () {
    gameEl.style = "display:none"; 
    getFinalScore();
    gameHud.style = "display:none";
    endGameScore.style = "display:flex";
    finalScoreEl.textContent = finalScore; 
}

function getFinalScore () {
    var scoreAdd = score;
    finalScore = scoreAdd
}

function loadQuestion () {
    questionCounter++;
    questionCounterEl.textContent = questionCounter + '/4'; 

   if (questionCounter > questions.length && questionCounter >= MAX_QUESTIONS) { 
        return gameOver();
   }
    
    var i = Math.floor(Math.random() * availableQuestions.length); 
    currentQuestion = availableQuestions[i];
    questionEl.textContent = currentQuestion.question;

    choiceA.textContent = availableQuestions[i].answers[0]; 
    choiceB.textContent = availableQuestions[i].answers[1];
    choiceC.textContent = availableQuestions[i].answers[2];
    

    availableQuestions.splice(i, 1); 
};

answerCard.addEventListener('click', checkAnswer);

function checkAnswer(event) {
    const selectedChoice = event.target; 
    const selectedAnswer = selectedChoice.dataset["number"]; 
    
    if (!event.target.classList.contains('choice-text')) return 

    if ( String(selectedAnswer) === String(currentQuestion.correctAnswer)) { 
        correct();
        setBackgroundGreen(event.target);
    } else {
        incorrect();
        setBackgroundRed(event.target);
    }
    setTimeout(() => {
        loadQuestion();
    }, DELAY)
    renderScores();
}

function setBackgroundGreen(element) {
    element.classList.add('background-green'); 
    setTimeout(() => {
        element.classList.remove('background-green');
    }, DELAY)
}

function setBackgroundRed(element) {
    element.classList.add('background-red');
    setTimeout(() => {
        element.classList.remove('background-red');
    }, DELAY)
}

function correct() {
    score += CORRECT_BONUS; 
    scoreEl.classList.add('background-green'); 
    setTimeout(() => {
        scoreEl.classList.remove('background-green');
    }, DELAY)
}

function incorrect() {
    timeLeft -= TIME_PENALTY;
    countdownTimeText.classList.add('background-red');
    setTimeout(() => {
        countdownTimeText.classList.remove('background-red');
    }, DELAY)
}

startButton.addEventListener("click", startGame); 

init();