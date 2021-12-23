/* TODO List
 * - Fetch game json from localhost:8000/v1/games/games.json
 * - Fetch purchases json from localhost:8000/v1/games/purchases.json
 * - Fetch lessons json from localhost:8000/v1/games/lessons.json
 * - Populate related divs with data.
 * - Cross-reference the "last_modified" of each file and find the most recent, then 
 */

async function loadData() {
  let options = { mode: 'no-cors' };
  let response = await fetch('https://api.trueheart78.com/v1/games/games.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let gameData = await response.json();

  let dates = [];
  dates.push(gameData["last_modified"]);

  updateLastModified(dates);

  parseGames(gameData["games"], gameData["statuses"]);
}

function updateLastModified(dates) {
  let today = new Date(dates[0]);
  let options = { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
  let lastModifiedDate = today.toLocaleString("en-US", options);

  document.getElementById("last-modified").innerHTML = lastModifiedDate;
  // console.log(lastModifiedDate);
}

function parseGames(games, statuses) {
  // console.log(games);
  for (let currentStatus of statuses) {
    let divId = `games-${currentStatus.replaceAll(" ", "-")}`;
    let div = document.getElementById(divId);
    if (div != null) {
      let items = [];
      for (let game of games) {
        if (game["status"] == currentStatus) {
          items.push(gameToHTML(game));
        }
      }
      if (items.length == 0) {
        items.push("<li><em>TBD</em></li>");
      }
      div.innerHTML = `<ol>${items.join("\n")}</ol>`;
    } else {
      console.log(`Info: No element found with the "${divId}" id.`);
    }
  }
}

function gameToHTML(game) {
  let string = `${game["name"]} (${game["system"]})`;
  if (game.hasOwnProperty("hours") && game["hours"] > 0) {
    string += ` [${game["hours"]}hr]`;
  }
  if (game.hasOwnProperty("cartridge") && game["cartridge"]) {
    string += " 💾";
  }
  if (game.hasOwnProperty("disc") && game["disc"]) {
    string += " 💿";
  }
  if (game.hasOwnProperty("gamepass") && game["gamepass"]) {
    string += " 💚";
  }
  if (recentAddition(game["added"])) {
    string += " 🆕";
  }
  if (game.hasOwnProperty("notes") && game["notes"].length > 0) {
    string += "\n<ul>";
    for(let note of game["notes"]) {
      string += `\n<li>${note}</li>`;
    }
    string += "\n</ul>";
  }

  return `<li>${string}</li>`;
}

const today = new Date();
const oneDay = 1000 * 3600 * 24;

function recentAddition(date) {
  let added = new Date(date);
  let daysDiff = Math.floor(Math.abs((added.getTime() - today.getTime()) / oneDay));
  let recent = daysDiff <= 90;

  return recent;
}

loadData()
.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});
