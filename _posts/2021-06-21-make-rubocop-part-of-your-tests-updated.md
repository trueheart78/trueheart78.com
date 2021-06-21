---
layout: post
title: Make RuboCop Part of Your Tests (Updated)
description: RuboCop shouldn't be last picked at kickball. Make it part of your tests so you don't have to remember to run it separately.
date: 2021-06-21 14:14:22
tags:
- ruby
- rubocop
- tests
- specs
- rspec
- minitest
- ci
- continuous integration
---

**Note:** This is an update to the previous [Make RuboCop Part of Your Tests][original post] post.

[RuboCop][rubocop] is a static code analyzer, and can be a
wonderful tool to help you keep your style consistent either across multiple
developers, or just across a project that you work on by yourself.

This will show you how you can make it part of your specs, so you don't forget
to run it, and neither does your continuous integration tool (if applicable).

## Gemfile

First, add the following to your `Gemfile`, making sure to _not_ require the
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

class RuboCopTest < Minitest::Test
  def subject
    `rubocop --config .rubocop.yml`
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

RSpec.describe 'rubocop analysis' do
  subject(:report) { `rubocop --config .rubocop.yml` }

  it 'has no offenses' do
    expect(report).to match(/no\ offenses\ detected/)
  end
end
```

## RuboCop Settings

Now, you'll likely notice that RuboCop can be a bit of a style... cop. To
override any of the default settings, you'll need to make sure to create a
`.rubocop.yml` file, at the root of your project.

### Continuous Integration

CI itself may cause issues when using RuboCop, as the `vendor/` directory is
generally not committed, but that doesn't mean that it won't be scanned unless
told otherwise.

This will help with that.

```yaml
AllCops:
  Exclude:
    - 'vendor/**/*'
```

### Minitest

To override the default RuboCop settings for Minitest, use something like the
this:

In `.rubocop.yml`:

```yaml
AllCops:
  Exclude:
    - 'Guardfile'
    - 'bin/*'
    - 'db/**/*'
    - 'config/**/*'
    - 'vendor/**/*'
    - 'test/test_helper\.rb'

Documentation:
  Enabled: false

# skips style of child classes and modules.
Style/ClassAndModuleChildren:
  Enabled: false
```

### RSpec

To override the default RuboCop settings for RSpec, use something like the
following:

```yaml
AllCops:
  Exclude:
    - 'Guardfile'
    - 'bin/*'
    - 'db/**/*'
    - 'config/**/*'
    - 'vendor/**/*'
    - 'spec/rails_helper\.rb'
    - 'spec/spec_helper\.rb'

RSpec/DescribeClass:
  Exclude:
    - 'spec/features/*'
    - 'spec/views/**/*'
    - 'spec/lint/rubocop_spec\.rb'

Documentation:
  Enabled: false

# skips style of child classes and modules.
Style/ClassAndModuleChildren:
  Enabled: false

Metrics/BlockLength:
  ExcludedMethods: ['describe', 'context', 'shared_examples']
```

[rubocop]: https://www.rubocop.org/
[original post]: /ruby/2016/09/18/make-rubocop-part-of-your-tests.html
