const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const reportDate = detectReportDate();
const reportYear = reportDate.getUTCFullYear();
const reportMonth = reportDate.getUTCMonth();

const cartridgeURL = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/floppy-disk_1f4be.png";
const discURL = "https://emojipedia-us.s3.amazonaws.com/source/skype/289/optical-disk_1f4bf.png";
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
  updateGameIcons();
  restoreView();
}

function parseGameData(data) {
  let games = data.games.filter(addedOrRemovedThisMonth);
  let beatenGames = games.filter(beaten);
  let jettisonedGames = games.filter(jettisoned);
  let addedGames = games.filter(addedThisMonth);

  displayGames(beatenGames, "beaten");
  displayGames(jettisonedGames, "jettisoned");
  displayGames(addedGames, "added");
}

function displayGames(games, type) {
  let htmlItems = [];
  let bbcodeItems = [];

  if (games.length > 0) {
    for (let game of games) {
      htmlItems.push(gameToHTML(game));
      bbcodeItems.push(gameToBBCode(game));
    }
  } else {
    htmlItems.push("<li>None.</li>");
    bbcodeItems.push("[*] None.<br>");
  }

  setHTML(`default-games-${type}`, `<ol>${htmlItems.join("\n")}</ol>`);
  setHTML(`bbcode-games-${type}`, `[ol]<br>${bbcodeItems.join("")}[/ol]`);
}

function parseLessonData(data) {
  let lessons = data.lessons.filter(addedThisMonth);
  
  displayLessons(lessons);
}

function displayLessons(lessons) {
  let htmlItems = [];
  let bbcodeItems = [];

  if (lessons.length > 0) {
    for(let lesson of lessons) {
      htmlItems.push(lessonToHTML(lesson));
      bbcodeItems.push(lessonToBBCode(lesson));
    }
  } else {
    htmlItems.push("<li>None.</li>");
    bbcodeItems.push("[*] None.<br>");
  }

  setHTML(`default-lessons-learned`, `<ol>${htmlItems.join("\n")}</ol>`);
  setHTML(`bbcode-lessons-learned`, `[ol]<br>${bbcodeItems.join("")}[/ol]`);
}

function gameToHTML(game) {
  let output = [];

  if (game.hasOwnProperty("url") && game.url.length > 0) {
    output.push(`<a href="${game.url}" target="_blank">${game.name}</a>`);
  } else {
    output.push(game.name);
  }
  output.push(` (${game.system.toUpperCase()})`);
  if (hasHours(game)) {
    output.push(` [${game.hours}hr]`);
  }
  if (isGamePass(game)) {
    output.push(" 💚");
  } else if (isCartridge(game)) {
    output.push(" 💾");
  } else if (isDisc(game)) {
    output.push(" 💿");
  }
  if (hasNotes(game)) {
    output.push("\n<ul>");
    for(let note of game.notes) {
      output.push(`\n<li>${note}</li>`);
    }
    output.push("\n</ul>");
  }

  return `<li>${output.join("")}</li>`;
}

function gameToBBCode(game) {
  let output = [];

  if (game.hasOwnProperty("url") && game.url.length > 0) {
    output.push(`[url=${game.url}]${game.name}[/url]`);
  } else {
    output.push(game.name);
  }
  output.push(` (${game.system.toUpperCase()})`);
  if (hasHours(game)) {
    output.push(` [${game.hours}hr]`);
  }
  if (isGamePass(game)) {
    output.push("&nbsp;<span id='game-pass-heart'></span>");
  } else if (isCartridge(game)) {
    output.push("&nbsp;<span id='cartridge'></span>");
  } else if (isDisc(game)) {
    output.push("&nbsp;<span id='disc'></span>");
  }
  if (hasNotes(game)) {
    output.push("<br>&nbsp;&nbsp;[ul]");
    for(let note of game.notes) {
      output.push(`<br>&nbsp;&nbsp;&nbsp;&nbsp;[*] ${note}`);
    }
    output.push("<br>&nbsp;&nbsp;[/ul]");
  }

  return `[*] ${output.join("")}<br>`;
}

function lessonToHTML(lesson) {
  let output = [];
  let parts = lesson.learned.split(".");
  
  output.push(`<strong>${parts.shift()}.</strong>`);
  output.push(parts.join("."));
  
  if (hasExamples(lesson)) {
    output.push("\n<ul><li>See <i>");
    output.push(lesson.examples.join("</i> and <i>"));
    output.push("</i>.</li>\n</ul>");
  }

  return `<li>${output.join("")}</li>`;
}

function lessonToBBCode(lesson) {
  let output = [];
  let parts = lesson.learned.split(".");
  
  output.push(`[b]${parts.shift()}.[/b]`);
  output.push(parts.join("."));
  
  if (hasExamples(lesson)) {
    output.push("<br>&nbsp;&nbsp;[ul]<br>");
    output.push("&nbsp;&nbsp;&nbsp;&nbsp;[*] See [i]");
    output.push(lesson.examples.join("[/i] and [i]"));
    output.push("[/i].<br>&nbsp;&nbsp;[/ul]");
  }

  return `[*] ${output.join("")}<br>`;
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

function updateGameIcons() {
  updateIcons("cartridge", cartridgeURL);
  updateIcons("disc", discURL);
  updateIcons("game-pass-heart", gamePassHeartURL);
}

function updateIcons(className, iconURL) {
  let elements = document.getElementsByClassName(className);
  
  for(let element of elements) {
    element.innerHTML = `[img=18x18]${iconURL}[/img]`;
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

function copyReport() {
  var range = document.createRange();
  range.selectNode(document.getElementById("bbcode-report"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();

  document.getElementById("copy-report-button").innerText = "Copied!";
}

function logError(error) {
  console.error(error.message);
}

loadReportData().catch(e => logError(e));
