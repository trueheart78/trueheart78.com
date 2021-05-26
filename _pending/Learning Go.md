# Learning Go
[The Go Programming Language Promo - YouTube](https://www.youtube.com/watch?v=wwoWei-GAPo)

- Makes a few slides and keep the pace and let’s make a 10-15 showcase

## Notable People
- Russ Cox
- Rob Pike
- 

## History
* Announced in November of 2009
* Originally an experiment by Google engineers Robert Griesemer, Rob Pike, and Ken Thompson. Their goals:
	* Statically typed, with scalability to large systems
	* Productive and readable, without too many mandatory keywords and repetition
	* Not requiring an IDE
	* Support for networking and multiprocessing
- Reference: https://en.wikipedia.org/wiki/Go_(programming_language)#Projects_using_Go


* Time for a new compiled language to support the current changes in computing.
* Typical build times are under a second
* “We decided to create Go while waiting for a binary build to finish”
	* Joke with a grain of truth
* Reference: [Why Learn Go? - YouTube](https://www.youtube.com/watch?v=FTl0tl9BGdc)

## Why Did I Choose It?
### Influences

* Katrina Owen
	* She’s been a great influence, in-general, and seeing her enjoy it certainly doesn’t hurt
	
### What Interested Me?

* Cross-system binary compiling
	* Means no more gem installs with the right versions of Ruby, etc
* Great for system utilities
	* I love to write these
* Open Source
	* Even when Google burns to the ground, it can live on
* Highly concurrent
	* Designed after the rise of multi-core CPUs

### Why Am I Loving It?

* Comprehensive standard library 
* Built in support to detect race conditions during tests
* Testing is a first class citizen, like in Ruby
* It’s not Ruby, and that’s a good thing
	* If it was, I’d be wasting my time

### What Bugs Me About It?

* It’s not Ruby
	* It isn’t object-oriented
	* Naming convention is camelCase and not snake_case.
* I have to type parentheses now

### Where Does It Thrive?

* System-level commands and utilities
* Concurrent programs (supports multi-core processes, was created after the multi-core cpu)

### Comparable Languages

* Rust
* Swift

### Use-Cases

* Writing system-level utilities, like ngrok or docker
	* [ngrok - secure introspectable tunnels to localhost](https://ngrok.com/)
	* [Docker - Build, Ship, and Run Any App, Anywhere](https://www.docker.com/)
* Sharing cross-system binaries without having to setup a Go-supported environment
	* Exercism command line interface
	* [GitHub - exercism/cli: A Go based command line tool for exercism.io.](https://github.com/exercism/cli)
* Mine:
	* [Time to Taylor Swift’s 2018 Columbus, OH concert](https://github.com/trueheart78/timeToTaylor)
		* Command-line version
		* AWS Lambda version
	* [Dropbox Gif Linker](https://github.com/trueheart78/dropbox-gif-linker)
	* [Go! Beat It!](https://github.com/trueheart78/go-beat-it)
		* Interacts with HowLongToBeat.com to get answers

### Goals

* **Do less, enable more:** Keeping it simple to reach 90% of use-cases instead of trying to reach 99% and making it 
* **Have a different language without different dialects:** It’d be nice, but they want to keep it simple and accessible

## How Did I Get Confirmation?
From a #Taylor Swift# video, of course! [Delicate @ 3m 55s](https://youtu.be/tCXGJQYZ9JA)

![](Learning%20Go/FullSizeRender.jpg)
![](Learning%20Go/438816CD-D530-4416-98DD-F67A1A0C7841.png)


Turns out it’s the **Golden Gopher**. 

![](Learning%20Go/IMG_0429.JPG)

This is great, because she uses the term “golden" consistently throughout #reputation and has said before, _"real love shines golden like starlight"_ and a Go developer is considered a #gopher, so “Golden Gopher” basically means “Love for Gophers” (not "Gopher Love", that’d be weird).

![](Learning%20Go/gopherized%20400x428.png)
#gopherized

## Toy Problems from Exercises For Programmers
Book: [Exercises for Programmers: 57 Challenges to Develop Your Coding Skills by Brian P. Hogan |  The Pragmatic Bookshelf](https://pragprog.com/book/bhwb/exercises-for-programmers)

Repo:  [GitHub - trueheart78/exercises-for-programmers-go: Exercises for Programmers, in Golang](https://github.com/trueheart78/exercises-for-programmers-go)

## Systems Programming
Repo: [Go Systems Programming](https://github.com/trueheart78/go-systems-programming/blob/master/README.md)

### Garbage Collection

Concurrent garbage collection with Go works wonderfully. 

Yes, Go has a GC. If you would like to know how that factors into system-level stuff, you can read [Go GC: Prioritizing low latency and simplicity - The Go Blog](https://blog.golang.org/go15gc)

and watch [GopherCon 2015: Rick Hudson - Go GC: Solving the Latency Problem - YouTube](https://www.youtube.com/watch?v=aiv1JOfMjm0)

## Testing
- Built-in to Go in the `testing` package
- Gets even better when you add-in the `testify/assert` package
	- [GitHub - stretchr/testify: A toolkit with common assertions and mocks that plays nicely with the standard library](https://github.com/stretchr/testify)

## OpenSource - Why?
* Because a language needs lots of people to succeed, and being closed source was more likely to mean death than longevity. 
* Contributors created support for Windows and other OSs, like ARM64
* Community support (like conferences) is much more akin to Ruby (regional, not put on all by Google) 
* They try not to make any broad changes to Go without feedback from the community.
* “We need a large, diverse Go community” - Russ Cox @ Gophercon 2015

## Concurrency 
### Repo

 [GitHub - trueheart78/concurrency-in-go: Learning Concurrency and Parallelism in Go](https://github.com/trueheart78/concurrency-in-go)

*Add channels repo*

### Goroutines

Very straightforward to implement, and can be used with `WaitGroups` or `Channels` . Basically threads. ::I just haven’t found my use-case for it yet::

## Mobile Support

[iOS and Android Programming with Go — SitePoint](https://www.sitepoint.com/ios-and-android-programming-with-go/)
[GopherCon 2015: Hana Kim - Go For Mobile Devices - YouTube](https://youtu.be/sQ6-HyPxHKg?t=5m34s)

## Non-Go Support
As of v1.5, you can build programs as a library for other languages.

## Go in Go
As of the 1.5 release of Go, the entire system is written in Go (and a bit of assembler).

C is gone.

Originally in C for bootstrapping. It wasn’t primarily as a compiler implementation language.

Move to Go for easier to write, debug, and is a single language vs multiple
language.  Better modularity, tooling, testing, profiling, parallel execution, etc.

In the end, simplicity is the overriding consideration.

Enables:
- linker search
- new gc
- stack maps
- contiguous stacks
- write barriers

Converting the runtime is where the `unsafe pkg` shines.

## The Future of Go
v2.0
Beyond

#20% time/golang# #golang #presentation #concurrency #books/exercises for programmers# #20% time/needs demoed##golang/history#