---
layout: post
title: Make Vim Format JSON For You
date: 2018-01-22 11:29:28
tags:
- vim
- json
- ruby
---

## Badly Formatted?

I will sometimes capture the JSON-based response body from another application to use as a fixture,
but will end up with the standard one-liner file that is visually difficult to parse.

## Surely Something Already Exists?

I looked around on the web and found a [Python-based implementation][python], but it was padding
with too many spaces and I had no insight into what it was actually doing. I spent a bit of time
trying to see if I could make it conform to my needs, and shortly thereafter, decided to write
it in Ruby.

## Implementing A Custom Solution

The solution was quite simple once I knew how to pass in the current Vim file content (read: the buffer),
how to access said content in Ruby, properly formatting it, and sending it back to Vim.

The basic Vim command I ended up with is

```
%!ruby -r json -e 'content = ARGF.read; object = JSON.parse(content); json = JSON.pretty_generate(object); puts json'
```

## The Command Portion

```
%!ruby -r json -e
```

1. `%` grabs the current file content / buffer
1. `!ruby` calls Ruby
1. `-r json` tells Ruby to require the `json` library
1. `-e` tells Ruby to execute the code that follows

## The Code Portion

```ruby
# ARGF.read reads the content that Vim sent over
content = ARGF.read

# the content is still in JSON format, and it needs to be in object format
object = JSON.parse(content)

# the object then needs to be converted to "pretty" JSON
json = JSON.pretty_generate(object)

# outputting the "pretty" JSON sends it back to Vim
puts json
```

I actually ended up compressing the code to the following:

```
puts JSON.pretty_generate(JSON.parse(ARGF.read))
```

## In Action

![gif][gif]

## Vim Commands

To make sure Vim always has this available, I bound it to a leader-based command in my `.vimrc`

```vim
nmap <leader>json :%!ruby -r json -e 'puts JSON.pretty_generate(JSON.parse(ARGF.read))'<CR>
vmap <leader>json :%!ruby -r json -e 'puts JSON.pretty_generate(JSON.parse(ARGF.read))'<CR>
imap <leader>json :%!ruby -r json -e 'puts JSON.pretty_generate(JSON.parse(ARGF.read))'<CR>
```

Now, with just a couple keystrokes, formatting JSON is as simple as I hoped it could be.

[python]: http://blog.realnitro.be/2010/12/20/format-json-in-vim-using-pythons-jsontool-module/
[gif]: /assets/images/vim/vim%20ruby%20json%20converter.gif
