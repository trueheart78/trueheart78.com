---
layout: page
title: Resume
permalink: /resume/
update: 2021-02-08
---

# Hi, I'm Josh. :wave:

[Strengths](#strengths-muscle) |
[Experience](#experience-scroll) |
[Side Projects](#side-projects-wrench) |
[Open Source](#open-source-contributions-octocat) |
[Work History](#work-history-office) |
[Education](#education-apple)

![refresh if you don't see a 'taylor waving.gif'][taylor-hi]

I love writing Ruby & Go :sparkling_heart:, rocking out to Taylor Swift :notes:, and using gifs to
make others smile :smile:.

I'm looking for a light-hearted, collaborative team, that could benefit from my strong back-end
development skills.

## Strengths :muscle:

[:back: to the top][top]

![refresh if you don't see a 'taylor swift strong.gif'][taylor-strong]

* I :heart: Ruby & Go. I love the communities, and the languages.
* I aspire to be an excellent software craftsman.
* I enjoy writing good documentation, as I find it highly valuable.
* I think of myself as a very good mentor.
* I always consider future maintainers.
* I desire to contribute to open source.
* I was called "Gif Captain" by my manager.

## Experience :scroll:

[:back: to the top][top]

![refresh if you don't see a 'taylor swift whats up.gif'][taylor-whats-up]

* Eight years of Ruby.
* Six years of Ruby on Rails.
* Two years of Go.
* Eight years of being a huge Taylor Swift fan.
* Thirteen years of PHP, MySQL, and JavaScript.
* Eleven years of managing critical on-line systems.

## Side Projects :wrench:

[:back: to the top][top]

![refresh if you don't see a 'taylor award dance.gif'][taylor-award-dance]

I’ve written some fun things over the past few years.

### I :heart: Ruby :ledger:

My somewhat active blog. I post about development-related topics, from Ruby and Rails, to Heroku
and command-line tools. Uses Jekyll so I only have to use markdown, and is hosted on GitHub pages.

* Site: [iheartruby.com][iheartruby]
* Source: [GitHub][iheartruby-source]

### Dropbox Gif Linker :link:

I have a lot of gifs in my Dropbox, so I wanted a simpler way to get a publicly viewable URL. It
connects to Dropbox’s api and creates a public share, caches that in a key-value store (in said
Dropbox), and provides an embeddable URL. Great for markdown and BBCode support.

Originally written in Ruby, now written in Go.

* Go Source: [GitHub][dropbox-gif-linker-source]
* Ruby Source: [GitHub][gifs-gem-source]

### Caring for Karen Sue :credit_card:

A charity-focused site, built in Ruby using Rails. Uses PayPal for payment processing. 

* Site: [caringforkarensue.com][caringforkarensue]
* Source: [GitHub][caringforkarensue-source]

### Book Notes :notebook:

Where I put notes from books I’ve read. Makes it much easier to study across machines, and provides
a handy, searchable reference.

* Source: [GitHub][book-notes-source]

### Book Notes Generator :repeat:

Extracted from the early version of my Book Notes, it reads a YAML file (example link) and generates
the core markdown files for the chapters and sections. It also places them directly into the above
Book Notes project in a new folder, with a handy Readme link provided at the end. _I should really 
change this into a gem or a binary_.

* Source: [GitHub][book-notes-generator-source]

### Game Selector :space_invader:

A Ruby application with the Sinatra framework that accesses the `/games` endpoint of my blog, and 
uses Nokogiri to parse lists, caches it in Redis for five minutes, and returns a randomly selected
title.

* Source: [GitHub][game-selector-source]

### Dead To Us :skull:

A goof project to display team members at CMM that are "dead to us" (read: anyone that has left the
team). Originally a Rails 5 project, I converted it to a basic HTML site on AWS S3 for faster load
times, and no monthly cost.

* Site: [deadtous.com][dead-to-us]
* Source: [GitHub][dead-to-us-source]

### TimeToTaylor :clock7:

This consists of an AWS Lambda that I wrote in Go, and a web page on AWS S3 that interacted with it
using an AWS API Gateway endpoint. They don't talk to each other anymore now that the showtime has
passed, but I'm keeping it around for the next one. :microphone:

* Site: [timetotaylor.com][time-to-taylor]
* API Endpoint: [time-to-taylor-endpoint][time-to-taylor-endpoint]
* Site Source: [GitHub][time-to-taylor-html-source]
* Lambda Source: [GitHub][time-to-taylor-go-source]

### Go! Call Me (Maybe)! :rotating_light:

Originally a Sinatra-based Ruby application called _Alexa Alerter_, I converted this into a Go-based
binary that works with Twilio and can be uploaded to the AWS Lambda service, with environment
variables controlling some of the features. It then can have an Alexa-based skill pointed towards it,
enabling features like, "tell Josh I need him".

* Go Source: [GitHub][go-call-me-maybe]
* Ruby Source: [GitHub][alexa-alerter-source]

### Go! Call Me Notifier :pager:

Since I always have my watch or phone on vibrate when I'm working (and often charging at that time),
I tend to miss an alert from the above *Alexa Alerter*. To fix that, I developed a Go program that
subscribes to the remote Redis server, which then pings me on my MacOS desktop that my attention is
needed.

_Note: No longer maintained due to work-related VPN restrictions._

* Source: [GitHub][go-call-me-notifier]

### Alexa Food Tracker (WIP) :hamburger:

A Ruby application with the Sinatra framework that will integrate with an Alexa skill to provide
answers to questions like, "What do we have for snacks?", and "What do we have for dinner?".
Currently in the process of learning Elm for the desired front-end that will be required. _I may
just use Rails' CRUD for now._

* Source: [GitHub][alexa-food-tracker-source]

## Open Source Contributions :octocat:

[:back: to the top][top]

![refresh if you don't see 'taylor swift epic.gif'][taylor-epic]

### Turbolinks :zap:

Discovered an IE8-related bug in Turbolinks and submitted a PR to the project. It was merged later that same day.

* Pull request: [GitHub][turbolinks-pr]

### Stoplight Admin :traffic_light:

Found two bugs in the project related to a previous user's PR. One related to support for the Redis
version dependency being increased when it made no sense, the other related to missing library
support for `sinatra/json`. Not only were both the bugs fixed, but I also introduced tests into the
project to make sure that at least the core framework would load without issue.

* Redis Pull Request: [GitHub][stoplight-redis-pr]
* Tests Pull Request: [GitHub][stoplight-tests-pr]

## Work History :office:

[:back: to the top][top]

![refresh if you don't see a 'taylor mountain.gif'][taylor-mountain]

### CoverMyMeds (2015 to present) :pill:

* Mentored multiple software apprentices.
* Ushered in a gif revolution.
* Handled the upgrade process for multiple applications through different Rails and Ruby versions.

### Vya (2007 to 2015) :envelope:

#### Senior Software Developer (2010 to 2015)

* Migrated the marketing portal codebase to run on both Windows Server 2008 and CentOS.
* Transitioned the codebase version control system from SVN to Git.
* Became a Zend Certified Engineer for PHP 5.3 – [License ZEND022958][php-cert]

#### Internet Application Developer (2007 to 2010)

* Created a dynamic reporting system to offload work from support.
* Migrated the marketing portal codebase to from Mac OS X Server to Windows Server 2008, in production.
* Introduced the use of coding standards.

### Self-Employed Contractor (2004 to 2007) :house:

* Maintained the _Advanced Office System (AOS)_ REALTOR-focused showing system.
* Worked with REALTOR-based listing services to create custom data imports for clients.
* Created an integrated online support system for managing user-submitted tickets.

## Education :apple:

[:back: to the top][top]

![refresh if you don't see a 'taylor swift studying.gif'][taylor-studying]

### ITT Technical Institute :mortar_board:

Associate of Computer Science in Software Applications and Programming

## Thanks for Reading! :sparkling_heart:

[:back: to the top][top]

![refresh if you don't see a 'taylor heart.gif'][taylor-heart]

[top]: #hi-im-josh-wave
[iheartruby]: http://iheartruby.com
[iheartruby-source]: https://github.com/trueheart78/trueheart78.github.io
[dropbox-gif-linker-source]: https://github.com/trueheart78/dropbox-gif-linker
[gifs-gem-source]: https://github.com/trueheart78/gifs
[caringforkarensue]: https://caringforkarensue.com
[caringforkarensue-source]: https://github.com/trueheart78/CaringForKarenSue-Rails
[book-notes-source]: https://github.com/trueheart78/book-notes
[book-notes-generator-source]: https://github.com/trueheart78/book-notes-generator
[game-selector-source]: https://github.com/trueheart78/game-selector
[dead-to-us]: https://www.deadtous.com/
[dead-to-us-source]: https://github.com/trueheart78/dead-to-us-html
[time-to-taylor]: http://timetotaylor.com
[time-to-taylor-endpoint]: https://gvitovaif0.execute-api.us-east-2.amazonaws.com/development/showtime
[time-to-taylor-html-source]: https://github.com/trueheart78/timeToTaylor.com
[time-to-taylor-go-source]: https://github.com/trueheart78/timeToTaylor
[alexa-alerter-source]: https://github.com/trueheart78/alexa-alerter
[go-call-me-maybe]: https://github.com/trueheart78/go-call-me-maybe
[go-call-me-notifier]: https://github.com/trueheart78/go-call-me-notifier
[alexa-food-tracker-source]: https://github.com/trueheart78/alexa-food-tracker
[github]: https://github.com/trueheart78
[turbolinks-pr]: https://github.com/turbolinks/turbolinks/pull/284
[stoplight-redis-pr]: https://github.com/orgsync/stoplight-admin/pull/24
[stoplight-tests-pr]: https://github.com/orgsync/stoplight-admin/pull/26
[php-cert]: http://www.zend.com/en/yellow-pages/ZEND022958
[contact-converter]: https://github.com/trueheart78/Contacts-To-PDF
[email-me]: mailto:iloveyourresume@nym.hush.com
[taylor-hi]: /assets/images/resume/taylor-hi.gif
[taylor-strong]: /assets/images/resume/taylor-strong.gif
[taylor-whats-up]: /assets/images/resume/taylor-whats-up.gif
[taylor-award-dance]: /assets/images/resume/taylor-award-dance.gif
[taylor-epic]: /assets/images/resume/taylor-epic.gif
[taylor-studying]: /assets/images/resume/taylor-studying.gif
[taylor-mountain]: /assets/images/resume/taylor-mountain.gif
[taylor-heart]: /assets/images/resume/taylor-heart.gif
[taylor-work-it-jlo]: /assets/images/resume/taylor-work-it-jlo.gif
[taylor-call-me]: /assets/images/resume/taylor-call-me.gif
