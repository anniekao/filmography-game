import React, { useEffect, useState } from 'react'
import wtf from 'wtf_wikipedia'
import GuessForm from './components/GuessForm'
import FilmList from './components/FilmList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const actors = [
  "Keanu Reeves",
  // Chalamet doesn't have a filmography page yet
  // "Tom Hanks",
  "Winona Ryder",
  "Ethan Hawke",
  "John C. Reilly",
  // "Elle Fanning",
  "Kurt Russell",
  "Daniel Day-Lewis",
  "Morgan Freeman",
  "Al Pacino",
  "Harrison Ford",
  "Tilda Swinton",
  "Meg Ryan",
  "Julianne Moore",
  "Sandra Bullock",
  "Willem Dafoe",
  "Meryl Streep",
  "Gary Oldman",
  "Nicolas Cage"
]

const App = () => {
  const [filmography, setFilmography] = useState(null)
  const [guess, setGuess] = useState('')
  const [guessCounter, setGuessCounter] = useState(0)
  const [guesses, setGuesses] = useState([])
  const [showFilmography, setShowFilmography] = useState(false)
  const [actorName, setActorName] = useState('')
  const [actorImgUrl, setActorImgUrl] = useState('')

  // Get filmography on load
  useEffect(() => {
    console.log("USEEFFECT")
    const random = Math.round(Math.random() * (actors.length - 1))
    console.log("RANDOM", random)
    const actor = actors[random]
    setActorName(actor)
    async function fetchFilmography() {
      console.log("FETCHING...", actorName)
      try{
        const actorFilmography = await wtf.fetch(`${actor} filmography`)
        const films = actorFilmography.sections('Film')
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

  // Get actor image on load
  useEffect(() => {
    async function fetchActorImg() {
      if (actorName) {
        console.log("FETCHING IMAGE OF...", actorName)
        try{
          // const actorData = await wtf.fetch(actorName)
          wtf.fetch(actorName).then(doc => {
            setActorImgUrl(doc.images()[0].thumbnail())
          })
        } catch(err) {
          console.log(err)
        }
      }
    }
    fetchActorImg()
  }, [actorName])

  const handleGuess = (event) => {
    event.preventDefault()
    console.log('GUESSING...')
    const alreadyGuessed = guesses.find(({ Title }) => {
      if (Title.text.toLowerCase() === guess.toLowerCase()) {
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
        console.log("GUESSES SO FAR", guesses)
      } else {
        console.log("EHHHH try again!")
      }    
    }
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
    <Container>
      <Row>
        {/* column for layout */}
        <Col></Col>
        <Col xs={6}>
        <h1 className='header'>Cinephile Filmography Game</h1>
        <Alert variant={'light'}>
          <p>
            This mini game is based on the first round of the card game
            <a href='https://www.cinephilegame.com' target='_new'> Cinephile</a>. 
          </p>
          <p>
            The goal is to <span className='bold'>name as many films by an actor</span>, so maybe next time you play Cinephile 
            with your friends, you won't draw a blank on films with say...Tilda Swinton.
          </p>
          <p>
            The title can be in upper or lower case, but it has to be <span className='bold'>the exact film title</span>.
            I know, I know, but them's the rules.
          </p>
          <Button variant={'dark'}>Ready? Let's Go.</Button>
        </Alert>
        { actorImgUrl && 
          <Alert variant={'primary'}>
            <div className='avatar-img'>
              <img 
                className='avatar-sm rounded-circle'
                src={actorImgUrl}
                alt={`${actorName}`} />
            </div>
            <div className='details'>
              <div>{actorName}</div>
              <div>Number of films guessed: {guessCounter}</div>
            </div>
            { guesses && <FilmList films={guesses} /> }
          </Alert>
      }
        <div style={show}>
          <GuessForm 
            handleGiveUp={handleGiveUp} 
            handleGuess={handleGuess} 
            guess={guess} 
            setGuess={setGuess}   
          />
        </div>
        <div style={hide}>
          <button type='button' onClick={resetGame}>New actor</button>
          {filmography && <FilmList films={filmography} /> }
        </div>
        </Col>
        {/* column for layout */}
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
