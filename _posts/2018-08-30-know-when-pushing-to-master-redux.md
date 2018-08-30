---
layout: post
title: Know When Pushing to Master Redux
date: 2018-08-30 09:50:41
tags:
- git
- branches
- shell script
- bash
- zsh
- work
- personal
---

I previously blogged about a way how to [Know When Pushing to Master][know when pushing to master].
It was amazingly helpful, but I wanted it to work with stock `git` commands, not just custom aliases
I would define for myself. I wanted it to work with _any_ potential alias.

And it does.

I decided to create a new shell function, `git()`, that will be called instead of `git` (_Note: this
does not require uninstalling git, or any other change to it_). I then hand that off to my shorthand
function, `g()`, which performs some parsing to detect which branch you are pushing to (_if you are
pushing_).

The first version would check to see if any extra arguments were passed, and if so, it would check
to see if `push` was the primary one, and then it would check the current branch for `master`, so it
could prompt you for confirmation (if required). If it was not `push`, it would execute whichever
git-based command you had typed. If only `git()` or `g()` was called, without commands, it would
execute `git status`.

```sh
# remap git to point to g()
git () {
  g "$@"
}

# git super command
# make sure with zsh that the git plugin is not used
# as it will override this command
g () {
  if [[ $# -gt 0 ]]
    then
      if [[ $1 = "push" ]]; then
        branch=`command git rev-parse --abbrev-ref HEAD`
        if [[ $branch = 'master' ]]; then
          while true; do
            echo -n "Push to 🔥  Master 🔥 ? (y/n) "
            read yn
            case $yn in
              [Yy]* ) command git "$@"; break;;
              [Nn]* ) echo "❤️  Push-to-Master crisis averted ❤️"; break;;
              * ) echo "Please answer yes or no.";;
            esac
          done
        else
          if [[ $# -eq 1 ]]; then
            command git push origin $branch
          else
            command git "$@"
          fi
        fi
      else
        command git "$@"
      fi
    else
      command git status
  fi
}
```

As you can see, not only does this work quite well, it also lends itself to being extended. Since I
tend to create personal projects while also at work, it does matter to me whether my personal vs work
email is used for new repositories. That's when I created this bit of code to ask me exactly what I
want. If you'd like it to always ask you, then simply remove the _Darwin_ check.

```sh
# if on a macOS system and creating a new repository
if [[ `uname` = 'Darwin' && $1 = "init" ]]; then
  command git "$@"
  # prompt for the username and email to use
  while true; do
    echo -n "Will this be a ⚠️  work-related ⚠️  repo? (y/n) "
    read yn
    case $yn in
      [Yy]* ) git_work; break;;
      [Nn]* ) git_personal; break;;
      * ) echo "Please answer yes or no.";;
    esac
  done
fi
```

It also included the creation of the following functions to force the new repo to be configured
properly. 

```sh
# git local repo user
git_personal () {
  command git config user.name "I 💖 Ruby"
  command git config user.email "iheartruby@home-email.com"
}

# git work repo user
git_work () {
  command git config user.name "I Work with Ruby"
  command git config user.email "iheartruby@work-email.com"
}
```

In the end, I wound up combining them into a nice little family of functions. The only issue I ran
into was having the `git` plugin enabled when using `zsh`. Disabling that made all the problems go
away.

The final version that has been working for me now for quite some time is as follows. 

```sh
# remap git to point to g()
git () {
  g "$@"
}

# git super command
# make sure with zsh that the git plugin is not used
# as it will override this command
g () {
  if [[ $# -gt 0 ]]
    then
      # if on a macOS system and creating a new repository
      if [[ `uname` = 'Darwin' && $1 = "init" ]]; then
        command git "$@"
        # prompt for the username and email to use
        while true; do
          echo -n "Will this be a ⚠️  work-related ⚠️  repo? (y/n) "
          read yn
          case $yn in
            [Yy]* ) git_work; break;;
            [Nn]* ) git_personal; break;;
            * ) echo "Please answer yes or no.";;
          esac
        done
      elif [[ $1 = "push" ]]; then
        branch=`command git rev-parse --abbrev-ref HEAD`
        if [[ $branch = 'master' ]]; then
          while true; do
            echo -n "Push to 🔥  Master 🔥 ? (y/n) "
            read yn
            case $yn in
              [Yy]* ) command git "$@"; break;;
              [Nn]* ) echo "❤️  Push-to-Master crisis averted ❤️"; break;;
              * ) echo "Please answer yes or no.";;
            esac
          done
        else
          if [[ $# -eq 1 ]]; then
            command git push origin $branch
          else
            command git "$@"
          fi
        fi
      else
        command git "$@"
      fi
    else
      command git status
  fi
}

# git local repo user
git_personal () {
  command git config user.name "I 💖 Ruby"
  command git config user.email "iheartruby@home-email.com"
}

# git work repo user
git_work () {
  command git config user.name "I Work with Ruby"
  command git config user.email "iheartruby@work-email.com"
}
```

Feel free to use this everywhere and anywhere it helps you.

[know when pushing to master]: /ruby/2017/03/15/know-when-pushing-to-master.html
