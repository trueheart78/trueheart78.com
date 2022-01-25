Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
}

let allGames = [];
let allPurchases = [];
let allLessons = [];

async function loadData() {
  let allData = await Promise.all([fetchGameData(), fetchPurchaseData(), fetchLessonData()]);
  
  let dates = [];
  for(let data of allData) {
    if (data.type == "game") {
      for(let game of data.games) {
        allGames.push(new Game(game));
      }
      dates = dates.concat(allGames.map(findGameDates)).flat();
    } else if (data.type == "purchase") {
      for(let purchase of data.purchases) {
        allPurchases.push(new Purchase(purchase));
      }
    } else if (data.type == "lesson") {
      for(let lesson of data.lessons) {
        allLessons.push(new Lesson(lesson));
      }
      dates = dates.concat(allLessons.map(lesson => lesson.added)).flat();
    }
    dates.push(data.last_modified);
  }

  for(let data of allData) {
    if (data.type == "game") {
      parseGames(data);
    } else if (data.type == "purchase") {
      parsePurchases(data);
    } else if (data.type == "lesson") {
      parseLessons(data);
    }
  }
  updateLastModified(dates);
  restoreView();
}

function findGameDates(game) {
  let gameDates = [game.added];
  if (game.wasRemoved) {
    gameDates.push(game.removed);
  }

  return gameDates;
}

function restoreView() {
  let id = selectedSectionId();
  
  if (id != "" && document.getElementById(id)) {
    document.querySelector(`#${id}`).scrollIntoView({behavior: 'smooth'});
  } else {
    window.scrollTo(0, 0);
  }
}

function selectedSectionId() {
  let id = "";
  let url = window.location.href;
  
  if (url.indexOf("#") != -1) {
    id = url.split("#").pop();
  }
  
  return id;
}

function updateLastModified(dates) {
  if (dates.length > 0) {
    let mostRecentDate = dates.sort().reverse().shift();
    
    document.getElementById("last-modified").innerHTML = longDate(mostRecentDate);
  }
}

function longDate(date) {
  let options = { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
  
  return new Date(date).toLocaleString("en-US", options);
}

function shortDate(date) {
  let options = { day: "numeric", month: "numeric", year: "2-digit", timeZone: "UTC" };
  
  return new Date(date).toLocaleString("en-US", options);
}

function parseGames(data) {
  let games = data.games;
  let statuses = data.statuses;
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
      if (["beaten", "jettisoned"].includes(currentStatus)) {
        items = items.filter(removedThisYear);
      }
      items = sortGames(items, currentStatus);
      for(let item of items) {
        htmlItems.push(gameToHTML(item));
      }
      if (htmlItems.length == 0) {
        htmlItems.push("<li><em>TBD</em></li>");
      }
      div.innerHTML = `<ol>${htmlItems.join("\n")}</ol>`;
    } else {
      console.info(`No element found with the "${divId}" id.`);
    }
  }
}

function parsePurchases(data) {
  let purchases = data.purchases;
  let categories = data.categories;
  let completed_statuses = data.completed_statuses;
  for (let currentCategory of categories) {
    let divId = `purchases-${currentCategory}`;
    let div = document.getElementById(divId);
    if (div != null) {
      let items = [];
      let itemsWithRelease = [];
      let htmlItems = [];
      for (let purchase of purchases) {
        if (purchase.category == currentCategory) {
          if (purchase.hasOwnProperty("release_date") && purchase.release_date != "") {
            itemsWithRelease.push(purchase);
          } else {
            items.push(purchase);
          }
        }
      }
      itemsWithRelease = itemsWithRelease.sort(compareWithRelease);
      items = items.sort(compare);
      items = itemsWithRelease.concat(items);

      for(let item of items) {
        let completed = completed_statuses.includes(item.status);
        htmlItems.push(purchaseToHTML(item, completed));
      }
      if (htmlItems.length == 0) {
        htmlItems.push("<li><em>TBD</em></li>");
      }
      div.innerHTML = `<ol>${htmlItems.join("\n")}</ol>`;
    } else {
      console.info(`No element found with the "${divId}" id.`);
    }
  }
}

function parseLessons(data) {
  let lessons = data.lessons;
  let div = document.getElementById("lessons-learned");
  let items = [];
  
  lessons = lessons.sort(compareByAdded);
  for (let lesson of lessons) {
    items.push(lessonToHTML(lesson));
  }
  div.innerHTML = `<ol>${items.join("\n")}</ol>`;
}

function removedThisYear(game) {
  let valid = true;
  
  if (game.hasOwnProperty("removed") && !isThisYear(game.removed)) {
    valid = false;
  }

  return valid;
}

function sortGames(games, status) {
  if (["unplayed", "vr experiences"].includes(status)) {
    games = games.sort(compareWithHours);
  } else if (["beaten", "jettisoned"].includes(status)) {
    games = games.sort(compareByRemoved);
  } else {
    games = games.sort(compare);
  }
  
  return games;
}

// Sort by name
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  let gameNameA = a.name.toUpperCase();
  let gameNameB = b.name.toUpperCase();

  let comparison = 0;
  if (gameNameA > gameNameB) {
    comparison = 1;
  } else if (gameNameA < gameNameB) {
    comparison = -1;
  }

  return comparison;
}

