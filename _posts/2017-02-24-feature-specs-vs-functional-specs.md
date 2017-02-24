---
layout: post
title:  "Feature Specs vs. Functional Specs"
date:   2017-02-24 12:15:00
categories: ruby
---

I've come across projects where specs that can run self-contained don't exist.
They require the environment to be setup (like third-party APIs), and make
development more difficult for new maintainers. These are **Functional
Specs**, and they are meant to test out the application in a final state of
polish (at least in my experience).

However, functional specs are not nearly as useful as **Feature Specs**. To be 
able to be able to run specs against a perfectly recreated environment is where
feature specs shine. Yes, they are more complex to write than functional specs,
but their value is in being able to run them _exactly how you want_. Whether it
be with a specially crafted database record or a third-party API.

Feature specs allow you handle concerns like:

+ How should the application work in the browser?
+ Are there JavaScript issues?
+ What should happen when a third-party API is having issues?
+ What should the user see when there are problems?

Sure, there are many more areas that can be covered, but basically, being able
to mock third-party API interactions and create database records to meet your
needs, is invaluable.

If you can write a functional spec for it, you can write a feature spec for it.
Yes, it takes more effort, but future maintainers (including yourself) will be
thankful you did.
