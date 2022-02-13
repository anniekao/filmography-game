import React from 'react'
import { v4 as uuid } from 'uuid'
import FilmDetail from './FilmDetail'
import ListGroup from 'react-bootstrap/ListGroup'

const Guesses = ({ guessCounter, guesses }) => {
  return (
    <div className='guesses-container'>
      Number of films guessed: {guessCounter}
      <ListGroup>
        {guesses.map(guess => (
          <FilmDetail key={uuid()} film={guess} />
        ))}
      </ListGroup>
    </div>
  )
}

export default Guesses