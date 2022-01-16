const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const countdown = document.querySelector("#countdown");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is JavaScript?",
    choice1:
      "A standardised system for tagging text files to achieve font, colour, graphic, and hyperlink effects on webpages.",
    choice2:
      "a stylesheet language used to describe the presentation of a document written in HTML.",
    choice3:
      "An object-oriented language commonly used to create interactive effects within web browsers.",
    choice4: "The script belong to a person called Java.",
    answer: 3,
  },
  {
    question: "What file extension do JavaScript files have?",
    choice1: ".java",
    choice2: ".j",
    choice3: ".javascript",
    choice4: ".js",
    answer: 4,
  },
  {
    question: "What HTMl element do we put JavaScript code in?",
    choice1: "<script>",
    choice2: "<head>",
    choice3: "<js>",
    choice4: "<body>",
    answer: 1,
  },
  {
    question: "How do you create a function in JavaScript?",
    choice1: "function myFunction()",
    choice2: "function = myFunction()",
    choice3: "function:myFunction()",
    choice4: "function {myFunction()}",
    answer: 2,
  },
  {
    question: "How would you call a function in JavaScript?",
    choice1: "call function myFunction()",
    choice2: "call = myFunction()",
    choice3: "myFunction()",
    choice4: "function myFunction()",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const startingTime = 1.5;
let time = startingTime * 60;

updateCountdown = () => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 1 ? "0" + seconds : seconds;

  countdown.innerHTML = `${minutes}: ${seconds}`;
  time--;

  if (time === 0) {
    clearInterval(updateCountdown);
    alert("Times up! Restart quiz!");

    return (location.href = "index.html");
  }
};

setInterval(updateCountdown, 1000);

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return (location.href = "end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else if (classToApply === "incorrect") {
      time -= 15;
      alert("Ouch! There goes 15 seconds!");
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
