class UI {
  constructor() {
    this.questionContent = document.getElementById("question-container");
    this.answersContainer = document.getElementById("answer-container");
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
        <input class="hidden" autocomplete="off" type="radio" id="answer-item-${i}" name="answer-option" class="row answer-item" value="${answers[i]}">
        <label class="row answer-item" for="answer-item-${i}">${answers[i]}</label>
      `;
    }

    this.answersContainer.innerHTML = output;
  }
}
