const scoreHtml = document.querySelector("#score");
function updateScore() {
  localStorage.setItem("score", score);
  scoreHtml.innerText = score;
}
let score = 0;
let scoreLocalState = localStorage.getItem("score");
if (scoreLocalState) {
  score = Number(scoreLocalState);
}
