# Intro
This is a mini-game replicating the first round of the card game [Cinephile](https://www.cinephilegame.com/), where
you and other players name as many films starring a particular actor. This is a single player version, so you can train for
when you play with your friends and maybe you won't fail so badly at naming films starring say...Tilda Swinton.

Disclaimer: I'm just a movie lover, who recently bought this for a friend and loved playing it. I'm not in any way affiliated with Cinephile.

# Running the game
Clone the repo and cd into it, then run `npm start`. A browser window will automatically appear at `localhost:3000` and you can start playing.

# Wiki issues
- started off by fetching filmographies directly from Wikipedia and saw how difficult it is to parse some information for the returned objects.
Thankfully there's the ['wtf wikipedia'](https://github.com/spencermountain/wtf_wikipedia/) library for parsing these objects  
- not all actors have filmography pages
- not all existing filmography pages are formatted the same way
  - one solution is to limit the list of actors to those with similiarly formatted Wikipedia filmographies
  - the current soution is to check for Role vs. Roles in the filmography object keys and set it whenever needed -- hacky, I know
- as an alternative to Wikipedia, I thought about using [The Movie Database(TMDB)'s API](https://developers.themoviedb.org/), but found this
didn't return full filmographies. I believe the same applies to the [The Open Movie Database](http://www.omdbapi.com/).

 # Design Todo's
[] have 'actors' object in a JSON file elsewhere
[] fix fetching filmographies for Tom Cruise/Tom Hanks/actors with filmography objects that don't conform with the current logic
or who don't have filmography pages (e.g. Timothee Chalamet)
[x] add counter
- add hard mode with ...
 - [] add timer feature
 - [] add 'three strikes' rule
[x] show actor's photo
[x] add instructions
[x] add start button
[x] add 'end game' button
- add notifications for:
  - [x] when a guess has been made already
  - [x] when the guess hasn't been found/is incorrect
[x] save best score in local storage and display a) when the game is over or b) via a 'stats' button
[x] display filmography at end of game in a scrollable modal
  - [x] show how many films out of X films they guessed correctly
  - [] only show the films the player hasn't guessed or highlight the films that the player has guessed
[x] add links to the films
[x] add animation when the game appears after clicking the start button
 - [] get the animation to trigger every time (currently only fires the first time)
[] add animation transition when guesses are made and list items are appended to a list group
[] make list group container scrollable
[] show the 'intro' blurb only on the first play and not on subsequent plays when 'play again' btn is pressed
- add icons...
  - [] info icon to show game info again
  - [] green checkmark next to guesses 
- have answers with 'The' in the title right without or without 'The', e.g. 'The Last Starfighter' === 'Last Starfighter'

# Stretch Goals
[] - launch on Heroku
[] - multiplayer (Webhooks?)
[] - query the Movie Database for movie info and have it appear in a modal
[] - display film trivia

# Bugs
[] fix the stretched-out actor photo

# Thanks
- to wtf_wikipedia package for making it way less difficult to parse Wikipedia data, which is a labyrinth