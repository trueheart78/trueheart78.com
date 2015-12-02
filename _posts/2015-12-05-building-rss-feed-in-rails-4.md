---
layout: post
title:  "Build a RSS Feed for Podcasts in Rails 4"
date:   2015-12-05 17:00:00
categories: development
---

notes:

- use a [feed validator](http://www.rssboard.org/rss-validator/)
- caching matters, but not worrying about it yet (strike?)
- planning to patch it into S3, which shouldn't matter
    in the end, should just be a media URL for each entry
- Rails requires an RSS route with XML details
- Tips from [CodingFish blog](https://www.codingfish.com/blog/129-how-to-create-rss-feed-rails-4-3-steps)

iTunes does have documentation

- Many tips [from Apple](https://www.apple.com/itunes/podcasts/specs.html)
- byte-range requests on S3 may or may not be a thing.
We'll find out!
- Make sure to set the right category, as well as everything else for iTunes

