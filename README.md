# Notes
- started off by trying to get filmographies via Wikipedia pages, but realized quickly that 
each filmography page has it's own formatting or the actor doesn't have a filmography page yet
 - tried using the Movie Database, but returns very limited filmographic information when querying an actor
 - one solution is to limit the list of actors to those with similiarly formatted Wikipedia filmographies, another is
 to check for Role vs. Roles in the filmography object keys and set it whenever needed -- hacky, I know

 # Design Todo's
[x] add counter
- add timer feature
[x] show actor's photo
[x] add instructions
[x] add start button
[x] add 'end game' button
- add notifications for:
  - when a guess has been made already
  - when the guess hasn't been found/is incorrect
[] save best score in local storage and display a) when the game is over or b) via a 'stats' button
[] display filmography at end of game in a modal or some scrollable element
[] add links to the films
[] add animation transition when guesses are made and list items are appended to a list group
[] style 'new actor' button