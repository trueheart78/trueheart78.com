async function loadGameData() {
  let response = await fetch('https://api.trueheart78.com/v1/games/games.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let gameData = await response.json();

  parseGames(gameData.games, gameData.statuses);
  
  return gameData;
}

async function loadPurchaseData() {
  let response = await fetch('https://api.trueheart78.com/v1/games/purchases.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let purchaseData = await response.json();

  parsePurchases(purchaseData.purchases, purchaseData.categories, purchaseData.completed_statuses);
  
  return purchaseData;
}

async function loadLessonData() {
  let response = await fetch('https://api.trueheart78.com/v1/games/lessons.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let lessonData = await response.json();

  parseLessons(lessonData.lessons);
  
  return lessonData;
}

async function loadData() {
  let gameData = loadGameData();
  let purchaseData = loadPurchaseData();
  let lessonData = loadLessonData();

  let allData = await Promise.all([gameData, purchaseData, lessonData]);
  
  let dates = [];
  for(let data of allData) {
    dates.push(data.last_modified);
  }
  updateLastModified(dates);
}

function updateLastModified(dates) {
  if (dates.length > 0) {
    let mostRecentDate = dates.sort().pop();
    
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

function parsePurchases(purchases, categories, completed_statuses) {
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

function compareWithRelease(a, b) {
  // Sort by release date and, if they match, sort by name
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
  isThisYear(game.added);
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
  if (game.hasOwnProperty("cartridge") && game.cartridge) {
    output.push(" 💾");
  }
  if (game.hasOwnProperty("disc") && game.disc) {
    output.push(" 💿");
  }
  if (hasGamePass(game)) {
    output.push(" 💚");
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
    } else if (purchase.status == "waiting" && hasGamePass(purchase)) {
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
  if (hasGamePass(purchase)) {
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

function hasGamePass(item) {
  return (item.hasOwnProperty("gamepass") && item.gamepass);
}

function hasHours(item) {
  return (item.hasOwnProperty("hours") && item.hours > 0);
}

function hasNotes(item) {
  return (item.hasOwnProperty("notes") && item.notes.length > 0);
}

const today = new Date();
const oneDay = 1000 * 3600 * 24;

function isRecentAddition(date) {
  let added = new Date(date);
  let daysDiff = Math.floor(Math.abs((added.getTime() - today.getTime()) / oneDay));
  let recent = daysDiff <= 90;

  return recent;
}

function isThisYear(date) {
  let options = { year: "2-digit", timeZone: "UTC" };
  
  let yearToCheck = new Date(date).toLocaleString("en-US", options);
  let currentYear = today.toLocaleString("en-US", options);
  
  console.log(`check: ${yearToCheck} (vs) current: ${currentYear}`);

  return yearToCheck == currentYear;
}

function logError(error) {
  console.log(`Error: ${error.message}`);
}

loadData().catch(e => logError(e));
