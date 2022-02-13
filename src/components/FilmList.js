import React from 'react'
import { v4 as uuid } from 'uuid'
import FilmDetail from './FilmDetail'
import ListGroup from 'react-bootstrap/ListGroup'

const FilmList = ({ films }) => {
  return (
    <div className='film-list'>
      <ListGroup>
        {films.map(film => (
          <FilmDetail key={uuid()} film={film} />
        ))}
      </ListGroup>
    </div>
  )
}

export default FilmList