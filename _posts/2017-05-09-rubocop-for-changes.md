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
class RubocopHelper
  OutOfSyncError = Class.new StandardError

  def analyze
    validate!
    return branch_clean if clean?
    system 'rubocop', '--display-cop-names', *files
  end

  def autofix
    validate!
    return branch_clean if clean?
    system 'rubocop', '--auto-correct', '--display-cop-names', *files
  end

  def valid?
    validate!
    return true if clean?
    `rubocop #{files.join(' ')}`.include? 'no offenses detected'
  end

  def remote_master
    "#{remote}/master"
  end

  def project_current?
    up_to_date_branches.include? branch
  end

  private

  def clean?
    files.empty?
  end

  def branch_clean
    puts 'Branch has no files to analyze and is considered clean'
  end

  def validate!
    raise OutOfSyncError, error_message unless project_current?
  end

  def error_message
    "Please merge in #{remote_master}"
  end

  def files
    @files ||= (changed_files + untracked_files + staged_files + unstaged_files)
               .split("\n")
               .uniq
               .select { |f| ruby_file?(f) && File.exist?(f) }
  end

  def changed_files
    @changed_files ||= `git diff --name-only #{branch} #{remote_master}`
  end

  def untracked_files
    @untracked_files ||= `git ls-files . --exclude-standard --others`
  end

  def staged_files
    @staged_files ||= `git diff --name-only --cached`
  end

  def unstaged_files
    @unstaged_files ||= `git diff --name-only`
  end

  def ruby_file?(file)
    file[-3..(file.length)] == '.rb'
  end

  def branch
    @branch ||= `git rev-parse --abbrev-ref HEAD`.chomp
  end

  def remote
    @remote ||= `git remote`.chomp
  end

  def master_hash
    `git rev-parse --short #{remote_master}`
  end

  def up_to_date_branches
    `git branch --contains #{master_hash}`
      .split("\n")
      .map { |b| b.delete '*' }
      .map(&:lstrip)
  end
end
```

You can then inspect the current branch with all relevant Ruby files being
analyzed by Rubocop.

```ruby
puts RuboCopper.new.valid? ? 'Looks Good' : 'Ugggggghhhh'
```

[rubocop-for-tests]: 2016-09-18-make-rubocop-part-of-your-tests.md
