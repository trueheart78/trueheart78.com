---
layout: page
title: Character Names
permalink: /character-names/
---

<script>
function randomName(sex) {
  sex = (sex) ? sex : 'any';
  var oReq = new XMLHttpRequest();
  oReq.onload = function (e) {
    var name = JSON.parse(e.target.response).name;
    var id = "character-name-link";
    document.getElementById(id).innerHTML = name;
  };
  oReq.open('GET', 'https://random.pls.lol/api/character-name/' + sex, true);
  oReq.send();
}
</script>

_Last updated on July 18th, 2017_

#### <a href="javascript: randomName()" id="character-name-link">Random Character Name</a>

<!-- start:characters -->

+ Ashe (F) - Final Fantasy XII
+ Ashelia (F) - Final Fantasy XII
+ Olivia (F) - FRINGE
+ Olive (F) - FRINGE
+ Butts (F)

<!-- end:characters -->
