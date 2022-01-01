const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const gamePassHeartURL = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/green-heart_1f49a.png";

async function loadGameData() {
  let response = await fetch('https://api.trueheart78.com/v1/games/games.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let gameData = await response.json();

  // parseGames(gameData.games, gameData.statuses);
  
  return gameData;
}

async function loadLessonData() {
  let response = await fetch('https://api.trueheart78.com/v1/games/lessons.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let lessonData = await response.json();

  // parseLessons(lessonData.lessons);
  
  return lessonData;
}

async function loadReportData() {
  let gameData = loadGameData();
  let lessonData = loadLessonData();

  let allData = await Promise.all([gameData, lessonData]);
  
  console.info(params);
  
  updateMonth();
  updateEmoji();
  updateGamePassHearts();
  restoreView();
}

function restoreView() {
  window.scrollTo(0, 0);
}

function updateMonth() {
  let month = getLongMonth("2022-01-01");
  
  document.getElementById("default-month").innerHTML = month;
  document.getElementById("bbcode-month").innerHTML = month;
}

function getLongMonth(date) {
  let options = { month: "long", timeZone: "UTC" };
  
  // return new Date(date).toLocaleString("en-US", options);
  return today.toLocaleString("en-US", options);
}

function updateEmoji() {
  document.getElementById("default-emoji").innerHTML = getEmoji("");
  document.getElementById("bbcode-emoji").innerHTML = getEmojiURL("");
}

function getEmoji(month) {
  return "❄️";
}

function getEmojiURL(month) {
  return "https://emojipedia-us.s3.amazonaws.com/source/skype/289/snowflake_2744-fe0f.png";
}

function updateGamePassHearts() {
  let elements = document.getElementsByClassName("game-pass-heart");
  
  for(let element of elements) {
    element.innerHTML = gamePassHeartURL;
  }
}

function copyReport() {
  var range = document.createRange();
  range.selectNode(document.getElementById('bbcode-report'));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  document.getElementById('copy-report-button').value = 'Copied!';
}

function logError(error) {
  console.error(error.message);
}

loadReportData().catch(e => logError(e));
