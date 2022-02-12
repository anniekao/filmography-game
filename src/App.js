import React, { useEffect, useState } from 'react'
import wtf from 'wtf_wikipedia'

const actors = [
  // "Keanu Reeves", // wiki tables has 2 arrays, only need the second
  // Chalamet doesn't have a filmography page yet
  "Winona Ryder",
  "Gary Oldman",
  "Ethan Hawke",
  "John C. Reilly",
  "Elle Fanning",
  "Kurt Russell",
]

const App = () => {
  const [filmography, setFilmography] = useState([])
  const [guess, setGuess] = useState('')
  const [guessCounter, setGuessCounter] = useState(0)
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    console.log("USEEFFECT")
    const random = Math.round(Math.random() * (actors.length-1))
    console.log("RANDOM", random)
    const actor = actors[random]
    async function fetchActor() {
      console.log("FETCHING...", actors[random])
      try{
        const actorData = await wtf.fetch(`${actor} filmography`)
        const films = actorData.sections('Film')
        console.log("FOUND FILMS SECTION", films)
        setFilmography(films[0]._tables[0].json())
      } catch(err) {
        console.log(err)
      }
    }
    fetchActor()
  }, [])

  const handleGuess = (event) => {
    event.preventDefault()
    console.log('GUESSING...')
    const found = filmography.find(({ Title }) => Title.text.toLowerCase() === guess )
    setGuess('')
    if (found && found.Role.text !== 'N/A') {
      console.log("FOUND", found)
      setGuessCounter(guessCounter + 1)
      setGuesses([...guesses, found])
    } else {
      console.log("EHHHH try again!")
    }    
  }

  const displayGuesses = () => (
    <div>
      Films guessed so far: {guessCounter}
      {guesses.map(guess => {
        return (
          <p key={guess.Title.text}>
            {guess.Title.text} {guess.Year.text} ({guess.Role.text})
          </p>
        )
      })}
    </div>
  )

  return (
    <div>
      {guesses && displayGuesses()}
        <input 
          type="text"
          onChange={({ target }) => setGuess(target.value.toLowerCase())}
          value={guess}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleGuess(event)
            }
          }}
        />
        <button type="button" onClick={handleGuess}>Guess</button>
    </div>
  );
}

export default App;
