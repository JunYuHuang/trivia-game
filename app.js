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

    // for (i = 0; i < answers.length; i++) {
    //   ui.answersContainer.children.item(i).addEventListener("click", e => {
    //     checkUsersAnswer(e, correctAnswer);
    //   });
    // }
  })
  .catch(error => console.log(error));

const checkUsersAnswer = (e, correctAnswer) => {
  console.log(e.target.innerText === correctAnswer);

  if (e.target.innerText === correctAnswer) {
    e.target.classList.add("answer-item-correct");
  }

  let userHasAnswered = false;
  if (e.target.innerText !== null) {
    userHasAnswered = true;
    // disable all other buttons
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
