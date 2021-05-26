# Concurrency Made Easy by Dave Cheney
[Concurrency made easy - GopherCon SG 2017 - YouTube](https://www.youtube.com/watch?v=yKQOunhhf4A)

* Concurrency isn’t always the right answer. Consider a listener for an http handler. 
* Coroutines are often overused, especially when starting out.

> If you have to wait for the result of an op, it’s easier to do it yourself  
> - 5m49s  

```
sem := make(chan int, 4) // four jobs at once
var wg sync.WaitGroup
wg.Add(len(repos))
for _, repo := range repos {
	sem <- 1
	go func() {
		defer wg.Done() // note: I 💖 this
		// check for errors
		<- sem
	}()
}
wg.Wait()
```

> Always release locks and semaphores in the reverse order you acquired or defined them.  

> Channels aren’t resources like files or sockets, you don’t need to close them to free them up  

A **semaphore** is basically an access control.

> In computer science, a semaphore is a variable or abstract data type used to control access to a common resource by multiple processes in a concurrent system such as a multitasking operating system.  


```
for _, repo := range repos {
	go func() {
		sem <- 1 // moved from outside of the routine to inside
		defer wg.Done() 
		// check for errors
		<- sem
	}()
}
```

> Acquire semaphores when you’re ready to use it, not when you _expect_ to  
> use it  

### Data Race

```
for _, repo := range repos {
	go func() {
		sem <- 1
		defer wg.Done() 
		if err := fetch(repos); err != nil { // repos or i need passed in, otherwise they will reference a changing value
			errChan <- err
		}
		<- sem
	}()
}
```

> Avoid mixing anonymous functions and goroutines  

```
for _, repo := range repos {
	go func(repo string) {
		sem <- 1
		defer wg.Done() 
		if err := fetch(repo); err != nil { // repos or i need passed in, otherwise they will reference a changing value
			errChan <- err
		}
		<- sem
	}(repos[i])  // pass it in here, don't close over it
}
```

### Deadlock

```
for _, repo := range repos {
	go func(repo string) {
		sem <- 1
		defer wg.Done() 
		if err := fetch(repo); err != nil {
			errChan <- err  // causes a deadlock if not set to hold enough potential elements. Consider the entire set of goroutines erroring at the same time
		}
		<- sem
	}(repos[i])
}
```

> Before you start a goroutine, always know when, and how, it will stop.  

```
func worker(repo string, sem chan int, wg *sync.WorkGroup, errChan chan err) {
	defer wg.Done()
	sem <- 1
	if err := fetch(repo); err != nil {
		select {
		case errChan <- err
			// we're the first worker to fail
		default:
			// some other failure happened
		}
	}
	<- sem
}
```

> A concurrent system is not necessarily simple system, but it can be an easy system  

#go talks/2017/gophercon signapore# #golang #concurrency #people/dave cheney#