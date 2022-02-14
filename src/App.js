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
import { getBestScore } from './utils/utils'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const actors = [
  "Keanu Reeves",
  "Winona Ryder",
  "Ethan Hawke",
  "John C. Reilly",
  "Elle Fanning",
  "Kurt Russell",
  "Daniel Day-Lewis",
  "Morgan Freeman",
  "Harrison Ford",
  "Tilda Swinton",
  "Meg Ryan",
  "Sandra Bullock",
  "Willem Dafoe",
  "Meryl Streep",
  "Gary Oldman",
  "Nicolas Cage",
  "Bill Murray",
  "Joaquin Phoenix",
  "Julia Roberts",
  "Robert Downey Jr."
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
  const [bestScore, setBestScore] = useState({})

  const startGameToggle = useRef()
  const infoBoxToggle = useRef()

  // Get filmography on load
  useEffect(() => {
    const random = Math.round(Math.random() * (actors.length - 1))
    const actor = actors[random]
    setActorName(actor)

    async function fetchFilmography() {
      try{
        const actorFilmography = await wtf.fetch(`${actor} filmography`)
        const films = actorFilmography.sections('Film')
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
        try{
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
    const alreadyGuessed = guesses.find(({ Title }) => {
      if (Title.text.toLowerCase() === guess.toLowerCase()) {
        return true
      }
      return false
    })
    if (alreadyGuessed) {
      setErrorMsg('You already guessed that one. Try a different film.')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    } else {
      const found = filmography.find(({ Title }) => Title.text.toLowerCase() === guess.toLowerCase())
      setGuess('')
      if (found) {
        setGuessCounter(guessCounter + 1)
        setGuesses([...guesses, found])
      } else {
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
    let score
    score = getBestScore({
      score: guessCounter,
      actor: actorName
    })
    setBestScore(score)
    setShowFilmographyModal(true)
  }

  const resetGame = (event) => {
    if (event) { event.preventDefault() }
    setShowFilmographyModal(false)
    window.location.reload(false)
  }

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
                The goal is to <span className='bold'>name as many films in an actor's filmography</span> as you can.
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
          onHide={() => resetGame()}
          size={'lg'}
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {`You guessed ${guessCounter} / ${filmography ? filmography.length : 0} films`}
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant={'warning'}>
              <h2>
                Your best score: {bestScore.score} {bestScore.actor} films(s)
              </h2>
            </Alert>
            <Alert variant={'primary'}>
              <h2>{`${actorName}'s Filmography`}</h2>
              <FilmList films={filmography} />
            </Alert>
          </Modal.Body>
          <Modal.Footer 
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
