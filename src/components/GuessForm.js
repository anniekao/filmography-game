import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const GuessForm = ({
  handleGuess,
  handleGiveUp,
  setGuess,
  guess
}) => {

  return (
    <Form onSubmit={handleGuess}>
      <Form.Label htmlFor='guess'>Film title: </Form.Label>
      <Form.Control
        type='text'
        onChange={({ target }) => setGuess(target.value)}
        value={guess}
        id='guess'
      />
      <div className='btn-grp'>
        <Button className='submit-btn' type="submit" variant={'warning'}>Guess</Button>
        <Button type="button" onClick={handleGiveUp} variant={'dark'}>I give up</Button>
      </div>
    </Form>
  )
}

export default GuessForm