import React, { useEffect, useState } from 'react'
import wtf from 'wtf_wikipedia'
import axios from 'axios'
import GuessForm from './components/GuessForm'
import FilmList from './components/FilmList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

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
  "Tilda Swinton",
  // "Meg Ryan",
  // "Julianne Moore",
  "Sandra Bullock",
  "Willem Dafoe",
  "Meryl Streep",
  "Gary Oldman"
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
    const random = Math.round(Math.random() * (actors.length))
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
          // console.log(actorData.images(0).thumb())
          // const wikiId = actorData._wikidata
          // const wikiMetadata = await axios
          //   .get(`https://www.wikidata.org/wiki/Special:EntityData/${wikiId}.json`)
          // const imgFilename= wikiMetadata.data['entities'][`${wikiId}`]['claims']['P18'][0]['mainsnak']['datavalue']['value']
          // console.log('IMG FILENAME', imgFilename)
          // const imgFileInfo = await axios
          //   .get(`https://en.wikipedia.org/w/api.php?action=query&titles=File:${imgFilename}&prop=imageinfo&iiurlwidth=500&format=json&origin=*`)
          // const imgUrl = imgFileInfo.data['query']['pages']['-1']['imageinfo'][0]['url']
          // console.log('IMG URL', imgUrl)
          // setActorImgUrl(imgUrl)
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
        <h1 className='header'>Cinephile Trainer</h1>
        { actorImgUrl && 
          <Alert variant={'primary'}>
            <div className='avatar-img'>
              <img 
                className='avatar-sm rounded-circle'
                src={actorImgUrl}
                alt={`${actorName}`} />
            </div>
            <div>
              Actor: {actorName}
            </div>
            Number of films guessed: {guessCounter}
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
