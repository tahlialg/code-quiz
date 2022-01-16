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
    question: "What is my name?",
    choice1: "Tahlia",
    choice2: "Tinsae",
    choice3: "Kulei",
    choice4: "Ivy",
    answer: 1,
  },
  {
    question: "What is my surname?",
    choice1: "Teshome",
    choice2: "La Galia",
    choice3: "Barto",
    choice4: "Prempeh",
    answer: 2,
  },
  {
    question: "What is my name?",
    choice1: "Tahlia",
    choice2: "Tinsae",
    choice3: "Kulei",
    choice4: "Ivy",
    answer: 1,
  },
  {
    question: "What is my name?",
    choice1: "Tahlia",
    choice2: "Tinsae",
    choice3: "Kulei",
    choice4: "Ivy",
    answer: 1,
  },
  {
    question: "What is my name?",
    choice1: "Tahlia",
    choice2: "Tinsae",
    choice3: "Kulei",
    choice4: "Ivy",
    answer: 1,
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

const startingTime = 2;
let time = startingTime * 60;

updateCountdown = () => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  countdown.innerHTML = `${minutes}: ${seconds}`;
  time--;
}
  
setInterval(updateCountdown, 1000);

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //return window.location.href("end.html");
  return location.href = "end.html";
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
