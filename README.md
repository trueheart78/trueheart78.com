# Pre-Commit Hooks

Automatically updates the `updated` date stored in the YAML headers, if it exists.

```sh
#!/bin/sh
# Contents of .git/hooks/pre-commit

git diff --cached --name-status | grep "^M" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^update:.*$/update: $(date -u "+%Y-%m-%d")/" > tmp
  mv tmp $b
  git add $b
done
```

## Quotes
"my strategy is before the red test when I know what change approximately I want to make, I’m going to go refactor the code while it’s still green under the previous test, refactor the code to make the change I want to make really easy. It’s like I want to go 100 miles east but instead of just traipsing through the woods, I’m going to drive 20 miles north to the highway and then I’m going to go 100 miles east at three times the speed I could have if I just went straight there. When people are pushing you to just go straight there, sometimes you need to say, “Wait, I need to check the map and find the quickest route.” The preparatory refactoring does that for me. And plus, it puts the refactoring at the beginning so it’s sure to get done."  
[Jessica Kerr on Refactoring][kerr-refactor]


[kerr-refactor]: http://devchat.tv/ruby-rogues/178-rr-book-club-refactoring-ruby-with-martin-fowler
