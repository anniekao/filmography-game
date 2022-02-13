import React, { useEffect, useState, useRef } from 'react'
import wtf from 'wtf_wikipedia'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import FilmList from './components/FilmList'
import GuessForm from './components/GuessForm'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Togglable from './components/Togglable'
import { CSSTransition } from 'react-transition-group'
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
  // "Kurt Russell",
  // "Daniel Day-Lewis",
  // "Morgan Freeman",
  // "Al Pacino",
  // "Harrison Ford",
  "Tilda Swinton",
  "Meg Ryan",
  "Sandra Bullock",
  "Willem Dafoe",
  "Meryl Streep",
  // "Gary Oldman",
  "Nicolas Cage"
]

const App = () => {
  const [filmography, setFilmography] = useState(null)
  const [guess, setGuess] = useState('')
  const [guessCounter, setGuessCounter] = useState(0)
  const [guesses, setGuesses] = useState([])
  const [actorName, setActorName] = useState('')
  const [actorImgUrl, setActorImgUrl] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [showGame, setShowGame] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(true)
  const [showFilmographyModal, setShowFilmographyModal] = useState(false)
  const [prevScore, setPrevScore] = useState(null)

  const startGameToggle = useRef()
  const infoBoxToggle = useRef()

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

  // Get previous best score
  const getBestScore = () => {
    const scoreJSON = window.localStorage.getItem('score')
    if (scoreJSON) {
      const score = JSON.parse(scoreJSON)
      setPrevScore(score)
    }
  }

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
      setErrorMsg('You already guessed that one. Try a different film.')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
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
        setErrorMsg(`Haven't heard of that film. Maybe try the full title or add 'The' ?`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
      }    
    }
  }

  const handleStartToggle = () => {
    startGameToggle.current.toggle()
    infoBoxToggle.current.toggle()
    setShowGame(true)
    setShowInfoBox(false)
  }

  const handleGiveUp = (event) => {
    event.preventDefault()
    // TODO: look for old score, if old score, compare with current
    // if new best score, replace old local storage item wit the new one
    setShowFilmographyModal(true)
  }

  const resetGame = (event) => {
    console.log('RESETTING...')
    event.preventDefault()
    setShowFilmographyModal(false)
    window.location.reload(false)
    handleStartToggle()
  }

  // const filmographyWithoutGuesses = () => {
  //   return filmography.filter(film => {
  //     if (!guesses.find(film.Title.text)) {
  //       return film
  //     }
  //   })
  // }

  return (
    <Container>
      <Row>
        {/* column for layout */}
        <Col></Col>
        <Col xs={6}>
        <h1 className='header'>Cinephile Filmography Game</h1>
        <Togglable toggleState={true} ref={infoBoxToggle}>
          <CSSTransition
            in={showInfoBox}
            classNames='toggle-out'
            timeout={200}
            unmountOnExit
            onExited={() => setShowInfoBox(true)}
          >
            <Alert variant={'light'}>
              <p>
                This mini game is based on the first round of the card game
                <a href='https://www.cinephilegame.com' target='_new'> Cinephile</a> (no relation, please don't sue me). 
              </p>
              <p>
                The goal is to <span className='bold'>name as many films by an actor</span>, so maybe next time you play Cinephile 
                with your friends, you won't draw a blank on films with say...Tilda Swinton.
              </p>
              <p>
                The <span className='bold'>title can be in upper or lower case</span>, but it has to be <span className='bold'>the full official film title</span>. 
              </p>
              <p>
                <span className='bold'>Example:</span> Speed 2 would be a wrong answer because the actual title is Speed 2: Cruise Control.
                I know, I know, that movie is terrible and so is this rule.
              </p>
              <Button variant={'dark'} onClick={handleStartToggle}>{ showGame ? 'Close' : `Ready? Let's Go.`}</Button>
            </Alert>
          </CSSTransition>
        </Togglable> 
        <Togglable toggleState={false} ref={startGameToggle}>
          <CSSTransition 
            in={showGame} 
            classNames='toggle-in' 
            timeout={200}
            onExited={() => setShowGame(false)}
          >
            <Alert variant={'primary'}>
                <div className='avatar-img'>
                  <img 
                    className='avatar-sm rounded-circle'
                    src={actorImgUrl}
                    alt={`${actorName}`} />
                </div>
                <div className='details'>
                  <div>You've guessed {guessCounter} {actorName} film(s).</div>
                </div>
                {errorMsg && <Alert variant={'danger'}>{errorMsg}</Alert>}
                { guesses && <FilmList films={guesses} /> }
              </Alert>
          </CSSTransition>
          <GuessForm 
              handleGiveUp={handleGiveUp} 
              handleGuess={handleGuess} 
              guess={guess} 
              setGuess={setGuess}   
            />
        </Togglable>
        <Modal 
          show={showFilmographyModal} 
          onHide={() => setShowFilmographyModal(false)}
          size={'lg'}
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>{`You guessed ${guessCounter} / ${filmography ? filmography.length : 0} films`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>{`${actorName}'s Filmography`}</h2>
            <FilmList films={filmography} />
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant={'secondary'} 
              onClick={(event) => resetGame(event)}
            >
              Close
            </Button>
            <Button
              variant={'primary'}
              onClick={resetGame}
            >
              Play Again?
            </Button>
          </Modal.Footer>  
        </Modal>
        </Col>
        {/* column for layout */}
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
