# Go: Building on the Shoulders of Giants (2018)
_and stepping on a few toes - Steve Francia_

[Steve Francia - Go: building on the shoulders of giants and stepping on a few toes - YouTube](https://www.youtube.com/watch?v=sX8r6zATHGU)

## Algol
First non-machine-related language
- “A language so far of ahead of its time…” - Tony Hoare

Europe: Algol -> Algol W -> Pascal
America: Algol -> CPL -> BCPL -> B -> C

Algol is the ancestor of all the current languages

## Why Another Language?
> **At scale, everything breaks** no matter what you do and you have to deal with reasonably cleanly with that and try to hide it from the people actually using your system - Urs Hölzle, Google: ‘At scale, everything breaks’ 2011  

> Keeping things **simple and yet scalable** is the biggest actual challenge. - Urs Hölzle, Google: ‘At scale, everything breaks’ 2011  

> Controlling complexity is the essence of computer programming - Brian Kernighan  

**Rob Pike + Ken Thompson + Rob Griesemer **= Go with language history from both Pascal and C, European and American.

Literally drafted the design during compile times

## Go’s Design Principles
1. Evolution not revolution. New languages should consolidate, not invent features.
2. Waiting for Good design. No is temporary, Yes is forever
3. Consensus driven design. As simple as possible, but no simpler.
	1. No header files
	2. No classes
	3. No inheritance
	4. No constructors
	5. No pointer arithmetic
	6. No uninitialized values
	7. No annotations
	8. No templates
	9. No exceptions
	10. No globals
	11. No `void`
4. Rapid Iteration. Expect & enable massive changes

## Team Growth: Ian and Russ
Team spent over a year of refining, adding a single feature at a time.

## 5 Years of Refinement
2007 - Birth as a 20% project at Google
2009 - Open sourced
2012 - Go 1.0 released, and team focuses on using it.

## What Is Go?
Survey results: 
- Concurrent
- Simple
- Powerful
- Fast
- Expressive
- Readable
- Type safe
- Compiled very quickly

Worldwide Users are 1.5m to 2m (2018)

## 3 Features of Go

### 1. Go’s Approach to OOP
- Design decisions must be made too early in such languages, causing brittleness

> It is my option that **object oriented programming, as delivered by Java**, etc, **is not a good default way** to structure your program  
>   Rich Hickey, 2012, “Clojure for Java Programmers”  

- OO Existed long before C++ and Java: **Simula**

> Simula changed from the procedural view,  […] they flipped it around to […]  the object-oriented one which is that **within every type of object you have all the procedures that work on it.**  
>   Dan Ingalls, 1989 - Object Oriented Programming  

> I did make up this term [object oriented] and it was a bad choice, because  
> it **under-emphasized the more important idea of message sending**  
>   Alan Kay, 2010, “A to Z of programming languages: Smalltalk-80”  

- Smalltalk OO is about message sending
- Go’s OO is pattern’d after Smalltalk’s
	- Methods (on any type)
		- ::They provide message sending mechanisms on any type::
	- Interfaces
		-::They provide reusability through dynamic dispatch polymorphism::
		- the mechanism to handle dynamic dispatch
		- they are implicit, not explicit

```
// interfaces tend end in "-er" based on their needs
type Stringer interface {
    String() string
}

func Print(s Stringer) {
    fmt.Println(s.String())
}
```

> When you try to break a complex problem down you want to try to break it down int as **few parts as you can** and you want them to **be as independent as they can be**.   
>   Dan Ingalls, OOP - 1989  

### 2. Concurreny

> Concurrency is not parallelism… Concurrency is about **dealing with** lots of things at once. Parallelism is about **doing** lots of things at once.  
>   Rob Pike, _Concurrency is not Parallelism_, 2013  

> **The world is parallel. If we want to write programs that behave as other objects in the real world, then these programs will have a **concurrent structure**  
>   Joe Armstrong, _Programming Erlang_, 2017  

> We should have some ways of coupling programs like garden hose — screw in another segment when it becomes necessary to massage data in another way.  
>   Dennis McElroy, _Unix Pipes_, 1964  

#### Tony Hoare
From _CSP_  in 1978
- Processes: unit of execution
- Sequential: each runs as an ordinary single-thread program
- Communication: how processes coordinate
- No sharing of memory
- No threads or mutexes

**Prime Sieve ~200 BC**:  Simple algorithm from greek history to find prime numbers, but with concurrency. Was redone using CSP ideas.

CSP directly influenced Occam (1983), Erlang (1986), and Go (2009).

Fun Fact: the **Limbo language** (1990’s) was GC’d and it was wonderful, making it evident that yes, you could write a systems-level language that had GC.

**Goroutines & Channels**

> I Like the programming model of Go. **Using goroutines is so easy and fun…** if you’re building a server, I can’t imagine using anything other than Go.  
>   Ryan Dahl, _Interview with Ryan Dahl, Creator of Node.js_, 2017  

```
func Generate(ch chan<- int) {
	for i := 2; ; i++ {
		ch <- i
	}
}

func Filter(src <-chan int, dst chan<- int, prime int) {
	for i : range src {
		if i%prime != 0 {
			dst <- i
		}
	}
}

func main() {
	src := make(chan int)
	go Generate(src)
	for i := 0; i < 100; i++ { // find all primes, make infinte for more primes!
		prime := <-src
		println(prime)
		dst := make(chan int)
		go Filter(src, dst, prime)
		src = dst
	}
}
```

#### 3. `go fmt` & `go fix`

`go fmt`

- Parses Go source into syntax trees
- Prints syntax trees back into source code
- Uses the sodlib support for these actions
- Ended all style debates before they even happened

Loses the “fingerprints” you might see in code, and was planned from the very beginning

> Once you have `gofmt`, it becomes very easy to **insert mechanical processing between parsing and printing**. So we have all the **hard parts of a program manipulation tool** just sitting, waiting to be used  
>   Russ Cox, Maling List, 2009  

`go fix`

- Rewrite programs that use old APIs to use newer ones
- Much more intelligent than regex rewriting
- Allows API changes to be shipped along with code changes

> The recent reflect changes would have been **unpalatable without automated conversion**,  and the reflect API badly needed to be redone. **Gofix gives us the ability to fix mistakes or completely rethink package APIs without worrying about the cost of converting existing code**.  
>   Russ Cox, _Introducing Gofix_, 2011  

## The Future of Go: Go 2
2017 - Go 2 begins with attention shifting to **making language changes again**

- A series of releases starting with Go 1.11 in August 2018
- Might just be Go 1.x for increasing x.

Go continues to be designed using **a collaborative approach**.

[Go Language Proposals](https://github.com/golang/proposal)

## Dependency Management
- `go get` is basic dependency management

**Pros:**
	- No config outside of the source code
	- Very easy to use
	- URL-like import paths
		- Eliminated central hub
	- Worked very well in practice
	- No diamond dependency problems
**Cons:**
- Only update operation was “everything lol”
- No version understanding
- No backward-breaking change
- Unreproducible builds

::Semver for `go get`::

> If an **old package** and a **new package** have the **same import path**, the package **must be backwards compatible**  with the old package.  
>   Russ Cox, 2018, “Import Compatibility Rule”  

```
import "github.com/spf13/cobra/v2"

---
$ go build // gets all your dependencies
```

- Modules (Not packages or repos)
- Minimum version selection
- Reproducible, verifiable, verified builds
- Integrated into the standard go
- Same user workflow

Go 1.11 in August, 2018

## Generics
Discussed from the very earliest days.

> When in doubt, leave it doubt.  
>   Joshua Bloch, 2002  

-> Waiting for good design <-

## The Legacy of Go

> If I have seen further, it is by standing on the shoulder of giants  
>   Isaac Newton  

> Bernard of Chartres used to compare us to **dwarfs perched on the shoulders of giants.** He pointed out that we see more than our predecessors, not because we have keener vision or greater height, but because **we are lifted up** and borne aloft on their gigantic stature.  
>   John of Salisbury, 1159  

> History is who we are and why we are the way we are  
>   David McCullough, 2012  



#go talks/2018/amsterdam##csp# #people/tony hoare##people/steve francia#