// Sort by hours first, and then name
function compareWithHours(a, b) {
  let gameHoursA = a.hours;
  let gameHoursB = b.hours;
  // Use toUpperCase() to ignore character casing
  let gameNameA = a.name.toUpperCase();
  let gameNameB = b.name.toUpperCase();

  let comparison = 0;
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

// Sort by release date and, if they match, sort by name
function compareWithRelease(a, b) {
  let gameReleaseA = new Date(a.release_date).getTime();
  let gameReleaseB = new Date(b.release_date).getTime();

  let comparison = 0;
  if (gameReleaseA > gameReleaseB) {
    comparison = 1;
  } else if (gameReleaseA < gameReleaseB) {
    comparison = -1;
  } else {
    // Use toUpperCase() to ignore character casing
    let gameNameA = a.name.toUpperCase();
    let gameNameB = b.name.toUpperCase();

    if (gameNameA > gameNameB) {
      comparison = 1;
    } else if (gameNameA < gameNameB) {
      comparison = -1;
    }
  }

  return comparison;
}

function compareByAdded(a, b) {
  let itemAddedA = new Date(a.added).getTime();
  let itemAddedB = new Date(b.added).getTime();

  let comparison = 0;
  if (itemAddedA > itemAddedB) {
    comparison = 1;
  } else if (itemAddedA < itemAddedB) {
    comparison = -1;
  }

  return comparison;
}

function compareByRemoved(a, b) {
  let gameRemovedA = new Date(a.removed).getTime();
  let gameRemovedB = new Date(b.removed).getTime();

  let comparison = 0;
  if (gameRemovedA > gameRemovedB) {
    comparison = 1;
  } else if (gameRemovedA < gameRemovedB) {
    comparison = -1;
  }

  return comparison;
}


function lessonToHTML(lesson) {
  let output = [];
  
  output.push(`<strong>${lesson.learned}</strong> `);
  
  if (hasNotes(lesson)) {
    output.push(lesson.notes.join(" "));
  }
  
  if (hasExamples(lesson)) {
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
  if (isRecentAddition(game.added)) {
    output.push(" 🆕");
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

function purchaseToHTML(purchase, completed) {
  let output = [];
  if (purchase.hasOwnProperty("url") && purchase.url.length > 0) {
    output.push(`<a href="${purchase.url}" target="_blank">${purchase.name}</a>`);
  } else {
    output.push(purchase.name);
  }
  output.push(` (${purchase.system.toUpperCase()})`);
  if (hasHours(purchase)) {
    output.push(` [${purchase.hours}hr]`);
  }
  if (purchase.hasOwnProperty("release_date") && purchase.release_date) {
    output.push(` [${shortDate(purchase.release_date)}]`);
  } else if (purchase.category == "planned") {
    output.push(" [TBD]");
  }
  let status = "";
  if (!completed) {
    if (purchase.hasOwnProperty("reason") && purchase.reason) {
      status = `${purchase.status} for ${purchase.reason}`
    } else if (purchase.status == "waiting" && isGamePass(purchase)) {
      status = ""; 
    } else if (purchase.status == "waiting") {
      status = "wait and see"; 
    } else {
      status = `${purchase.status}`;
    }
  } else {
    output.unshift("<del>");
    output.push("</del>");
    status = `${purchase.status}`;
  }
  if (isGamePass(purchase)) {
    output.push(" 💚");
  }
  if (status != "") {
    output.push(` [${status}]`);
  }
  if (hasNotes(purchase)) {
    output.push("\n<ul>");
    for(let note of purchase.notes) {
      output.push(`\n<li>${note}</li>`);
    }
    output.push("\n</ul>");
  }

  return `<li>${output.join("")}</li>`;
}

const today = new Date();
const oneDay = 1000 * 3600 * 24;
const currentYear = today.getFullYear();

function isRecentAddition(date) {
  let added = new Date(date);
  let daysDiff = Math.floor(Math.abs((added.getTime() - today.getTime()) / oneDay));
  let recent = daysDiff <= 90;

  return recent;
}

function isThisYear(date) {
  let yearToCheck = new Date(date).getFullYear();
  let matches = (yearToCheck == currentYear);
  
  return matches;
}

/**
 * length: any, long, medium, short
 * system: any, xbox, vr, ns
 */
function suggestRandomGame(length = "any", system = "any") {
  let possibleGames = allGames.filter(game => game.unplayed && game.surpriseMe);
  if (system != "vr") {
    possibleGames = possibleGames.filter(game => !game.vr);
  }
  possibleGames = restrictLength(possibleGames, length);

  let game = possibleGames.random();
  
  let hourString = (game.hours != 1) ? "hours" : "hour";
  alert(`How about ${game.name} on ${game.system}? It's ${game.hours} ${hourString} long.`);
}

function restrictLength(games, length = "any") {
  let filteredGames = games;
  if (length != "any") {
    // Filter to correct values
    let minLength = 0;
    let maxLength = 0;
    if (length == "short") {
      minLength = 1;
      maxLength = 6;
    } else if (length == "medium") {
      minLength = 7
      maxLength = 20
    } else if (length == "long") {
      minLength = 21
      maxLength = 10000
    } else {
      console.warn(`Unsupported length restriction ("${length}")`);
    }

    if (minLength > 0 && maxLength > 0) {
      filteredGames = filteredGames.filter(game => game.hours >= minLength && game.hours <= maxLength);
    }
  }

  return filteredGames;
}

function logError(error) {
  console.error(error.message);
}

loadData().catch(e => logError(e));
