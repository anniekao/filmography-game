import React, { useEffect, useState } from 'react'
import wtf from 'wtf_wikipedia'
import './App.css'
import Guesses from './components/Guesses'
import GuessForm from './components/GuessForm'

const actors = [
  "Keanu Reeves",
  // Chalamet doesn't have a filmography page yet
  // "Tom Hanks",
  // "Winona Ryder",
  // "Gary Oldman",
  // "Ethan Hawke",
  // "John C. Reilly",
  // "Elle Fanning",
  // "Kurt Russell",
  // "Daniel Day-Lewis",
  // "Morgan Freeman",
  // "Al Pacino",
  "Harrison Ford",
  // "Tilda Swinton",
  // "Meg Ryan",
  // "Julianne Moore",
  // "Sandra Bullock"
]

const App = () => {
  const [filmography, setFilmography] = useState(null)
  const [guess, setGuess] = useState('')
  const [guessCounter, setGuessCounter] = useState(0)
  const [guesses, setGuesses] = useState([])
  const [showFilmography, setShowFilmography] = useState(false)
  const [actor, setActor] = useState('')

  useEffect(() => {
    console.log("USEEFFECT")
    const random = Math.round(Math.random() * (actors.length-1))
    console.log("RANDOM", random)
    const actor = actors[random]
    setActor(actor)
    async function fetchFilmography() {
      console.log("FETCHING...", actor)
      try{
        const actorData = await wtf.fetch(`${actor} filmography`)
        const films = actorData.sections('Film')
        console.log("FOUND FILMS SECTION", films, films[0]._tables.length)
        if (films[0]._tables.length > 1) {
          setFilmography(films[0]._tables[1].json())
        } else {
          setFilmography(films[0]._tables[0].json())
        }
      } catch(err) {
        console.log(err)
      }
    }
    fetchFilmography()
  }, [])

  const handleGuess = (event) => {
    event.preventDefault()
    console.log('GUESSING...')
    const alreadyGuessed = guesses.find(({ Title }) => {
      if (Title.text.toLowerCase() === guess) {
        return true
      }
      return false
    })

    if (alreadyGuessed) {
      console.log("You already guessed that one. Try again.")
    } else {
      const found = filmography.find(({ Title }) => Title.text.toLowerCase() === guess.toLowerCase())
      setGuess('')
      if (found) {
        console.log("FOUND", found)
        setGuessCounter(guessCounter + 1)
        setGuesses([...guesses, found])
      } else {
        console.log("EHHHH try again!")
      }    
    }
  }

  const displayGuesses = () => (
    <div>
      Films guessed so far: {guessCounter}
      {guesses.map(guess => {
        return (
          <p key={guess.Title.text}>
            {guess.Title.text} {guess.Year.text}
          </p>
        )
      })}
    </div>
  )

  const renderFilmography = () => {
    // Annoyingly some objects in the filmography have the key 'Role' and sometime it's 'Role(s)
    // Checking to see which it is and then setting it to use in displaying the role info
    let whichRole = filmography[0]['Role'] ? 'Role' : 'Role(s)'

    return (
      <div>
        <ul>
          {filmography
            .map(film => <li key={film.Title.text}>{film.Title.text} ({film.Year.text}) ... ({film[whichRole].text})</li>)}
        </ul>
      </div>
    )
  }

  const handleGiveUp = (event) => {
    event.preventDefault()
    setShowFilmography(true)
  }

  const resetGame = (event) => {
    event.preventDefault()
    window.location.reload(false)
  }

  const hide = { display: showFilmography ? '' : 'none' }
  const show = { display: showFilmography ? 'none' : ''}

  return (
    <div className="container">
      <div>
        Actor: {actor}
      </div>
      <div style={show}>
        <Guesses guessCounter={guessCounter} guesses={guesses} />
        <GuessForm handleGiveUp={handleGiveUp} handleGuess={handleGuess} guess={guess} setGuess={setGuess} />
      </div>
      <div style={hide}>
        {displayGuesses()}
        <button type="button" onClick={resetGame}>New actor</button>
        {filmography && renderFilmography()}
      </div>
    </div>
  );
}

export default App;
