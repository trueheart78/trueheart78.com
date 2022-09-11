---
layout: page
title: 📒 Game Report
description: A report page for my ever evolving list of games.
keywords: games, report
permalink: /game-report/
remote_css: https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css
---
<div id="monthly-menu"></div>
<div id="default-report">
<h1><span id="default-month"></span> <span id="default-emoji"></span></h1>
<h3>Beaten 🏁</h3>
<p>
<div id="default-games-beaten"></div>
</p>
<h3>Jettisoned 🔥</h3>
<p>
<div id="default-games-jettisoned"></div>
</p>
<h3>Added 🦖</h3>
<p>
<div id="default-games-added"></div>
</p>
<h3>Learned 🧐</h3>
<p>
<div id="default-lessons-learned"></div>
</p>
<h3>Legend ℹ️</h3>
<p>
<ul>
<li>💚 = Game Pass</li>
<li>💿 = Disc version</li>
<li>💾 = Cartridge version</li>
<li>🎮 = Spent time playing it</li>
</ul>
</p>
</div>

<button id="copy-report-button" onclick="copyReport()">Copy BBCode</button>

<hr>
<div id="bbcode-report" style="font-family: 'Fira Code', monospace;">
[h1]<span id="bbcode-month"></span> [img=30x30]<span id="bbcode-emoji"></span>[/img][/h1]<br>
<br>
[img]FIND-A-GIF[/img]<br>
<br>
[h3]Beaten [img=25x25]https://emojipedia-us.s3.amazonaws.com/source/skype/289/chequered-flag_1f3c1.png[/img][/h3]<br>
<div id="bbcode-games-beaten"></div>
<br>
[h3]Jettisoned [img=25x25]https://emojipedia-us.s3.amazonaws.com/source/skype/289/fire_1f525.png[/img][/h3]<br>
<div id="bbcode-games-jettisoned"></div>
<br>
[h3]Added [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/t-rex_1f996.png[/img][/h3]<br>
<div id="bbcode-games-added"></div>
<br>
[h3]Learned [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/face-with-monocle_1f9d0.png[/img][/h3]<br>
<div id="bbcode-lessons-learned"></div>
<br>
[h3]Legend [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/304/information_2139-fe0f.png[/img][/h3]<br>
<br>
<span class="game-pass-heart"></span> = Xbox Game Pass<br>
<span class="disc"></span> = Disc version<br>
<span class="cartridge"></span> = Cartridge version<br>
<span class="controller"></span> = Spent time playing it<br>
<br>
[img]FIND-A-GIF[/img]
</div>

<script type="text/javascript" src="/assets/javascript/api_functions.js"></script>
<script type="text/javascript" src="/assets/javascript/classes/game.js"></script>
<script type="text/javascript" src="/assets/javascript/classes/purchase.js"></script>
<script type="text/javascript" src="/assets/javascript/classes/lesson.js"></script>
<script type="text/javascript" src="/assets/javascript/monthly_emojis.js"></script>
<script type="text/javascript" src="/assets/javascript/game_report.js"></script>
