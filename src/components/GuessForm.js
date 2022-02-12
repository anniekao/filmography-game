import React from 'react'

const GuessForm = ({
  handleGuess,
  handleGiveUp,
  setGuess,
  guess
}) => {

  return (
    <form onSubmit={handleGuess}>
      <input 
        type="text"
        onChange={({ target }) => setGuess(target.value)}
        value={guess}
      />
      <div>
        <button type="submit">Guess</button>
        <button type="button" onClick={handleGiveUp}>I give up</button>
      </div>
    </form>
  )
}

export default GuessForm