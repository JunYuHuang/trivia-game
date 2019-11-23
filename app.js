// query selectors and global variables
const questionContainer = document.querySelector("#question-container");
const answersContainer = document.querySelector("#answers-container");
const buttonNextQuestion = document.querySelector("#button-next-question");
let question = "";
let correctAnswer = ``;
let incorrectAnswers = [];
let answers = [];
let isAnswered = false;

buttonNextQuestion.addEventListener("click", () => {
  startNewGame();
});

disableNextQuestionButton();

// start initial game
startNewGame();

function startNewGame() {
  disableNextQuestionButton();
  resetTriviaSetUI();
  getAPIData()
    .then(data => {
      question = data.question;
      correctAnswer = data.correct_answer;
      incorrectAnswers = data.incorrect_answers;
      answers = shuffle([...incorrectAnswers, correctAnswer]);
      generateTriviaSetUI(question, answers);
    })
    .catch(error => console.log(error));
}

// get API data for 1 trivia set (1 question + 1 correct answer + 3 incorrect answers)
async function getAPIData(
  question_count = 1,
  question_category = 15,
  question_type = "multiple"
) {
  const apiResponse = await fetch(
    `https://opentdb.com/api.php?amount=${question_count}&category=${question_category}&type=${question_type}`
  );
  const data = await apiResponse.json();
  return data.results[0];
}

// toggle next question button visibility
function toggleNextQuestionButton() {
  if (isAnswered) {
    buttonNextQuestion.style.display = "none";
  } else {
    buttonNextQuestion.style.display = "block";
  }
  isAnswered = !isAnswered;
  console.log("test");
}

// display 1 trivia set
function generateTriviaSetUI(question, answers) {
  questionContainer.insertAdjacentHTML("beforeend", `<h4>${question}</h4>`);

  answers.forEach(answer => {
    let divAnswer = document.createElement("div");
    divAnswer.innerHTML = `${answer}`;
    divAnswer.classList.add("row", "answer-item");
    divAnswer.dataset.answer = `${answer}`;
    answersContainer.append(divAnswer);
  });

  const answerItems = document.querySelectorAll(
    "#answers-container div.answer-item"
  );

  // respond in UI depending on which answer was clicked
  answersContainer.addEventListener("click", event => {
    // any of the "answer" divs must be clicked to trigger response
    if (event.target.matches("div.answer-item")) {
      // evaluate each answer
      answerItems.forEach(item => {
        // dim all answers that were not clicked on by the user
        if (item !== event.target) {
          item.classList.add("answer-item-not-selected");
        }
        // set the correct answer's background to green and prepend it with a checkmark
        if (item.getAttribute("data-answer") === correctAnswer) {
          item.classList.add("answer-item-correct");
          item.insertAdjacentHTML("afterbegin", "&#x2714; ");
        } else {
          // set all incorrect answers' background to red and prepend them each with a cross
          item.classList.add("answer-item-incorrect");
          item.insertAdjacentHTML("afterbegin", "&#x2718; ");
        }
      });

      // disable all answer options once any answer is clicked
      answerItems.forEach(item => {
        item.classList.add("disabledElement");
      });
    }
    // re-enable next-question button
    enableNextQuestionButton();
  });
}

function enableNextQuestionButton() {
  buttonNextQuestion.style.display = "inline-block";
  buttonNextQuestion.disabled = false;
}

function disableNextQuestionButton() {
  buttonNextQuestion.style.display = "none";
  buttonNextQuestion.disabled = true;
}

// reset app ui; delete all child elements under the question and answers divs
function resetTriviaSetUI() {
  const childOfQuestionContainer = Array.prototype.slice.call(
    questionContainer.getElementsByTagName("*")
  );
  const childrenOfAnswersContainer = Array.prototype.slice.call(
    answersContainer.getElementsByTagName("*")
  );
  childOfQuestionContainer.forEach(childElement => childElement.remove());
  childrenOfAnswersContainer.forEach(childElement => childElement.remove());
}

// shuffle order of answers
function shuffle(array) {
  var clone = array.slice(0);
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  return clone;
}
