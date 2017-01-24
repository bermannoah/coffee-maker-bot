# Coffee (Maker) Bot

A light-weight system for having a Raspberry Pi respond to [Coffee Bot](https://coffeebot.coffee) commands. A work in progress.

### Technical details:

A Node/Express/MongoDB API plus a small frontend view component handled by Jade. Tests with Mocha/Chai/Selenium.

### Endpoints

POST to `/api/v1/make` - will, if passed a `type` of `coffee`, run the Coffee Maker Script. If passed `tea` or `water` for type it will return a response but won't run the script. Anything else will return an error message.

### Installation instructions:

You can clone this repo down and run the server locally. 

`git clone https://github.com/bermannoah/coffee-maker-bot`

`npm install`

`npm update`

Make sure you've got MongoDB running on your system. As the bot doesn't really _need_ to store anything, this is mostly for debugging. But it'll break if you don't have it.

`npm start`

You'll also need to clone down the [Coffee Maker Script](https://github.com/bermannoah/coffee-maker-script) and place it in the same directory as Coffee Maker Bot. (Or you can customize the script running command, located in the `make` controller.)

### But what if I'm doing this on a Raspberry Pi?

If you're running this on a Raspberry Pi, you'll need to install node. This is sometimes an arduous process. Full instructions are [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

Assuming you're running Raspbian, here's how to do it: 

`sudo apt-get update`
`sudo apt-get upgrade`

`curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`

`sudo apt-get install -y nodejs`

Once you've done that, you'll need to install mongodb.

`sudo apt-get install mongodb-server`

Make sure it starts when the pi is turned on:

`sudo service mongod start`

Double check that everything is fine:

`node -v` and `npm --version` should return version numbers.

Run `mongo` and it should drop you into the mongo shell.

### Okay I've done all that, now what?

You can run `mocha` (with the server running) to make sure that the API is working properly. 
There are view tests with Selenium, but that functionality is very much a work in progress.

