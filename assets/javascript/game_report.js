const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const reportDate = detectReportDate();
const reportYear = reportDate.getUTCFullYear();
const reportMonth = reportDate.getUTCMonth();

const gamePassHeartURL = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/green-heart_1f49a.png";

async function loadReportData() {
  let allData = await Promise.all([fetchGameData(), fetchLessonData()]);

  /* data to parse
  for(let data of allData) {
    if (data.type == "game") {

    } else if (data.type == "lesson") {

    }
  } */
  
  updateMonth();
  updateEmoji();
  updateGamePassHearts();
  restoreView();
}

function restoreView() {
  window.scrollTo(0, 0);
}

function updateMonth() {
  let longMonth = getLongMonth(`${reportYear}-${paddedMonth()}-01`);
  
  setHTML("default-month", longMonth);
  setHTML("bbcode-month", longMonth);
}
function paddedMonth() {
  let paddedMonth = reportMonth + 1;
  if (paddedMonth < 10) {
    paddedMonth = `0${paddedMonth}`;
  }

  return paddedMonth;
}

function getLongMonth(date) {
  let options = { month: "long" , timeZone: "UTC" };

  return new Date(date).toLocaleString("en-US", options);
}

function updateEmoji() {
  setHTML("default-emoji", getEmoji());
  setHTML("bbcode-emoji", getEmojiURL());
}

function getEmoji() {
  return monthlyEmojis[reportMonth];
}

function getEmojiURL() {
  return monthlyEmojiURLs[reportMonth];
}

function updateGamePassHearts() {
  let elements = document.getElementsByClassName("game-pass-heart");
  
  for(let element of elements) {
    element.innerHTML = gamePassHeartURL;
  }
}

function isThisMonth(date) {
  let d = new Date(date);
  let year = d.getUTCFullYear();
  let month = d.getUTCMonth();

  return ((year == reportYear) && (month == reportMonth));
}

function detectReportDate() {
  if (params.hasOwnProperty("date")) {
    return new Date(params.date);
  }

  return new Date();
}

function setHTML(id, html) {
  if (document.getElementById(id)) {
    document.getElementById(id).innerHTML = html
  } else {
    console.warning(`Unable to find element with id of "${id}"`);
  }
}

function isGamePass(game) {
  return (game.hasOwnProperty("gamepass") && game.gamepass);
}

function hasHours(game) {
  return (game.hasOwnProperty("hours") && game.hours > 0);
}

function hasNotes(game) {
  return (game.hasOwnProperty("notes") && game.notes.length > 0);
}

function copyReport() {
  var range = document.createRange();
  range.selectNode(document.getElementById("bbcode-report"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();

  document.getElementById("copy-report-button").value = "Copied!";
}

function logError(error) {
  console.error(error.message);
}

loadReportData().catch(e => logError(e));
