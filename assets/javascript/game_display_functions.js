function isCartridge(game) {
  return (game.hasOwnProperty("cartridge") && game.cartridge);
}

function isDisc(game) {
  return (game.hasOwnProperty("disc") && game.disc);
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

function hasExamples(lesson) {
  return (lesson.hasOwnProperty("examples") && lesson.examples.length > 0);
}
