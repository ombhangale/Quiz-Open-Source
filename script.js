const QUESTIONS = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HighText Markdown Language", "HyperText Making Language"],
    answer: 1,
    
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2,
    
  },
  {
    question: "Which tag is used to create a paragraph in HTML?",
    options: ["<p>", "<para>", "<pg>", "<text>"],
    answer: 0,
    
  },
  {
    question: "Which HTML element is used to insert a line break?",
    options: ["<lb>", "<br>", "<break>", "<line>"],
    answer: 1,
   
  },
  {
    question: "Which tag creates an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: 1,
   
  },
  {
    question: "Which tag is used for list items?",
    options: ["<item>", "<li>", "<ul>", "<listitem>"],
    answer: 1,
   
  },
  {
    question: "Which attribute provides alternate text for an image?",
    options: ["title", "src", "alt", "name"],
    answer: 2,
   
  },
  {
    question: "Which HTML tag is used to add an image?",
    options: ["<pic>", "<img>", "<image>", "<src>"],
    answer: 2,
   
  },
  {
    question: "Where is the metadata and title of a web page usually placed?",
    options: ["<body>", "<footer>", "<head>", "<main>"],
    answer: 2,
    
  },
  {
    question: "Which tag defines a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    answer: 1,
   
  },
  {
    question: "Which attribute is required inside <a> to define the destination URL?",
    options: ["src", "url", "href", "link"],
    answer: 2,
   
  },
  {
    question: "Which tag is used for inserting a table row?",
    options: ["<td>", "<tr>", "<th>", "<row>"],
    answer: 1,
   
  },
  {
    question: "Which tag is used for table data cells?",
    options: ["<tr>", "<th>", "<td>", "<tabledata>"],
    answer: 2,
   
  },
  {
    question: "Which tag is used for table headers?",
    options: ["<thead>", "<th>", "<head>", "<tdh>"],
    answer: 1,
   
  },
  {
    question: "Which HTML5 tag is used for navigation links section?",
    options: ["<navigate>", "<nav>", "<menu>", "<links>"],
    answer: 1,
    difficulty: "Easy"
  },
  {
    question: "Which semantic tag represents independent self-contained content?",
    options: ["<section>", "<article>", "<aside>", "<content>"],
    answer: 1,
   
  },
  {
    question: "Which semantic tag is typically used for footer information?",
    options: ["<bottom>", "<foot>", "<footer>", "<end>"],
    answer: 2,
    difficulty: "Easy"
  },
  {
    question: "Which input type is used for entering an email address?",
    options: ["type=\"mail\"", "type=\"email\"", "type=\"textmail\"", "type=\"message\""],
    answer: 1,
   
  },
  {
    question: "Which attribute makes an input field mandatory in a form?",
    options: ["validate", "required", "mustfill", "placeholder"],
    answer: 1,
   
  },
  {
    question: "Which HTML element is used to create a dropdown list?",
    options: ["<input type=\"dropdown\">", "<list>", "<select>", "<dropdown>"],
    answer: 2,
   
  },
  {
    question: "What is the correct HTML tag for the document title shown in browser tab?",
    options: ["<meta>", "<head>", "<title>", "<caption>"],
    answer: 2,
    
  },
  {
    question: "Which declaration is used at the top of an HTML5 document?",
    options: ["<!HTML5>", "<!DOCTYPE html>", "<doctype html5>", "<?html>"],
    answer: 1,
   
  },
  {
    question: "Which tag is used to group form controls in HTML?",
    options: ["<group>", "<fieldset>", "<formgroup>", "<section>"],
    answer: 1,
   
  },
  {
    question: "Which tag is used to label an input field?",
    options: ["<label>", "<caption>", "<legend>", "<tag>"],
    answer: 0,
    
  },
  {
    question: "Which attribute links a <label> with an input element?",
    options: ["id", "for", "name", "target"],
    answer: 1,
   
  },
 
];

const QUESTION_TIME = 30;

const startForm = document.getElementById("start-form");
const fullNameInput = document.getElementById("fullName");
const rollNumberInput = document.getElementById("rollNumber");
const divisionInput = document.getElementById("division");
const formError = document.getElementById("form-error");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const timerText = document.getElementById("timer-text");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const resName = document.getElementById("res-name");
const resRoll = document.getElementById("res-roll");
const resDivision = document.getElementById("res-division");
const resScore = document.getElementById("res-score");
const resMessage = document.getElementById("res-message");
const restartBtn = document.getElementById("restart-btn");

