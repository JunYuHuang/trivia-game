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
