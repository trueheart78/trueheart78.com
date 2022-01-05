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
<div id="default-games-beaten">
</div>
</p>
<h3>New 🦖</h3>
<p>
<div id="default-games-new">
</div>
</p>
<h3>Jettisoned 🔥</h3>
<p>
<div id="default-games-jettisoned">
</div>
</p>
<h3>Learned 🧐</h3>
<p>
<div id="default-lessons-learned">
</div>
</p>
<h2>Legend ℹ️</h2>
<p>
💚 = Game Pass<br>
💿 = Disc-based version<br>
💾 = Cartridge-based version
</p>
</div>

<input type="button" id="copy-report-button" onclick="copyReport()" value="Copy BBCode Report" />

<hr>
<div id="bbcode-report" style="font-family: 'Fira Code', monospace;">
[h1]<span id="bbcode-month"></span> [img=30x30]<span id="bbcode-emoji"></span>[/img][/h1]<br>
<br>
[img]FIND-A-GIF[/img]<br>
<br>
[h3]Beaten [img=25x25]https://emojipedia-us.s3.amazonaws.com/source/skype/289/chequered-flag_1f3c1.png[/img][/h3]<br>
<div id="bbcode-games-beaten">
[ol]<br>
[*] Far Cry 3 Blood Dragon (360) [img=18x18]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/smiling-face-with-hearts_1f970.png[/img]<br>
[*] Wandersong (NS) [img=18x18]https://emojipedia-us.s3.amazonaws.com/source/skype/289/musical-notes_1f3b6.png[/img]<br>
[/ol]
</div>
<br>
[h3]New [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/t-rex_1f996.png[/img][/h3]<br>
<div id="bbcode-games-new">
[ol]<br>
[*] The Banner Saga (NS)<br>
[*] The Banner Saga 2 (NS)<br>
[*] The Banner Saga 3 (NS)<br>
[*] Forza Horizon 5 (XSX) [img=18x18]<span class="game-pass-heart"></span>[/img]<br>
[*] Immortals Fenyx Rising (XSX)<br>
[*] Marvels Guardians of the Galaxy (XSX)<br>
[*] Exo One (XSX) [img=18x18]<span class="game-pass-heart"></span>[/img]<br>
[*] Persona 5 Strikers (NS)<br>
[*] Tales of Arise (XSX)<br>
[*] Vader Immortal: Episode II (VR)<br>
[/ol]
</div>
<br>
[h3]Jettisoned [img=25x25]https://emojipedia-us.s3.amazonaws.com/source/skype/289/fire_1f525.png[/img][/h3]<br>
<div id="bbcode-games-jettisoned">
[ol]<br>
[*] Exo One (XSX) [img=18x18]<span class="game-pass-heart"></span>[/img]<br>
[*] Need For Speed Heat (XB1) [img=18x18]<span class="game-pass-heart"></span>[/img]<br>
[/ol]
</div>
<br>
[h3]Learned [img=25x25]https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/face-with-monocle_1f9d0.png[/img][/h3]<br>
<div id="bbcode-lessons-learned">
[ul]<br>
[*] Shorter games that I can complete in one to two sittings are wonderful.<br>
[/ul]
</div>
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
