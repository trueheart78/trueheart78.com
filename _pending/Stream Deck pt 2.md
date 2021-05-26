# Stream Deck pt 2
Using my stream deck, I figured out a way to make doing RMT and DCR reviews easier. I just now have a markdown file that gets auto pasted into my browser and then I just edit it from there. Keeps me from having to remember where the hell all this crap is. And probably how I should do it.

I couldn’t get it to use pbpaste, so instead I just had to change the command to a Command + V hot key action. It’s a weird device, but oh my goodness has it been wonderful.

> Maybe it needs reattach-to-user-namespace like tmux  

I’ve actually analyzed some of the ways it works, and every time you run a script it has a very limited path variable. Plus, I the current working directory is wherever the script resides. So, I couldn’t have a script that opens the current directory and finder because I would always open the scripts directory. However, I can just have it write, “open .” and have it auto press enter to do the same thing. So it takes a little weird thinking. 

I’ve literally written a readme on this. And I had to reference it today, because I forgot some of the stuff already.

Yeah has made my life so much simpler at a metal level, when it comes to programming. At first I used it to help me remember some common/uncommon commands. Now I’m just aliasing those commands to be smarter, so some of the commands that I would normally have used, I don’t find myself using anymore, because my alias or function is smart enough to know better.

I press “s” to run rspec. Now “s” checks for a “bin/run” and goes that route if it exists (for Docker), else it just runs the basic “bundle exec rspec”

It’s not a golden hammer, but the stream deck is a very nice tool that I would highly recommend. You’ll try and make it do everything, then you’ll realize the limitations, then you’ll live with it for a while, and then you’ll make some changes and integrate it into your workflow even better.

Things like toggling my mic / video during meetings, auto killing bluejeans, opening specific meetings, and all that fun stuff. It’s pretty good at helping me to remember all the different websites I visit, too, and now I know what repositories are where, and are just a few taps away.

#stream deck#