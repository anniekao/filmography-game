# Intro
This is a mini-game replicating the first round of the card game [Cinephile](https://www.cinephilegame.com/), where
you and other players name as many films starring a particular actor. This is a single player version, so you can train for
when you play with your friends and maybe you won't fail so badly at naming films starring say...Tilda Swinton.

# Running the game
Clone the repo and cd into the project folder, then run `npm start`. The game will be running at [http://localhost:3000](http://localhost:3000) 

The game can also be played online: [https://wonderful-jackson-3a8848.netlify.app/](https://wonderful-jackson-3a8848.netlify.app/)

# Issues with Wikidata and returned filmographies
I started off by fetching filmographies directly from Wikipedia and immediately saw how difficult it is to parse some information from the returned objects because everything is nested and the text is dense and hard to parse. Thankfully there's the ['wtf wikipedia'](https://github.com/spencermountain/wtf_wikipedia/) library for parsing these objects and returning usable titles, text, and image urls.

Despite this, there were other issues:
- not all actors have filmography pages
- not all existing filmography pages/tables are formatted the same way, e.g. they have extra columns or are missing columns found in most other filmography tables
  - one solution is to limit the list of actors to those with similiarly formatted Wikipedia filmographies
  - where the Role/Roles column differs in the filmography, the solution right now is to check which is being used and set it in the query

As an alternative to Wikipedia, I thought about using [The Movie Database(TMDB)'s API](https://developers.themoviedb.org/), but found this
didn't return full filmographies. I believe the same applies to the [The Open Movie Database](http://www.omdbapi.com/).

 # Design Todo's
- [x] add responsiveness
- [] reconsider if some components _need_ to be components, e.g. FilmList, of if they can be rendered in App
- [] have 'actors' object in a JSON file elsewhere
- [] fix fetching filmographies for Tom Cruise/Tom Hanks/actors with filmography objects that don't conform with the current logic
or who don't have filmography pages (e.g. Timothee Chalamet)
- [x] add counter
- add hard mode with ...
 - [] add timer feature
 - [] add 'three strikes' rule
- [x] show actor's photo
- [x] add instructions
- [x] add start button
- [x] add 'end game' button
- add notifications for:
  - [x] when a guess has been made already
  - [x] when the guess hasn't been found/is incorrect
- [x] save best score in local storage and display a) when the game is over or b) via a 'stats' button
- [x] display filmography at end of game in a scrollable modal
  - [x] show how many films out of X films they guessed correctly
  - [] only show the films the player hasn't guessed or highlight the films that the player has guessed
[x] add links to the films
[x] add animation when the game appears after clicking the start button
 - [] get the animation to trigger every time (currently only fires the first time)
- [] add animation transition when guesses are made and list items are appended to a list group
- [] make list group container scrollable
- [] show the 'intro' blurb only on the first play and not on subsequent plays when 'play again' btn is pressed
- add icons...
  - [] info icon to show game info again
  - [] green checkmark next to guesses 
- have answers with 'The' in the title right without or without 'The', e.g. 'The Last Starfighter' === 'Last Starfighter'

# Stretch Goals
- [x] launch on Netlify
- [] show movie poster alongside correct answers 
- [] multiplayer mode (Webhooks?)
- [] query the Movie Database for movie info and have it appear in a modal
- [] display film trivia
- [] different versions with directors, six degrees of separation, painters, architects etc.

# Bugs
- [] fix the stretched-out actor photos
