function randomGame(type, elementTail) {
  type = (type) ? type : 'unplayed';
  elementTail = (elementTail) ? elementTail : '-link';
  var oReq = new XMLHttpRequest();
  oReq.onload = function (e) {
    var game = JSON.parse(e.target.response).game;
    var id = type + elementTail;
    document.getElementById(id).innerHTML = game;
  };
  oReq.open('GET', 'https://random.pls.lol/api/' + type, true);
  oReq.send();
}
