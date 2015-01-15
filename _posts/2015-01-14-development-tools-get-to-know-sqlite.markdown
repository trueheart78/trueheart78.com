---
layout: post
title:  "Get to know SQLite"
date:   2015-01-14 23:00:00
categories: development-tools
---
Some development tools are just so good, and so simple, that they often get overlooked. They are just part of everyday life, and it's easy to forget they exist. [SQLite][sqlite] is one such tool. I'd be surprised if you weren't using it in multiple places already.

For me, when I first heard the name "SQLite", I had the response that most others probably had, "Oh, so a little database?" It's actually pretty amazing how robust this database is, and [how in-use it has become][in-use].

For all intents and purposes, it is a code library that can be bundled with almost any technology. It's self-contained, doesn't require an installation process, and you don't have to worry about it stealing CPU or memory from your system. Did I mention that it requires zero configuration, and that it is amazingly durable so you can be confident that your data is saved?

That's SQLite.

As smart devices appear in more and more places, it gets used even more. It flourishes as an embedded database. Got a device and need a standard way to store and retrieve data? It has you covered. Do you just want a simple database-backed web application for personal use? It can handle that, too.

You don't need a separate database server all of the time, especially not when doing development. I love the fact that Rails uses SQLite as it's default database. Need to make a backup? Just copy the database file. Need to view the data? Open up one of many data browsers available. You can even open up a terminal to connect to it, if you really want to.

As someone who has worked with various database technologies (like MySQL), setting up a database server to run on a system can be a pain. What if you just want to do development, and not have to install a database server? What if you're trying to teach someone about programming and you need to help them setup their environment?

Database servers have their place, but that place isn't always on systems that have limited CPU, power-restraints, or even developer machines. Or, one of my favorites, on set-it-and-forget-it script / application setups. I've setup many small MySQL servers only to have to service them down the road, and wonder, "what's that password again?"

Some times, you just want a simple yet powerful solution that you can forget about. You want a tool that handles the magic for you.

For that, SQLite has your back.

[sqlite]: https://www.sqlite.org/
[in-use]: https://www.sqlite.org/mostdeployed.html
