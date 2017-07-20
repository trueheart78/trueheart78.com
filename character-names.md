---
layout: page
title: Character Names
permalink: /character-names/
---

<script>
function randomName(sex) {
  sex = (sex) ? '/' + sex : '';
  var oReq = new XMLHttpRequest();
  oReq.onload = function (e) {
    var character = JSON.parse(e.target.response);
    var id = "character-name-link";
    var output = character.name + ' (' + character.sex + ')';
    if(character.title != '') {
        output += ' from ' + character.title;
    }
    document.getElementById(id).innerHTML = output;
  };
  oReq.open('GET', 'https://random.pls.lol/api/character-name' + sex, true);
  oReq.send();
}
</script>

_Last updated on July 18th, 2017_

#### <a href="javascript: randomName()" id="character-name-link">Random Character Name</a>

<!-- characters:start -->

+ Ashe (F) - Final Fantasy XII
+ Ashelia (F) - Final Fantasy XII
+ Basch (M) - Final Fantasy XII
+ Olivia (F) - FRINGE
+ Olive (F) - FRINGE
+ Butts (F)

<!-- characters:end -->
