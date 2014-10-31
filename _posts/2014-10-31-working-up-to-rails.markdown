---
layout: post
title:  "Working Up To Rails"
date:   2014-10-31 00:30:00
categories: ruby
---
"Rails is magic." That's what I've been told, and I tend to agree, because I still find
myself struggling to understand what's going on behind the curtain frequently.

Thankfully, however, if you're like me and you really enjoy using Ruby and want to
use it for web development, [Rails][rails] isn't your only option. [Sinatra][sinatra] and
[Padrino][padrino] tend to be easier to get started with.

Now, when people choose non-Rails frameworks, it's for a few reasons:

- They want a minimalist site that doesn't require much effort.
- They want to build a Ruby-based web site but have a working knowledge of Rails.
- They are attracted by the speed of the framework's ability to serve requests.

All of these are fine reasons, and [Rails][rails], when you understand what is actually
happening, sure seems like magic. It is more concerned about helping you get your
application up and running, having made a lot of decisions for you. It might not be as
fast as other frameworks, but it doesn't have to be, because that's not the point.

On the other end of the spectrum is [Sinatra][sinatra]. It's a very lightweight framework for
building web applications that don't need the complexity of Rails. For learning how Ruby
works with web requests, this is a great starting point. There are still complexities (like
middleware), but it feels good to just get a Ruby-based website up and running with little
hassle.

Don't be fooled, though, because while Sinatra is a great starting point, you'll quickly 
find yourself need more. It's a common issue, though, as once you get past the basic needs of
a web site, it's easy to find yourself bolting on libraries to accomodate the missing
featureset of Rails. At that point, you should consider something more.

So when you want something like Rails, but know Sinatra, there is still a large step between them
 - and it's a doozy. Thankfully, that's where [Padrino][padrino] comes in. It's built on top of
Sinatra, so it will be familiar, but it adds in support for Rails-isms that you'll eventually
be working with, like code generation, and database migrations.

Personally, once I'm understanding the magic that happens in Padrino, and it becomes a science
instead of a spell, then I'll feel more confident working with Rails. Because right now? Rails
still feels like wizardry.

[sinatra]: http://sinatrarb.com
[padrino]: http://padrinorb.com
[rails]:  http://rubyonrails.org
