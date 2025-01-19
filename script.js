const questions = [
    {
        question: "What is the capital of India?",
        answers: ["Delhi", "Chennai", "Kolkata", "Mumbai"],
        correct: 0
    },
    {
        question: "Which programming language is mainly used for creating web apps?",
        answers: ["Python", "JavaScript", "C++", "Java"],
        correct: 1
    },
    {
        question: "What is 2 + 15?",
        answers: ["13", "27", "20", "17"],
        correct: 3
    },
    {
        question: "Who is the author of Harry Potter novels?",
        answers: ["William Shakespeare", "Jane Austen", "J.K.Rowling", "Emily Bronte"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart');
const scoreElement = document.getElementById('score');

function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    answersContainer.innerHTML = '';
    current.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
    quizContainer.classList.add('active');
    resultContainer.classList.remove('active');
}

function selectAnswer(index) {
    const current = questions[currentQuestion];
    const buttons = answersContainer.querySelectorAll('button');
    buttons.forEach((button, i) => {
        if (i === current.correct) {
            button.classList.add('correct');
        } else if (i === index) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });
    if (index === current.correct) {
        score++;
    }
    submitButton.disabled = false;
}

submitButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
    submitButton.disabled = true;
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
});

function showResult() {
    quizContainer.classList.remove('active');
    resultContainer.classList.add('active');
    scoreElement.textContent = `${score} / ${questions.length}`;
    if (score === questions.length) {
        resultContainer.innerHTML += `<p>Congratulations! You scored awesome </p>`;
    }
}

//initialize quiz
loadQuestion();