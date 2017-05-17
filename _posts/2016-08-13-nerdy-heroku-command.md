---
layout: post
title:  "Nerdy Heroku Command for Deploys"
date:   2016-08-13 08:30:00
categories: ruby
---

Unless you have automated deployment setup for Heroku from your CI server,
you likely have to manually deploy it. And considering that we use computers
to make our lives easier by offloading commands from our brain, offloading
a deployment command seems simple enough.

## Manual Command

To deploy the current local branch to the Heroku remote, you need to run this
command, putting in the details yourself:

```sh
git push remote local-branch:master
```

## Automated Function

The following defines a `git-deploy` method that requires only the name of
the remote to push to:

```sh
git-deploy () {
  if [[ -n "$1" ]] ; then
    current_branch="$(git rev-parse --abbrev-ref HEAD | xargs echo -n)"
    echo "Deploying '$current_branch' to $1:master"
    git push -f $1 $current_branch:master
  else
    echo "Error: No remote specified"
  fi
}
```

Define a few aliases and you should be able to have a simple-to-remember
command, that ought to be picked up by the auto-completion in your shell.

```sh
alias deploy-heroku="git-deploy heroku"
```

Then you can just run `deploy-heroku` in your terminal, and watch the
magic.
