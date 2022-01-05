const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const reportDate = detectReportDate();
const reportYear = reportDate.getUTCFullYear();
const reportMonth = reportDate.getUTCMonth();

const gamePassHeartURL = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/green-heart_1f49a.png";

async function loadReportData() {
  let allData = await Promise.all([fetchGameData(), fetchLessonData()]);

  for(let data of allData) {
    if (data.type == "game") {
      parseGameData(data);
    } else if (data.type == "lesson") {
      parseLessonData(data);
    }
  }
  
  updateMonth();
  updateEmoji();
  updateGamePassHearts();
  restoreView();
}

function parseGameData(data) {
  let games = data.games.filter(addedOrRemovedThisMonth);
  let beatenGames = games.filter(beaten);
  let jettisonedGames = games.filter(jettisoned);
  let addedGames = games.filter(addedThisMonth);

  console.log(`beaten: ${beatenGames.length}`);
  console.log(`jettisoned: ${jettisonedGames.length}`);
  console.log(`added: ${addedGames.length}`);
}

function parseLessonData(data) {
  let lessons = data.lessons.filter(addedThisMonth);
  console.log(`lessons: ${lessons.length}`);
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

function beaten(game) {
  return (game.status == "beaten" && game.hasOwnProperty("removed"));
}

function jettisoned(game) {
  return (game.status == "jettisoned" && game.hasOwnProperty("removed"));
}

function addedOrRemovedThisMonth(game) {
  let added = addedThisMonth(game);
  let removed = removedThisMonth(game);

  return (added || removed);
}

function addedThisMonth(game) {
  let date = new Date(game.added);
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth();

  return ((year == reportYear) && (month == reportMonth));
}

function removedThisMonth(game) {
  let removed = false;
  
  if (game.hasOwnProperty("removed")) {
    let date = new Date(game.removed);
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();

    removed = ((year == reportYear) && (month == reportMonth));
  }

  return removed;
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
