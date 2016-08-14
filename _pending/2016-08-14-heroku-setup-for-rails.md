---
layout: post
title:  "Heroku Setup for Rails 4 and Rails 5"
date:   2016-08-14 08:30:00
categories: ruby
---

1. <a href='#1-getting-started'>Getting Started</a>
2. <a href='#2-application-setup'>Application Setup</a>
   1. <a href='#2-1-gem-setup'>Gem Setup</a>
   2. <a href='#2-2-postgresql-gem-support'>Postgresql Gem Support</a>
   3. <a href='#2-3-database-configuration'>Database Configuration</a>
      1. <a href='#2-3-1-with-postgresql-in-all-environments'>With Postgresql in All Environments</a>
      2. <a href='#2-3-2-with-postgresql-in-production-only'>With Postgresql in Production Only</a>
   4. <a href='#2-4-initialize-your-database'>Initialize Your Database</a>
   5. <a href='#2-5-puma-web-server-configuration'>Puma Web Server Configuration</a>
   6. <a href='#2-6-verify-your-tests-still-pass'>Verify Your Tests Still Pass</a>
3. <a href='#3-heroku-setup'>Heroku Setup</a>
   1. <a href='#3-1-creating-the-heroku-application'>Creating The Heroku Application</a>
   2. <a href='#3-2-environment-variables'>Environment Variables</a>
      1. <a href='#3-2-1-an-aside-dotenv-rails'>An Aside: Dotenv-Rails</a>
   3. <a href='#3-3-deploying-to-heroku'>Deploying To Heroku</a>
      1. <a href='#3-3-1-advanced'>Advanced</a>
   4. <a href='#3-4-view-your-application-online'>View Your Application Online</a>
4. <a href='#4-change-bundler-back'>Change Bundler Back</a>
5. <a href='#5-bonus-heroku-add-ons-worth-using'>Bonus Heroku Add-Ons Worth Using</a>
   1. <a href='#5-1-papertrail'>Papertrail</a>
      1. <a href='#5-1-1-create-full-command'>Full Create Command</a>
6. <a href='#6-resources'>Resources</a>



Deploying to Heroku is supposed to be easy, and compared to putting together
and managing your own server, it is definitely less complicated, but it is
complicated. So, I figured I would put together a post when I set it up for
a new application, Running on Rails 5. I have already done this for an app I
upgraded from Rails 4 to Rails 5.

<a name='1-getting-started'></a>

## 1. Getting Started

If you already have a Rails app built, switch into that directory.
If not, then come back when you are ready.

<a name='2-application-setup'></a>

## 2. Application Setup

First, create a new branch. From the root directory of your app, type:

```sh
git checkout -b heroku-deployment
```

<a name='2-1-gem-setup'></a>

### 2.1. Gem Setup

We need to make sure that the `pg`, `puma`, and `rails_12factor` gems are
loaded in the right places in our Gemfile.

If you are using Postgresql only in production, use this: 

```ruby
gem 'puma'

group :production do
  gem 'rails_12factor'
  gem 'pg'
end
```

If you aren't using Postgresql in production, use the following:

```ruby
gem 'puma'

group :production do
  gem 'rails_12factor'
end
```

<a name='2-2-postgresql-gem-support'></a>

#### 2.2. Postgresql Gem Support

If you are on Ubuntu, make sure that you have Postgresql installed:

```sh
sudo apt-get install postgresql libpg-dev
```

And verify the `pg` gem installs just fine:

```sh
gem install pg
```

Now, set Bundler to install with production gems

```sh
bundle install --with production
```

And check that Rake also runs production just fine

```sh
bundle exec rake -P
```

<a name='2-3-database-configuration'></a>

### 2.3. Database Configuration

<a name='2-3-1-with-postgresql-in-all-environments'></a>

#### 2.3.1. With Postgresql in All Environments

Your `config/database.yml` file will need the following:

```yaml
default: &default
  adapter: postgresql
  pool: 5
  timeout: 5000

development:
  <<: *default

test:
  <<: *default

production:
  <<: *default
  url:  <%= ENV['DATABASE_URL'] %>
  pool: <%= ENV['DB_POOL'] || ENV['RAILS_MAX_THREADS'] || 5 %>
```

<a name='2-3-2-with-postgresql-in-production-only'></a>

#### 2.3.2. With Postgresql in Production Only

Your `config/database.yml` file will need the following:

```yaml
default: &default
  adapter: sqlite3
  pool: 5
  timeout: 5000

development:
  <<: *default
  database: db/development.sqlite3

# Warning: The database defined as 'test' will be erased and
# re-generated from your development database when you run 'rake'.
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: db/test.sqlite3

production:
  <<: *default
  url:  <%= ENV['DATABASE_URL'] %>
  pool: <%= ENV['DB_POOL'] || ENV['RAILS_MAX_THREADS'] || 5 %>
```

<a name='2-4-initialize-your-database'></a>

### 2.4. Initialize Your Database

If you haven't already initialized your database, run the following:

```sh
bundle exec rake db:create
bundle exec rake db:migrate
```

<a name='2-5-puma-web-server-configuration'></a>

### 2.5. Puma Web Server Configuration

Make sure that the following is in your `config/puma.rb`:

```ruby
workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = Integer(ENV['RAILS_MAX_THREADS'] || 5)
threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV['PORT']     || 3000
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  # Worker specific setup for Rails 4.1+
  # See: https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server#on-worker-boot
  ActiveRecord::Base.establish_connection
end
```

