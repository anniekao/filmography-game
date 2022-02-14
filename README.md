# Notes
- started off by trying to get filmographies via Wikipedia pages, but realized quickly that 
each filmography page has it's own formatting or the actor doesn't have a filmography page yet
 - tried using the Movie Database, but returns very limited filmographic information when querying an actor
 - one solution is to limit the list of actors to those with similiarly formatted Wikipedia filmographies, another is
 to check for Role vs. Roles in the filmography object keys and set it whenever needed -- hacky, I know

 # Design Todo's
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
[] - query the Movie Database for movie info and have it appear in a modal
[] - display film trivia

# Bugs
[] fix the stretched-out actor photo

# Thanks
- to wtf_wikipedia package for making it way less difficult to parse Wikipedia data, which is a labyrinth