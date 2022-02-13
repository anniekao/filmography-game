import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const FilmDetail = ({ film }) => {
   // Annoyingly, some objects in the filmography have the key 'Role' and sometime it's 'Role(s)
  // Checking to see which it is and then setting it to use in displaying the role info
  let whichRole = film['Role'] ? 'Role' : 'Role(s)'

  return (
    <ListGroup.Item>
      {film.Title.text} ({film.Year.text}) ... {film[whichRole].text}
    </ListGroup.Item>
  )
}

export default FilmDetail