Now create a `Procfile` at the root of your app directory:

```
web: bundle exec puma -C config/puma.rb
```

<a name='2-6-verify-your-tests-still-pass'></a>

### 2.6. Verify Your Tests Still Pass

You have made some changes to your app, so it would be wise to check that
the tests still pass. If you aren't sure how to check, new apps can be
tested like so:

```sh
bundle exec rake test
```

If you are using RSpec, then the following should work:

```sh
bundle exec rake spec
```

If you are using a different test suite, check the documentation for it. It
may also be listed in the `Readme.md` file.

<a name='3-heroku-setup'></a>

## 3. Heroku Setup

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/)
installed, and then run:

```sh
heroku login
```

and follow the prompts.

<a name='3-1-creating-the-heroku-application'></a>

### 3.1. Creating The Heroku Application

**Make sure you are in the root directory of your app before running the
commands listed below.**

Run the following to create an application, set the database to postgresql,
and set it to use the Ruby buildpack. It also adds a git remote repository
as `staging`, which we will use to push our app to.

```sh
heroku create --buildpack heroku/ruby --addons heroku-postgresql
```

If you already created your app, the following two commands can be used
separately to add postgresql, and set ruby as a buildpack. Either might be
needed, or neither, but better safe than sorry.

```sh
heroku addons:create heroku-postgresql
heroku buildpacks:set heroku/ruby
```

<a name='3-2-environment-variables'></a>

### 3.2. Environment Variables

The Heroku article on [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars) is a great place to reference.

<a name='3-2-1-an-aside-dotenv-rails'></a>

#### 3.2.1. An Aside: Dotenv-Rails

I use `dotenv-rails` for development and test environments, but I don't
want Rails to load it in production.

In the `Gemfile`, I have:

```ruby
group :development, :test do
  gem 'dotenv-rails'
end
```

And then, in the `config/application.rb` file, add the following after the
`Bundler.require(*Rails.groups)` line:

```rb
Dotenv::Railtie.load if Module.const_defined?('Dotenv') 
```

Make sure that your app still works as expected in by making sure your
tests still pass, as well as that accessing the the rails console in
production mode.

```sh
bundle exec rake console -e production
```

You should not receive any errors. If you do, you need to address them
before your app will start properly on Heroku.

<a name='3-3-deploying-to-heroku'></a>

### 3.3. Deploying To Heroku

Anytime you want to deploy your application, you must run the following
command, or you may face issues when pushing up a non-master branch. This
tells git to overwrite whatever is on the remote master branch with what we
branch we are on.

```sh
git push heroku heroku-deployment:master
```

This allows us to define what remote we are pushing to, which branch we want
to push up, and which branch it should point to on the remote.

<a name='3-3-1-advanced'></a>

#### 3.3.1. Advanced

So, if you were to setup a 'staging' remote, and had a 'feature-branch' you
wanted to deploy to your Heroku app, you would run the following:

```sh
git push staging feature-branch:master
```

And if you had a 'production' remote (say, another Heroku app), and wanted
to deploy the 'feature-branch', you would run:

```sh
git push production feature-branch:master
```

If you want to take this even further, see my [Nerdy Heroku Command for Deploys](/ruby/2016/08/13/nerdy-heroku-command.html) post.

<a name='3-4-view-your-application-online'></a>

### 3.4. View Your Application Online

You should now be able to visit the application URL provided to you by
Heroku, and see your application 

<a name='4-change-bundler-back'></a>

## 4. Change Bundler Back

We want to make sure that locally, `:development` and `:test` are the only
groups loaded.

```sh
bundle install --without production
```

<a name='5-bonus-heroku-add-ons-worth-using'></a>

## 5. Bonus Heroku Add-Ons Worth Using

<a name='5-1-papertrail'></a>

### 5.1. Papertrail

Papertrail provides a logging service that can be used without cost. 

```sh
heroku addons:create papertrail:choklad
```

You can see [documentation on how to access the logs](https://devcenter.heroku.com/articles/papertrail#accessing-logs).

<a name='5-1-1-create-full-command'></a>

#### 5.1.1. Full Create Command

If you would like to make this part of the `heroku create` command, you can
substitute the following for the commands in
[3.1. Creating The Heroku App](#3-1-creating-the-heroku-application).

```sh
heroku create
heroku create --buildpack heroku/ruby --addons heroku-postgresql,papertrail:choklad
```

<a name='6-resources'></a>

## 6. Resources:

* [Getting Started with Rails 4.x on Heroku](https://devcenter.heroku.com/articles/getting-started-with-rails4)
* [Deploying Rails Applications with the Puma Web Server](https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server)
* [Concurrency and Database Connections in Ruby with ActiveRecord](https://devcenter.heroku.com/articles/concurrency-and-database-connections)
* [Rails 4 on Heroku](https://devcenter.heroku.com/articles/rails4)
* [SQLite on Heroku](https://devcenter.heroku.com/articles/sqlite3)
* [Managing Multiple Environments for an App](https://devcenter.heroku.com/articles/multiple-environments)
* [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)
* [Bundler Version](https://devcenter.heroku.com/articles/bundler-version)
* [Add-ons](https://devcenter.heroku.com/articles/add-ons)
* [Papertrail Add-on](https://elements.heroku.com/addons/papertrail)
  * [Papertrail Arcticle](https://devcenter.heroku.com/articles/papertrail)
* [Heroku Toolbelt](https://toolbelt.heroku.com/)
