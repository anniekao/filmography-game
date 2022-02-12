import React from 'react'

const Guesses = ({ guessCounter, guesses }) => {
  // Annoyingly, some objects in the filmography have the key 'Role' and sometime it's 'Role(s)
  // Checking to see which it is and then setting it to use in displaying the role info
  let whichRole = guesses.length > 0 && guesses[0]['Role'] ? 'Role' : 'Role(s)'

  return (
    <div>
      Films guessed so far: {guessCounter}
      {guesses.map(guess => {
        return (
          <p key={guess.Title.text}>
            {guess.Title.text} {guess.Year.text} ({guess[whichRole].text})
          </p>
        )
      })}
    </div>
  )
}

export default Guesses