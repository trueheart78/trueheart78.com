---
layout: post
title:  "Brakeman Support on CircleCI"
date:   2016-04-22 21:30:00
categories: ruby
---
*Updated on May 13th with Jenkins support*

[CircleCI] is something I was excited to get working with, and with good reason,
as it has been wonderful for my projects. No cost continous integration is
rediculous, especially when it works as well as their service does.

CI can only help you so much, and so I wanted to get the [Brakeman] gem to
fail my build whenever a security vulnerability that I am not aware of is
discovered. Brakeman doesn't just scan your `Gemfile.lock` and find out if
it has issues, it also looks for potential issues in the code you may have
written.

It did take a bit of research, but I found a solid way to get it implemented
without adding it to the gemfile. You don't want outdated vulnerability checking,
and so locking yourself into a version isn't the best idea.

First, I followed this [great walkthrough by Nebojša Stričević][SetupGuide]
and created a `script/brakeman` shell script (and I had to `mkdir script` first):

```sh
#!/bin/bash
#
# Script for running Brakeman tests
# Brakeman is a security scanner https://github.com/presidentbeef/brakeman.

gem install --no-rdoc --no-ri brakeman
brakeman --exit-on-warn .
```

I then made sure it was executable by running `chmod +x script/brakeman`.

Then I just had to make the CI run it, so with some guidance from [this post on the CircleCI discourse][InstallRun],
I added the following to my `circle.yml` file:

```YAML
test:
  post:
    - case $CIRCLE_NODE_INDEX in 0) ./script/brakeman ;; esac:
           parallel: true
```

This makes sure that the CI only executes our script on the first node, so if
we are running tests in parallel, we don't have to worry about other nodes running
it. This will also fail the build if the Brakeman scan finds any vulnerabilites.

I then committed both these files to my repo, and pushed them up so CI would
test them out. I was very happy to see the first node run the Brakeman script
from the CI console.

I hope that helps anyone else who was looking for a simple way to make scanning
your code and related libraries for vulnerabilities just a little bit more
visible.

## But I'm Using Jenkins

You can still make this happen using Bundler, even if you don't have permissions
to install gems at the system level.

First, make sure the following is in your `Gemfile`:

```ruby
group :development, :test do
  gem 'brakeman', require: false
end
```

Next you need to create the `script/brakeman` file, and put in the following:

```sh
#!/bin/bash
#
# Script for running Brakeman tests
# Brakeman is a security scanner https://github.com/presidentbeef/brakeman.

echo 'Retrieving latest version of Brakeman gem.'
bundle update brakeman --quiet
bundle exec brakeman -o brakeman-output.tabs --no-progress --separate-models --exit-on-warn
```

Then make sure it is executable by running `chmod +x script/brakeman`.

Finally, add a `script/brakeman` command in your `script/cibuild` file, before
any `bundle exec` commands:

```sh
.
.
.
script/brakeman

RAILS_ENV=test bundle exec rspec
.
.
.
```

Committing these changes should help you get Brakeman updated on each CI build,
and cause a build failure if there are any warnings found.

[CircleCI]: https://circleci.com 
[CaringForKarenSue.com]: http://www.caringforkarensue.com
[Brakeman]: https://github.com/presidentbeef/brakeman
[SetupGuide]: https://semaphoreci.com/community/tutorials/automatic-security-testing-of-rails-applications-using-brakeman/
[InstallRun]: https://discuss.circleci.com/t/test-failures-tab-reports-false-0-failures-for-cucumber/1306/3
