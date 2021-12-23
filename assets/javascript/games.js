/* TODO List
 * - Fetch game json from localhost:8000/v1/games/games.json
 * - Fetch purchases json from localhost:8000/v1/games/purchases.json
 * - Fetch lessons json from localhost:8000/v1/games/lessons.json
 * - Populate related divs with data.
 * - Cross-reference the "last_modified" of each file and find the most recent, then 
 *
 *
 *
 */

function loadData() {
  // alert("Loading data!");

  updateLastModified();
}

function updateLastModified() {
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  document.getElementById("last-modified").innerHTML = today.toLocaleString('default', options);
}

loadData();
