export default class Score {
  constructor() {
    this.score = 0;
    this.createScoreDisplay();
  }

  createScoreDisplay() {
    this.scoreElement = document.createElement("div");
    this.scoreElement.id = "score";
    this.scoreElement.style.position = "absolute";
    this.scoreElement.style.top = "10px";
    this.scoreElement.style.left = "900px";
    this.scoreElement.style.color = "black";
    this.scoreElement.style.fontSize = "5rem";
    this.scoreElement.style.fontWeight = "bold";
    this.scoreElement.style.fontFamily = "Arial, sans-serif";
    this.scoreElement.innerText = `${this.score}`;
    document.body.appendChild(this.scoreElement);
  }

  updateScore(points = 0) {
    this.score += points;
    console.log("score apdet", this.score);
    this.scoreElement.innerText = `${this.score}`;
  }

  resetScore() {
    this.score = 0;
    this.scoreElement.innerText = `${this.score}`;
  }

  getScore() {
    return this.score;
  }
}
