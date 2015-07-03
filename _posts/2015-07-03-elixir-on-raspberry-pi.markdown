---
layout: post
title:  "Elixir on Raspberry Pi without Compiling"
date:   2015-07-03 17:00:00
categories: development-tools
---

Recently, I found myself wondering about setting up Elixir on a
Raspberry Pi. I did some searching, and came up with a couple of
different articles. However, both of them required compiling during
part of the process. If you've never used one of these devices,
it might surprise you to learn that compiling can be slow. Like, 40
minutes slow.

I learned that you can use a mini version of Erlang that doesn't
include the GUI tools, and that Elixir now comes pre-compiled.
Putting those two items together doesn't take much effort. Here's
what I ended up doing.

*Note: This guide is tailored to the Rasbian (wheezy) release.*

### Install Erlang Mini ([for small devices](http://www.erlang-embedded.com/2013/09/new-erlang-package-for-small-devices-erlang-mini/))

To install items from the repository we're adding, you'll first need
to add the proper public key from Erlang Solutions.

`sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys D208507CA14F4FCA`

Then, you can open up the sources file.

`sudo nano /etc/apt/sources.list`

And add the following line:

`deb http://packages.erlang-solutions.com/debian wheezy contrib`

Save and close the file by pressing `Ctrl+x` and then `y`.

Now, it's time to update the known packages available.

`sudo apt-get update`

Finally, we can install Erlang Mini.

`sudo apt-get install erlang-mini`

Say yes by pressing `y`.

### Install Elixir ([pre-compiled](https://github.com/elixir-lang/elixir/releases))

Elixir releases can be viewed on Github - we're going to install the 1.0.5 version. You can check for the most current version [here](https://github.com/elixir-lang/elixir/releases)

First, make sure you are in the home directory:

`cd ~`

Now we'll download the `Precompiled.zip` file:

`wget https://github.com/elixir-lang/elixir/releases/download/v1.0.5/Precompiled.zip`

Then we extract it to the `/opt/elixir` directory:

`sudo unzip ~/Precompiled.zip -d /opt/elixir`

Once complete, we need to add the `/opt/elixir/bin` directory to
the system path, making it available system-wide.

Open up the `~/.profile` file.

`nano ~/.profile`

Add the following line to the bottom of the file to have the system
check in the new directory.

`PATH="$PATH:/opt/elixir/bin"`

Save and close the file by pressing `Ctrl+x` and then `y`.

Reload the file.

`source ~/.profile`

Now run the `elixir -v` command and you should see the following:

`Elixir 1.0.5`

You can now remove the `~/Precompiled.zip` file and `~/elixir` directory:

`rm ~/Precompiled.zip`

`rm -rf ~/elixir`

**Happy Hacking!**

*Sources:*

- *[Installing Elixir on Raspberry Pi](http://suranyami.com/post/80056047551/installing-elixir-on-raspberry-pi)*
- *[Using all your CPUs – Elixir on Raspberry Pi 2](https://onfido.com/blog/using-cpus-elixir-on-raspberry-pi2/)*

