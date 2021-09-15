
var highScoreEl = document.getElementById("#high-scores");
var startBtn = document.getElementById("#start")
var timerEl = document.getElementById("#time")
var  alts = document.querySelectorAll(".posAns");


var question = [ 
    {
    title: "What is NOT a data type in JavaScipt?",
    possibleAnswer: ['Number', 'string', 'font-size'],
    correctAnswer:2
    },
    {
    title: "What does DOM Stand for?",
    possibleAnswer: ['Document object model', 'domestic operation motor', 'dumb oriention moduale'],
    correctAnswer:0
    },
    {
    title: "What element is NOT part of javascript?",
    possibleAnswer:['array', 'id', 'random'],
    correctAnswer:1
    }
];

function showQuestion() {
   // for (i = 0; i < question.length; i++){
   //     question[i]
    //}
var title = document.getElementById('question-title');
title.textContent = question.title;
document.getElementById("#question-title");
console.log(alts);

alts.forEach(function(element, index) {
    element.textContent = question.possibleAnswer[index];

    element.addEventListener('click', function() {
        if (question.correctAnswer == index) {
           console.log("a")

        } else {
            console.log("wrong")
        }
    })
});
}
showQuestion()
