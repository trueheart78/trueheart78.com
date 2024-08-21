---
layout: page
title: 👨‍💻 My Resume
description: I love writing Ruby, rocking out to Taylor Swift, and using gifs and emoji to make others smile. I’ve been writing software professionally for two decades as a back-end developer.
keywords: resume, ruby, software developer, software engineer, side projects, open source, rails, sinatrarb, aws, lambda, aws lambda, paypal, sidekiq
permalink: /resume/
update: 2024-08-21
---

<a id='intro'></a>
# :wave: Hi, I'm Josh Mills!

[Intro](#intro) |
[Strengths](#strengths) |
[Aspirations](#aspirations) |
[Experience](#experience) |
[Side Projects](#side-projects) |
[Open Source](#open-source) |
[Work History](#work-history) |
[Education](#education)

![Taylor Swift - Hello][taylor-hi]

I love writing Ruby :sparkling_heart:, rocking out to Taylor Swift :notes:, and using gifs and emoji to make others smile :smile:.

I've been writing software professionally for two decades as a back-end developer. 🥳

I enjoy empathetic, light-hearted teams where I can be a collaborative and supportive member. 💗

<a id='strengths'></a>
## :muscle: Strengths [:top:][top]

![Taylor Swift - Strong][taylor-strong]

* I :heart: Ruby. I love the community, and the language. 
* I love to write human-readable, intent-revealing code. 🤔
* I enjoy deepening my knowledge of Ruby through consistent learning. 📚
* I love supporting and empowering teammates. 🫂
* I enjoy building tools that make people’s lives better. 💖
<a id='aspirations'></a>
## :raising_hand: Aspirations [:top:][top]

![Taylor Swift - Aspiration][taylor-aspiration]

I want to continue to grow my knowledge and skillset as a Ruby developer while also teaching and mentoring others. 👩‍🏫

<!-- become a master software craftsman. -->

<a id='experience'></a>
## :scroll: Experience [:top:][top]

![Taylor Swift - Confident][taylor-confident]

* Eleven years of mastering Ruby, delivering tested and highly trusted code. ![Ruby][ruby-logo]
* Nine years of leveraging Ruby on Rails to build robust and scalable applications. :steam_locomotive:
* Five years managing the back-end of a web service, orchestrating Linux, MySQL, and Redis. :hammer_and_wrench:
* Nearly a decade of working in healthcare and maintaining HIPAA compliance. 🩺
* Over a decade working as a remote team member. 💻

<a id='side-projects'></a>
## :wrench: Side Projects [:top:][top]

![Taylor Swift - Award Dance][taylor-award-dance]

<!-- TODO: Try to limit this to 10 or less. You can always find discarded entries in the git history. -->

### :gem: Gem Lookup

Simple and effective gem intended to be used as a command line tool. It looks up gem details using [RubyGems.org's public API][ruby-gems-api] and displays the results in an emoji-filled fashion. Makes concurrent requests and obeys the rate limit via it's batching feature.

* RubyGems: [Gem Lookup][gem-lookup-ruby-gems]
* Source: [GitHub][gem-lookup-source]

### :golf: Caring for Karen Sue

A charity-focused site that holds annual golf-based events, built with Ruby on Rails, and using PayPal
for payment processing. 

* Site: [caringforkarensue.com][caringforkarensue]
* Source: [GitHub][caringforkarensue-source]

### :globe_with_meridians: I :sparkling_heart: Ruby

My personal website that also includes a [slightly active blog][blog]. The [games][games] page 
uses JavaScript to retrieve, parse, and display data from my personal API. The site utilizes
[Jekyll][jekyll] so I only have to use markdown for most of the content, and is hosted on [Netlify][netlify].

* Site: [trueheart78.com][trueheart78-site] aka [iheartruby.com][iheartruby]
* Source: [GitHub][iheartruby-source]

### :link: Dropbox Gif Linker

I have a lot of gifs in my [Dropbox][dropbox], so I wanted a simpler way to get a publicly viewable
URL. It connects to Dropbox’s API and creates a public share, caches that in a key-value store (in
said Dropbox), and provides an embeddable URL. Great for markdown and BBCode support.

Originally written in Ruby, now written in Go.

* Go Source: [GitHub][dropbox-gif-linker-source]
* Ruby Source: [GitHub][gifs-gem-source]

### :notebook: Book Notes

Where I put notes from books I’ve read. Makes it much easier to study across machines, and provides
a handy, searchable reference.

* Source: [GitHub][book-notes-source]

### :repeat: Book Notes Generator 

Extracted from the early version of my [Book Notes][book-notes-source], it reads a YAML file and
generates the core markdown files used for the chapters and sections. It also places them directly into
the above Book Notes project in a new folder, with a handy Readme link provided at the end. 

* Source: [GitHub][book-notes-generator-source]

### :space_invader: Go, Deathbonus!

As someone that enjoys watching people play games on [Twitch][twitch] (and generally does so from
a mobile device), I wanted to create a simple, easy-to-use site that could take me to a streamer's
subscribe page, their chat in a browser window, or directly to their stream. So, as [Dexbonus][dexbonus]
is one of my favorite content creators, I created a basic website using an alias of theirs, crafted
it as a JavaScript-powered HTML page, and hosted it on [Netlify][netlify].

* Site: [go.deathbon.us][deathbonus]
* Source: [GitHub][deathbonus-source]

### :rotating_light: Go! Call Me (Maybe)!

Created to send emergency phone calls and text messages. Originally a Sinatra-based Ruby application
called _Alexa Alerter_, I converted this into a Go-based binary that works with [Twilio][twilio] and
can be uploaded to the [AWS Lambda][aws-lambda] service, with environment variables controlling some
of the features. It then can have an [Alexa-based][amazon-echo] skill pointed towards it, enabling
features like, "tell Josh I need him".

* Go Source: [GitHub][go-call-me-maybe]
* Ruby Source: [GitHub][alexa-alerter-source]

### 🦠 Global Pandemic Goofs

This goof of a website was created because of the absurdness of the global pandemic. It
is a Ruby application utilizing Sinatra and has weighted logic to select random elements that make
up the phrases it generates. It reads from text files to provide options to replace the phrase, "In this global
pandemic?", with something like, "In this gleaming pop concert hall?", or "In this gothic Pulp Juice
And Smoothie Bar?" It even has a simple, but effective, API.

<!-- * Site: [pandemic-goofs.herokuapp.com][pandemic-goofs] -->
* Source: [GitHub][pandemic-goofs-source]

<a id='open-source'></a>
## :octocat: Open Source Contributions [:top:][top]

![Taylor Swift - Bejeweled - Nice][taylor-bejeweled-nice]

### :cat: Kitty

Migrated to a cross-platform terminal emulator called [kitty][kitty] and realized it did not support
the default Emoji keyboard on MacOS. Submitted a PR which added the missing support, and
(although the PR was closed), it was addressed minutes later in a new commit by the maintainer,
with a reference included.

* Pull Request: [GitHub][kitty-pr]
* Commit: [GitHub][kitty-commit]

### :traffic_light: Stoplight Admin

Found two bugs in the project related to a previous user's PR. One related to support for the Redis
version dependency being increased when it made no sense, the other related to missing library
support for `sinatra/json`. I fixed both the bugs, as well as introduced tests into the project to
make sure that the core framework would load.

* Redis Pull Request: [GitHub][stoplight-redis-pr]
* Tests Pull Request: [GitHub][stoplight-tests-pr]

### :zap: Turbolinks

Discovered an IE8-related bug in Turbolinks and submitted a PR to the project to fix it.

* Pull request: [GitHub][turbolinks-pr]

<a id='work-history'></a>
## :office: Work History [:top:][top]

![Taylor Swift - Reputation Mountain][taylor-mountain]

### 🥽 AppliedVR (2022 to 2024)

#### Staff Software Developer

* Developed a Ruby on Rails-based micro-service for two-way SMS using AWS Pinpoint and SNS.
* Crafted automated workflows to streamline delivery and responsiveness across internal and external applications.
* Enhanced our primary Rails API monolith's reliability and security by handling both Ruby and Rails upgrades.
* Stressed the importance of tests in code and led the charge by example, ensuring the delivery of high-quality, reliable code, and raising the passing specs from 40% to 100%.

### :pill: CoverMyMeds (2015 to 2022)

#### Software Developer

* Handled the upgrade process for multiple applications through many Ruby and Rails versions.
* Worked with developers and operations to standardize interactions in our migration to
  recently dockerized applications.
* Helped introduce a JSON Web Token (JWT) authorization process for our users.
* Built and maintained microservice-based, RESTful APIs. 

### :envelope: Vya (2007 to 2015)

#### Senior Software Developer (2010 to 2015)

* Coached external teams in building modules to incorporate into the marketing portal.
* Worked with clients to create single sign-on processes for users originating in their systems.
* Wrote, instituted and tested a comprehensive web application disaster recovery plan.
* Managed the MySQL database back-end, tuning performance settings and optimizing queries.
* Introduced full support for the MVC development pattern in a custom PHP framework.
* Migrated the marketing portal codebase to run on Windows Server, CentOS, and Ubuntu.

#### Internet Application Developer (2007 to 2010)

* Created a dynamic reporting system to offload work from support.
* Migrated the marketing portal codebase to from Mac OS X Server to Windows Server.
* Introduced the use of coding standards.

### :house: Self-Employed Contractor (2004 to 2007)

* Maintained the _Advanced Office System (AOS)_ REALTOR-focused showing system.
* Worked with REALTOR-based listing services to create custom data imports for clients.
* Created an integrated online support system for managing user-submitted tickets.

<a id='education'></a>
## :apple: Education [:top:][top]

![Taylor Swift - Graduating][taylor-graduating]

### :mortar_board: ITT Technical Institute

Associate of Computer Science in Software Applications and Programming

## :sparkling_heart: Thanks for Reading! [:top:][top]

![Taylor Swift - Heart Hands][taylor-heart]

[blog]: /blog
[pages]: /pages
[games]: /games
[jekyll]: https://jekyllrb.com/
[netlify]: https://www.netlify.com/
[trueheart78-site]: https://www.trueheart78.com
[iheartruby]: http://iheartruby.com
[iheartruby-source]: https://github.com/trueheart78/trueheart78.com
[dropbox]: https://www.dropbox.com/
[dropbox-gif-linker-source]: https://github.com/trueheart78/dropbox-gif-linker
[gifs-gem-source]: https://github.com/trueheart78/gifs
[caringforkarensue]: https://caringforkarensue.com
[caringforkarensue-source]: https://github.com/trueheart78/caring-for-karen-sue
[gem-lookup-ruby-gems]: https://rubygems.org/gems/gem_lookup
[gem-lookup-source]: https://github.com/trueheart78/gem_lookup/
[ruby-gems-api]: https://guides.rubygems.org/rubygems-org-api/#gem-methods
[book-notes-source]: https://github.com/trueheart78/book-notes
[book-notes-generator-source]: https://github.com/trueheart78/book-notes-generator
[deathbonus]: https://go.deathbon.us/
[deathbonus-source]: https://github.com/trueheart78/deathbonus-2.0
[alexa-alerter-source]: https://github.com/trueheart78/alexa-alerter
[go-call-me-maybe]: https://github.com/trueheart78/go-call-me-maybe
[twilio]: https://www.twilio.com/
[aws-lambda]: https://aws.amazon.com/lambda/
[amazon-echo]: https://en.wikipedia.org/wiki/Amazon_Echo
[pandemic-goofs]: https://pandemic-goofs.herokuapp.com/
[pandemic-goofs-source]: https://github.com/trueheart78/global-pandemic-goofs
[github]: https://github.com/trueheart78
[kitty]: https://github.com/kovidgoyal/kitty
[kitty-commit]: https://github.com/kovidgoyal/kitty/commit/9e476127d3c2f2643990b67d9b4642e956abbb54
[kitty-pr]: https://github.com/kovidgoyal/kitty/pull/3407
[turbolinks-pr]: https://github.com/turbolinks/turbolinks/pull/284
[stoplight-redis-pr]: https://github.com/orgsync/stoplight-admin/pull/24
[stoplight-tests-pr]: https://github.com/orgsync/stoplight-admin/pull/26
[php-cert]: http://www.zend.com/en/yellow-pages/ZEND022958
[contact-converter]: https://github.com/trueheart78/Contacts-To-PDF
[twitch]: https://twitch.tv/
[dexbonus]: https://twitch.tv/dexbonus
[ruby-lang]: https://www.ruby-lang.org/en/
[go-lang]: https://golang.org/
[go-logo]: /assets/images/language-icons/go-53x20.png
[ruby-on-rails]: https://rubyonrails.org/
[ruby-logo]: /assets/images/language-icons/ruby-20x20.png
[taylor-hi]: /assets/images/resume-2024/taylor-hi.gif
[taylor-strong]: /assets/images/resume-2024/taylor-strong.gif
[taylor-aspiration]: /assets/images/resume-2024/taylor-aspiration.gif
[taylor-confident]: /assets/images/resume-2024/taylor-confident.gif
[taylor-award-dance]: /assets/images/resume-2024/taylor-award-dance.gif
[taylor-graduating]: /assets/images/resume-2024/taylor-nyu-graduating.gif
[taylor-mountain]: /assets/images/resume-2024/taylor-mountain.gif
[taylor-bejeweled-nice]: /assets/images/resume-2024/taylor-bejeweled-nice.gif
[taylor-heart]: /assets/images/resume-2024/taylor-heart.gif
[top]: #page-top
