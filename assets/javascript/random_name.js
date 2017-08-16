function randomName(sex, id) {
  sex = (sex) ? '/' + sex : '';
  id = (id) ? id : 'character-name-link';
  var oReq = new XMLHttpRequest();
  oReq.onload = function (e) {
    var character = JSON.parse(e.target.response);
    var output = character.name + ' (' + character.sex + ')';
    if(character.title != '') {
        output += ' from ' + character.title;
    }
    document.getElementById(id).innerHTML = output;
  };
  oReq.open('GET', 'https://random.pls.lol/api/character-name' + sex, true);
  oReq.send();
}
