---
layout: page
title: 🔮 My Games
description: A management page for my ever evolving list of games.
keywords: games, xbox, playstation, nintendo, nintendo switch, switch, oculus quest, oculus, quest, virtual reality, vr
permalink: /games/
customnav: games_nav_v2.html
update: placeholder
---
<style>
/* Allows the dope reverse-order with descending numbers */
#lessons-learned ol {
    transform: rotate(180deg);
}
#lessons-learned ol > li {
    transform: rotate(-180deg);
}
</style>

<a id="playing"></a>

## 🎮 Playing [🔝][top]

#### 👀 Focused [🔝][top]

<div id="games-playing"></div>

<a id="paused"></a>
#### 🚥 Paused [🔝][top]

<div id="games-paused"></div>

<a id="unplayed"></a>
## 👾 Unplayed [🔝][top]

<button onclick="suggestRandomGame('any')">Help Me Decide</button>
<button onclick="suggestRandomGame('short')">Short</button>
<button onclick="suggestRandomGame('medium')">Medium</button>
<button onclick="suggestRandomGame('long')">Long</button>

<div id="games-unplayed"></div>

<a id="fun"></a>

## 😍 For Funsies [🔝][top]

<div id="games-fun"></div>

<a id="vr-games"></a>

## 🕶 VR Games [🔝][top]

<div id="games-vr"></div>

<a id="beaten"></a>

## 🏁 Beaten [🔝][top]

<div id="games-beaten"></div>

<a id="played"></a>

## 🛝 Played  [🔝][top]

<div id="games-played"></div>

<a id="jettisoned"></a>

## 🚀 Jettisoned [🔝][top]

Games here aren't bad, I just don't plan on getting to them.

<div id="games-jettisoned"></div>

<a id="purchases"></a>

## 💸 Planned Purchases [🔝][top]

See the [New Releases Wiki][new-releases]. Sorted by release date.

<div id="purchases-planned"></div>

## 💰 Planned Purchases [🔝][top]

See the [Games in Development Wiki][games-in-development].

<div id="purchases-future"></div>

## 💵 Planned Purchases (Previously Released) [🔝][top]

<div id="purchases-released"></div>

<a id="why"></a>

## 💭 Why? [🔝][top]

> You should be playing games you enjoy. Just remember your pile when you start
> looking for something else to play, instead of purchasing another title.
>
> That's really all this is for - to make sure you enjoy what you're playing and getting rid of
> stuff that you aren't. - [Me, 2013][2013 - 12 month pile thread GWJ]

<a id="lessons"></a>

## 📝 Lessons Learned [🔝][top]

<div id="lessons-learned"></div>

<a id="legend"></a>

## ℹ️ Legend [🔝][top]

* 💚 = Xbox Game Pass
* 🆕 = Added within the last 90 days

<script type="text/javascript" src="/assets/javascript/v2/api_functions.js"></script>
<script type="text/javascript" src="/assets/javascript/v2/classes/game.js"></script>
<script type="text/javascript" src="/assets/javascript/v2/classes/purchase.js"></script>
<script type="text/javascript" src="/assets/javascript/v2/classes/lesson.js"></script>
<script type="text/javascript" src="/assets/javascript/v2/games.js"></script>

[top]: #page-top
[new-releases]: https://en.wikipedia.org/wiki/2023_in_video_games#Game_releases
[games-in-development]: https://en.wikipedia.org/wiki/List_of_video_games_in_development
[2013 - 12 month pile thread GWJ]: https://www.gamerswithjobs.com/node/1283851?page=6#comment-12179406
