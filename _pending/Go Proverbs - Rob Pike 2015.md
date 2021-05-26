# Go Proverbs - Rob Pike, 2015
[Go Proverbs - Rob Pike - Gopherfest - November 18, 2015 - YouTube](https://www.youtube.com/watch?v=PAAkCSZUG1c)

- Don’t communicate by sharing memory, share memory by communicating.
- Concurrency is not parallelism
- Channels orchestrate; mutexes serialize.
- The bigger the interface, the weaker the abstraction
- Make the zero value useful
- `Interface{}` says nothing
	- Think very hard about if that’s what you really want. And yes, sometimes it is needed
- `gofmt` is nobody’s favorite, yet is everybody’s favorite.
- A little copying is better than a little dependency.
- Syscall must always be guarded with build tags.
- Cgo must always be guarded with build tags.
- Cgo is not Go.
- With the `unsafe` package there are no guarantees.
- Clear is better than clever.
- Reflection is never clear.
- Errors are values.
- Don’t just check errors, handle them gracefully.
	- Should you be doing something with that error?
- Design the architecture, name the components, document the details.
- Documentation is for users.
	- What is the documented function for, not what it does?
- 


#go talks/2015/gopherfest##people/rob pike#