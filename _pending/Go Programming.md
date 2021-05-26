# Go Programming
Go is Different
- it’s more unusual than you might first think
- Programming in Go is different from programming in most procedural languages
- Start thinking like a Go programmer

## Go Is and Is Not
- Go is object-oriented not type-oriented
	- Inheritance is not primary
	- Methods on any type, but no classes or subclasses
- Go is (mostly) implicit not explicit
	- Types are inferred not declared
	- Objects have interfaces but they are derived, not specified
- Go is concurrent not parallel
	- Intended for program structure, not maximum performance
	- Can still keep all the core humming nicely
	- Some programs are nicer even if not parallel at all
	
## Objects But No Hierarchy
The most important design decisions don’t have to be made first, and it’s easy to change types as the program develops because the compiler infers their relationship automatically.

Go programs are more flexible and dynamic

## No Inheritance
Define an interface for the compressor and define the method.

_This is good Go style_

## Interfaces are Lightweight
- A typical Go interfaces has only one or two methods
	- The most common has zero.
- Programmers new to Go see interfaces as a building block for type hierarchies and tend to create interfaces with many methods
- Don’t think about them like that, as that’s the wrong way. Instead, think about how they are:
	- small
	- nimble
	- often ad hot

## Common Interfaces
- `io.Reader`, `io.Writer`
- It’s vital that such interfaces do not need retrofitting.

## Concurrency for Structure
### Concurrent Programs
Java programmers use class hierarchies to structure their programs, while Go’s concurrency primitives provide the elements of another approach.

It’s not about parallelism. Concurrency allows for that, but that’s not what it’s really for. It’s about expressing program structure to represent independently executing actions.

You can write something that doesn’t use mutexes.
You can use channels to be part of other data structures and can be passed between goroutines.

## Go is Different
- Objects are not always classes
	- inheritance rarely comes up
- You don’t need to spec everything in advance
	- and you shouldn’t need to
	- Implicitly satisfying behavior leads to pleasant surprises
- Concurrency is not parallelism
	- It’s about structuring software

## Go is More Productive
- Any type can be given methods
- Most of the bookkeeping of type-driven programming is done automatically
- The structuring of concurrent programming leads to  easily to correct, scalable server software

## Go is more Fun



#go talks/2010/google io# #people/rob pike# #people/russ cox#