// query selectors and global variables
const app = document.querySelector("#app");
const questionsContainer = document.querySelector("#questions-container");
const answersContainer = document.querySelector("#answers-container");
const radioButtonAnswers = document.querySelector("#answers-container input");

// load up initial HTML template
app.innerHTML = `
  <div class="row">
    <h5 id="brand-text">🎮 Video Game Trivia</h5>
  </div>
  <div class="row" id="question-container"></div>
  <div class="row" id="answer-container"></div>
`;

// start initial game

// function for generating 1 trivia set
// get API data, create UI elements that display q+a, reset values

// get API data
async function getAPIData(question_count, question_category, question_type) {
  const apiResponse = await fetch(
    `https://opentdb.com/api.php?amount=${question_count}&category=${question_category}&type=${question_type}`
  );
  const data = await apiResponse.json();
  return data.results[0];
}

// create input element and event handler for each answer

// display trivia question and answer inputs in UI

// shuffle order of answers

// enable all answer inputs

// disable all answer inputs

// display results
