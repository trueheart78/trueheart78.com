---
layout: page
title: 📒 Game Report
description: A report page for my ever evolving list of games.
keywords: games, report
permalink: /game-report/
remote_css: https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css
---

<div id="default-report">
<h1><span id="default-month"></span> <span id="default-emoji"></span></h1>
<h3>Beaten 🏁</h3>
<p>
<div id="default-games-beaten"></div>
</p>
<h3>New 🦖</h3>
<p>
<div id="default-games-new"></div>
</p>
<h3>Jettisoned 🔥</h3>
<p>
<div id="default-games-jettisoned"></div>
</p>
<h3>Learned 🧐</h3>
<p>
<div id="default-lessons-learned"></div>
</p>
<h2>Legend ℹ️</h2>
<p>
💚 = Game Pass<br>
💿 = Disc-based version<br>
💾 = Cartridge-based version
</p>
</div>

<button id="copy-report-button" onclick="copyReport()">Copy BBCode Report</button>

<hr>
<div id="bbcode-report" style="font-family: 'Fira Code', monospace;">
[h1]<span id="bbcode-month"></span> [img=30x30]<span id="bbcode-emoji"></span>[/img][/h1]<br>
<br>
[img]FIND-A-GIF[/img]<br>
<br>
[h3]Beaten [img=25x25]https://emojipedia-us.s3.amazonaws.com/source/skype/289/chequered-flag_1f3c1.png[/img][/h3]<br>
<div id="bbcode-games-beaten"></div>
<br>
[h3]New [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/t-rex_1f996.png[/img][/h3]<br>
<div id="bbcode-games-new"></div>
<br>
[h3]Jettisoned [img=25x25]https://emojipedia-us.s3.amazonaws.com/source/skype/289/fire_1f525.png[/img][/h3]<br>
<div id="bbcode-games-jettisoned"></div>
<br>
[h3]Learned [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/face-with-monocle_1f9d0.png[/img][/h3]<br>
<div id="bbcode-lessons-learned"></div>
<br>
[h2]Legend [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/304/information_2139-fe0f.png[/img][/h2]<br>
<br>
[img=18x18]<span class="game-pass-heart"></span>[/img] = Xbox Game Pass<br>
[img=18x18]<span class="disc"></span>[/img] = Disc-based version<br>
[img=18x18]<span class="cartridge"></span>[/img] = Cartridge-based version<br>
<br>
[img]FIND-A-GIF[/img]
</div>

<script type="text/javascript" src="/assets/javascript/api_functions.js"></script>
<script type="text/javascript" src="/assets/javascript/monthly_emojis.js"></script>
<script type="text/javascript" src="/assets/javascript/game_display_functions.js"></script>
<script type="text/javascript" src="/assets/javascript/game_report.js"></script>
