class OpenTriviaDB {
  constructor() {
    this.question_count = 1;
    this.question_category = "15"; // "video games"
    this.question_difficulty = "";
    this.question_type = "multiple";
  }

  async getTriviaItem() {
    const triviaItemResponse = await fetch(
      `https://opentdb.com/api.php?amount=${this.question_count}&category=${this.question_category}&difficulty=${this.question_difficulty}&type=${this.question_type}`
    );

    const triviaItem = await triviaItemResponse.json();

    return { triviaItem };
  }
}

class UI {
  constructor() {
    this.questionContent = document.querySelector("#question-container");
    this.answersContainer = document.querySelector("#answer-container");
    this.inputAnswers = document.querySelectorAll(
      "#answers-container .answer-input"
    );
  }

  // display question in UI
  showQuestion(question) {
    this.questionContent.innerHTML = `
      <h4>${question}</h4>
    `;
  }

  // display answers
  showAnswers(answers) {
    let output = "";

    for (var i = 0; i < answers.length; i++) {
      output += `
        <div class="row answer-item"> ${answers[i]}</div>
      `;
    }
    // onclick="console.log('Answer ${i + 1} was clicked')"
    /*
    <input class="hidden" autocomplete="off" type="radio" id="answer-item-${i}" name="answer-option" class="row answer-item" value="${answers[i]}">
    <label class="row answer-item" for="answer-item-${i}"> ${answers[i]}</label>
    */

    this.answersContainer.innerHTML = output;
  }

  enableAllAnswers() {
    this.inputAnswers.foreach(input => {
      input.pointerEvents = "auto";
    });
  }

  disableAllAnswers() {
    this.inputAnswers.foreach(input => {
      input.pointerEvents = "none";
    });
  }
}

// asci symbol for checkmark: &#x2714;

// initiate opentriviadb
const opentriviadb = new OpenTriviaDB();

// initiate UI
const ui = new UI();

// display question and answers
opentriviadb
  .getTriviaItem()
  .then(data => {
    const question = data.triviaItem.results[0].question;
    const correctAnswer = data.triviaItem.results[0].correct_answer;
    const incorrectAnswers = data.triviaItem.results[0].incorrect_answers;
    const answers = [...incorrectAnswers, correctAnswer];

    const shuffledAnswers = shuffle(answers);

    ui.showQuestion(question);
    ui.showAnswers(shuffledAnswers);

    // ui.enableAllAnswers();

    for (i = 0; i < answers.length; i++) {
      ui.answersContainer.children.item(i).addEventListener("click", e => {
        checkIfUsersAnswerIsCorrect(e, correctAnswer);
      });
    }

    // ui.disableAllAnswers();
  })
  .catch(error => console.log(error));

const checkIfUsersAnswerIsCorrect = (e, correctAnswer) => {
  console.log(e.target.innerText === correctAnswer);

  if (e.target.innerText === correctAnswer) {
    e.target.classList.add("answer-item-correct");
    e.target.innerHTML += " &#x2714;";

    // return true;
  } else {
    e.target.classList.add("answer-item-incorrect");
    // return false;
  }
};

function shuffle(a) {
  var clone = a.slice(0);
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  return clone;
}
