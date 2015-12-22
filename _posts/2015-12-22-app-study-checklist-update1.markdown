---
layout: post
title:  "My Application Study List - Update 1"
date:   2015-12-22 00:00:00
categories: news
---
2016 is fast approaching, and (per
[my previous post][app-study-checklist],
 I am working on learning some new skills.

> The basics of using RSS feeds for audio

Pretty straightforward, actually. Found some [good documentation][apple-itunes-docs] from
Apple regarding how best to setup iTunes tags in an RSS feed.

> How to provide an RSS feed using a demo Rails app

It's not too bad, really. An XML-based endpoint with the right tags,
that pulls the correct data from the database. Add in some caching,
and it actually isn't very daunting.

> Getting Comfortable with Ajax in Rails

It makes a lot more sense now, but it's still a little more complex
than I like. I suspect I will get comfortable with it, but right now,
I still need to do some more exercises to make it less alien.

> Comfortably hosting Rails in a non-Heroku environment

I've made the most progress on this subject. Everything is going quite
well. I've gotten comfortable putting Rails 4 applications online using
[Openshift][openshift] and working through some troublesome issues.
I've got it working, and pretty reliably, so now I've got a great place
to host apps that allows SSL at no extra charge (barring the certificate
cost).

[app-study-checklist]:  {% post_url 2015-11-29-app-study-checklist %}
[openshift]:            https://openshift.redhat.com
[apple-itunes-docs]:    https://www.apple.com/itunes/podcasts/specs.html
