/* TODO List
 * - Fetch game json from localhost:8000/v1/games/games.json
 * - Fetch purchases json from localhost:8000/v1/games/purchases.json
 * - Fetch lessons json from localhost:8000/v1/games/lessons.json
 * - Populate related divs with data.
 * - Cross-reference the "last_modified" of each file and find the most recent, then 
 */

const dates = [];

async function loadGameData() {
  let response = await fetch('https://api.trueheart78.com/v1/games/games.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let gameData = await response.json();
  dates.push(gameData.last_modified);

  parseGames(gameData.games, gameData.statuses);
}

async function loadLessonData() {
  let response = await fetch('https://api.trueheart78.com/v1/games/lessons.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let lessonData = await response.json();
  dates.push(lessonData.last_modified);

  parseLessons(lessonData.lessons);
}

function loadData() {
  loadGameData().catch(e => logError(e));
  loadLessonData().catch(e => logError(e));

//  updateLastModified(dates);
}

function updateLastModified(dates) {
  let today = new Date(dates[0]);
  let options = { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
  let lastModifiedDate = today.toLocaleString("en-US", options);

  document.getElementById("last-modified").innerHTML = lastModifiedDate;
  // console.log(lastModifiedDate);
}

function parseGames(games, statuses) {
  for (let currentStatus of statuses) {
    let divId = `games-${currentStatus.replaceAll(" ", "-")}`;
    let div = document.getElementById(divId);
    if (div != null) {
      let items = [];
      let htmlItems = [];
      for (let game of games) {
        if (game.status == currentStatus) {
          items.push(game);
        }
      }
      if (currentStatus == "unplayed" || currentStatus == "vr experiences") {
        items = items.sort(compareWithHours);
      } else if (currentStatus == "beaten" || currentStatus == "jettisoned") {
        items = items.sort(compareByRemoved);
      } else {
        items = items.sort(compare);
      }
      for(let item of items) {
        htmlItems.push(gameToHTML(item));
      }
      if (htmlItems.length == 0) {
        htmlItems.push("<li><em>TBD</em></li>");
      }
      div.innerHTML = `<ol>${htmlItems.join("\n")}</ol>`;
    } else {
      console.log(`Info: No element found with the "${divId}" id.`);
    }
  }
}

function parseLessons(lessons) {
  let div = document.getElementById("lessons-learned");
  let items = [];
  for (let lesson of lessons) {
    items.push(lessonToHTML(lesson));
  }
  div.innerHTML = `<ol>${items.join("\n")}</ol>`;
}
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  let gameNameA = a.name.toUpperCase();
  let gameNameB = b.name.toUpperCase();

  let comparison = 0;
  // Sort by name.
  if (gameNameA > gameNameB) {
    comparison = 1;
  } else if (gameNameA < gameNameB) {
    comparison = -1;
  }
  return comparison;
}

function compareWithHours(a, b) {
  let gameHoursA = a.hours;
  let gameHoursB = b.hours;
  // Use toUpperCase() to ignore character casing
  let gameNameA = a.name.toUpperCase();
  let gameNameB = b.name.toUpperCase();

  let comparison = 0;
  // Sort by hours first, and then name.
  if (gameHoursA > gameHoursB) {
    comparison = 1;
  } else if (gameHoursA < gameHoursB) {
    comparison = -1;
  } else if (gameNameA > gameNameB) {
    comparison = 1;
  } else if (gameNameA < gameNameB) {
    comparison = -1;
  }
  return comparison;
}

function compareByRemoved(a, b) {
  let gameRemovedA = new Date(a.removed).getTime();
  let gameRemovedB = new Date(b.removed).getTime();

  let comparison = 0;
  // Sort by removed time.
  if (gameRemovedA > gameRemovedB) {
    comparison = 1;
  } else if (gameRemovedA < gameRemovedB) {
    comparison = -1;
  }
  return comparison;
}

function lessonToHTML(lesson) {
  let output = [lesson.learned];
  if (lesson.hasOwnProperty("examples") && lesson.examples.length > 0) {
    output.push("\n<ul><li>See <i>");
    output.push(lesson.examples.join("</i> and <i>"));
    output.push("</i>.</li>\n</ul>");
  }

  return `<li>${output.join("")}</li>`;
}

function gameToHTML(game) {
  let output = [];
  if (game.hasOwnProperty("url") && game.url.length > 0) {
    output.push(`<a href="${game.url}" target="_blank">${game.name}</a>`);
  } else {
    output.push(game.name);
  }
  output.push(` (${game.system})`);
  if (game.hasOwnProperty("hours") && game.hours > 0) {
    output.push(` [${game.hours}hr]`);
  }
  if (game.hasOwnProperty("cartridge") && game.cartridge) {
    output.push(" 💾");
  }
  if (game.hasOwnProperty("disc") && game.disc) {
    output.push(" 💿");
  }
  if (game.hasOwnProperty("gamepass") && game.gamepass) {
    output.push(" 💚");
  }
  if (recentAddition(game.added)) {
    output.push(" 🆕");
  }
  if (game.hasOwnProperty("notes") && game.notes.length > 0) {
    output.push("\n<ul>");
    for(let note of game.notes) {
      output.push(`\n<li>${note}</li>`);
    }
    output.push("\n</ul>");
  }

  return `<li>${output.join("")}</li>`;
}

const today = new Date();
const oneDay = 1000 * 3600 * 24;

function recentAddition(date) {
  let added = new Date(date);
  let daysDiff = Math.floor(Math.abs((added.getTime() - today.getTime()) / oneDay));
  let recent = daysDiff <= 90;

  return recent;
}

function logError(error) {
  console.log(`Error: ${error.message}`);
}

loadData();
