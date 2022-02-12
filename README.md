# Notes
- started off by trying to get filmographies via Wikipedia pages, but realized quickly that 
each filmography page has it's own formatting or the actor doesn't have a filmography page yet
 - tried using the Movie Database, but returns very limited filmographic information when querying an actor
 - one solution is to limit the list of actors to those with similiarly formatted Wikipedia filmographies, another is
 to check for Role vs. Roles in the filmography object keys and set it whenever needed -- hacky, I know