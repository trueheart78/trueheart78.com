---
layout: post
title:  "Rubocop for Changes"
date:   2017-05-09 12:00:00
categories: ruby
---

One of the biggest problems of adopting Rubocop into existing projects is the
onboarding of other developers, in a graceful manner.

Previously, I posted about using [Rubocop for tests][rubocop-for-tests]. While
that's all good and fine, being responsible for style issues outside of the
files you've changed can cause a fair amount of friction and/or anger.

The following class is something that could be adapted to work within specs to
better validate changes.

```ruby
class RuboCopper
  def analyze
    system 'rubocop', '--display-cop-names', *files
  end

  def autofix
    system 'rubocop', '--auto-correct', '--display-cop-names', *files
  end

  def valid?
    `rubocop #{files.join(' ')}`.include? 'no offenses detected'
  end

  private

  def files
    @files ||= (changed_files + untracked_files + staged_files)
               .split("\n")
               .uniq
               .select { |f| ruby_file?(f) && File.exist?(f) }
  end

  def changed_files
    @changed_files ||= `git diff --name-only master #{branch}`
  end

  def untracked_files
    @untracked_files ||= `git ls-files . --exclude-standard --others`
  end

  def staged_files
    @staged_files ||= `git diff --name-only --cached`
  end

  def ruby_file?(file)
    file[-3..(file.length)] == '.rb'
  end

  def branch
    @branch ||= `git rev-parse --abbrev-ref HEAD`.chomp
  end
end
```

You can then inspect the current branch with all relevant Ruby files being
analyzed by Rubocop.

```ruby
puts RuboCopper.new.valid? ? 'Looks Good' : 'Ugggggghhhh'
```

[rubocop-for-tests]: 2016-09-18-make-rubocop-part-of-your-tests.md
