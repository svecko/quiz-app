const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  scoreElement.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    let scoreMessage;
    let finalScore = (score / shuffledQuestions.length) * 100;

    if (finalScore > 76) {
      scoreEmoji = '🔥';
      scoreMessage = '🔥 maš to💪!';
    } else if (finalScore > 50) {
      scoreMessage = '😏 ni slabo!';
    } else {
      scoreMessage = '💩 bolš k mta🙃!';
    }

    startButton.innerText = 'Začni znova';
    startButton.classList.remove('hide');
    questionContainerElement.classList.add('hide');
    scoreElement.innerText = `Tvoj rezultat: ${score} od ${shuffledQuestions.length} ${scoreMessage}`;
    scoreElement.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'two zero two four:',
    answers: [
      { text: '0024', correct: true },
      { text: '2044', correct: true },
      { text: '2024', correct: true },
      { text: '0044', correct: true }
    ]
  },
  {
    question: 'Marko, kako dela muca?',
    answers: [
      { text: 'Mijaw', correct: true },
      { text: 'Wof Wof', correct: false },
      { text: '✋', correct: false },
      { text: '🐎', correct: false }
    ]
  },
  {
    question: 'Fifi grize?',
    answers: [
      { text: 'Dobro', correct: false },
      { text: 'Ne grize', correct: true },
      { text: 'Oprosceno', correct: false },
      { text: 'Fifi je 🐈', correct: false }
    ]
  }
];
