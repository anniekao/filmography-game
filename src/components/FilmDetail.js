import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const FilmDetail = ({ film }) => {
   // Annoyingly, some objects in the filmography have the key 'Role' and sometime it's 'Role(s)
  // Checking to see which it is and then setting it to use in displaying the role info
  const whichRole = film['Role'] ? 'Role' : 'Role(s)'
  
  // Check to see if there is wiki page name in the film object and set the page name variable
  // Otherwise set the variable to the film title and try that
  let wikiBaseUrl = 'https://en.wikipedia.org/wiki/'
  const getWikiPageName = () => {
    if (Array.isArray(film.Title.links) && film.Title.links[0].page) {
      return film.Title.links[0].page
    } else {
      return film.Title.text
    }
  }
  let wikiPageName = getWikiPageName()
  
  return (
    <ListGroup.Item>
      <a href={`${wikiBaseUrl + wikiPageName}`} target='_new'>
        {film.Title.text + ' '}
      </a>
      ({film.Year.text}) ... {film[whichRole].text}
    </ListGroup.Item>
  )
}

export default FilmDetail