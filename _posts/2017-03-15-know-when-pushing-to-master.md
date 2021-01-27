---
layout: post
title:  "Know When Pushing to Master"
date:   2017-03-15 12:15:00
categories: ruby
---

**Update:** See [Know When Pushing to Master (Redux)][redux] for a more complete solution.

You really probably shouldn't be pushing to the `master` branch of your repo.
Well, at least not for all repos. After I facepalmed recently when realizing
what I had done, I figured it was time to at least question myself before
doing so.

So, since I have shared aliases, I decided it was time to update my `git push`
one, `gp`, to something a bit more... investigative.

```sh
alias gp="ruby -e 'if \`git rev-parse --abbrev-ref HEAD\`.chomp == :master.to_s; print \"You are on **MASTER**. Seriously, though. Do you honestly want push to **MASTER**? (Y/N) \"; unless gets.chomp.downcase == :y.to_s; puts \"♥ Push-to-Master crisis averted ♥\"; exit 1;end;end' && git push"
```

Sure, it's a bit longer than I like, but it does what I want it to do: remind
me of which branch I am actually on, and then confirm if I still want to go
through with it.

The caveats are, of course, if I _don't use_ `gp`, this won't run. However, my
muscle-memory keeps `git push` from being used much at all. So, while not 100%
coverage, definitely better than 0%. And, it's system-wide.

[redux]: /2018/08/30/know-when-pushing-to-master-redux.html
