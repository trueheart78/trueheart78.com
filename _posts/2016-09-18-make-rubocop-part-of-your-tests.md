---
layout: post
title:  "Make Rubocop Part of Your Tests"
date:   2016-09-18 05:00:00
categories: ruby
---

[Rubocop](http://batsov.com/rubocop/) is a static code analyzer, and can be a
wonderful tool to help you keep your style consistent either across multiple
developers, or just across a project that you work on by yourself.

This will show you how you can make it part of your specs, so you don't forget
to run it, and neither does your continuous integration tool (if applicable).

## Gemfile

First, add the following to your `Gemfile`, making sure to _not_require the
Rubocop library by default in Rails:

```ruby
group :development, :test do
  gem 'rubocop', require: false
end
```

## Minitest

If you are using Minitest, this is where I put my test (put yours where it makes
the most sense to you).

In `test/linters/rubocop_test.rb`:

```ruby
require 'test_helper'

class RubocopTest < Minitest::Test
  def subject
    `rubocop`
  end

  def test_no_offenses_found
    assert_match(/no\ offenses\ detected/, subject)
  end
end
```

## RSpec

If you are using RSpec, this is where I put my test (again, put yours where it
makes the most sense to you).

In `spec/linters/rubocop_spec.rb`:

```ruby
require 'spec_helper'

describe 'Rubocop Analysis' do
  let(:report) { `rubocop` }

  it 'Has no offenses' do
    expect(report).to match(/no\ offenses\ detected/)
  end
end
```

## Rubocop Settings

Now, you'll likely notice that Rubocop can be a bit of a style... cop. To
override any of the default settings, you'll need to make sure to create a
`.rubocop.yml` file, at the root of your project.

### Minitest

To override the default Rubocop settings for Minitest, use something like the
this:

In `.rubocop.yml`:

```yaml
Rails:
  Enabled: true

Documentation:
  Enabled: false

# skips style of child classes and modules.
Style/ClassAndModuleChildren:
  Enabled: false

AllCops:
  Exclude:
    - 'Guardfile'
    - 'bin/*'
    - 'db/**/*'
    - 'config/**/*'
    - 'vendor/**/*'
    - 'test/test_helper\.rb'
```

### RSpec

To override the default Rubocop settings for RSpec, use something like the
following:

```yaml
Rails:
  Enabled: true

Documentation:
  Enabled: false

# skips style of child classes and modules.
Style/ClassAndModuleChildren:
  Enabled: false

RSpec/DescribeClass:
  Exclude:
    - 'spec/features/*'
    - 'spec/views/**/*'
    - 'spec/lint/rubocop_spec\.rb'

AllCops:
  Exclude:
    - 'Guardfile'
    - 'bin/*'
    - 'db/**/*'
    - 'config/**/*'
    - 'vendor/**/*'
    - 'spec/rails_helper\.rb'
    - 'spec/spec_helper\.rb'
```
