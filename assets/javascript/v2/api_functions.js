async function fetchGameData() {
  let response = await fetch('https://api.trueheart78.com/v2/games/games.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let gameData = await response.json();
  gameData.type = "game";
  
  return gameData;
}

async function fetchPurchaseData() {
  let response = await fetch('https://api.trueheart78.com/v2/games/purchases.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let purchaseData = await response.json();
  purchaseData.type = "purchase";
  
  return purchaseData;
}

async function fetchLessonData() {
  let response = await fetch('https://api.trueheart78.com/v2/games/lessons.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let lessonData = await response.json();
  lessonData.type = "lesson";
  
  return lessonData;
}

async function fetchSystemData() {
  let response = await fetch('https://api.trueheart78.com/v2/games/systems.json');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let systemData = await response.json();
  systemData.type = "system";
  
  return systemData;
}
