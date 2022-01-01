const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getFullMonth();

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
  
  updateDate();
  updateEmoji();
  restoreView();
  console.info(params);
}

function restoreView() {
  window.scrollTo(0, 0);
}

function updateDate() {
  document.getElementById("month").innerHTML = month("2022-01-01");
}

function month(date) {
  let options = { month: "long", timeZone: "UTC" };
  
  // return new Date(date).toLocaleString("en-US", options);
  return today.toLocaleString("en-US", options);
}

function updateEmoji() {
  // update emoji
  // update emoji url
}

function emoji(month) {
  return "❄️";
}

function logError(error) {
  console.error(error.message);
}

loadReportData().catch(e => logError(e));