const quizState = {
  user: {
    name: "",
    rollNumber: "",
    division: ""
  },
  currentIndex: 0,
  answers: Array(QUESTIONS.length).fill(null),
  score: 0,
  timeLeft: QUESTION_TIME,
  timerId: null
};

startForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = fullNameInput.value.trim();
  const rollNumber = rollNumberInput.value.trim();
  const division = divisionInput.value.trim();

  if (!name || !rollNumber || !division) {
    formError.textContent = "Please fill in all fields before starting the quiz.";
    return;
  }

  formError.textContent = "";

  quizState.user = { name, rollNumber, division };
  quizState.currentIndex = 0;
  quizState.answers = Array(QUESTIONS.length).fill(null);
  quizState.score = 0;

  switchScreen(startScreen, quizScreen);
  renderQuestion();
  startTimer();
});

prevBtn.addEventListener("click", () => {
  if (quizState.currentIndex > 0) {
    quizState.currentIndex -= 1;
    renderQuestion();
    restartTimer();
  }
});

nextBtn.addEventListener("click", () => {
  if (quizState.answers[quizState.currentIndex] === null) {
    return;
  }

  if (quizState.currentIndex === QUESTIONS.length - 1) {
    finishQuiz();
    return;
  }

  quizState.currentIndex += 1;
  renderQuestion();
  restartTimer();
});

restartBtn.addEventListener("click", () => {
  clearTimer();
  startForm.reset();
  formError.textContent = "";
  switchScreen(resultScreen, startScreen);
});

function renderQuestion() {
  const index = quizState.currentIndex;
  const question = QUESTIONS[index];

  progressText.textContent = `Question ${index + 1}/${QUESTIONS.length}`;
  progressBar.style.width = `${((index + 1) / QUESTIONS.length) * 100}%`;
  questionText.textContent = question.question;

  optionsContainer.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option;

    if (quizState.answers[index] === optionIndex) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      quizState.answers[index] = optionIndex;
      renderQuestion();
    });

    optionsContainer.appendChild(button);
  });

  prevBtn.disabled = index === 0;

  if (index === QUESTIONS.length - 1) {
    nextBtn.textContent = "Submit Quiz";
  } else {
    nextBtn.textContent = "Next";
  }

  nextBtn.disabled = quizState.answers[index] === null;
}

function finishQuiz() {
  clearTimer();
  calculateScore();
  showResults();
  switchScreen(quizScreen, resultScreen);
}

function calculateScore() {
  let total = 0;

  QUESTIONS.forEach((question, index) => {
    if (quizState.answers[index] === question.answer) {
      total += 1;
    }
  });

  quizState.score = total;
}

function showResults() {
  resName.textContent = quizState.user.name;
  resRoll.textContent = quizState.user.rollNumber;
  resDivision.textContent = quizState.user.division;
  resScore.textContent = `${quizState.score}/${QUESTIONS.length}`;

  const percentage = (quizState.score / QUESTIONS.length) * 100;

  if (percentage >= 80) {
    resMessage.textContent = "Excellent";
  } else if (percentage >= 50) {
    resMessage.textContent = "Good";
  } else {
    resMessage.textContent = "Needs Improvement";
  }
}

function startTimer() {
  quizState.timeLeft = QUESTION_TIME;
  updateTimerUI();

  quizState.timerId = setInterval(() => {
    quizState.timeLeft -= 1;
    updateTimerUI();

    if (quizState.timeLeft <= 0) {
      autoMoveNext();
    }
  }, 1000);
}

function restartTimer() {
  clearTimer();
  startTimer();
}

function clearTimer() {
  if (quizState.timerId) {
    clearInterval(quizState.timerId);
    quizState.timerId = null;
  }
}

function updateTimerUI() {
  timerText.textContent = `Time Left: ${quizState.timeLeft}s`;
}

function autoMoveNext() {
  if (quizState.currentIndex === QUESTIONS.length - 1) {
    finishQuiz();
    return;
  }

  quizState.currentIndex += 1;
  renderQuestion();
  restartTimer();
}

function switchScreen(fromScreen, toScreen) {
  fromScreen.classList.remove("active", "fade-in");
  toScreen.classList.add("active", "fade-in");

  setTimeout(() => {
    toScreen.classList.remove("fade-in");
  }, 380);
}
