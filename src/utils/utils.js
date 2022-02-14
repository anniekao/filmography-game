export function getBestScore(currentScoreObj) {
  const prevBestScore = JSON.parse(window.localStorage.getItem('score'))
  let result
  if (prevBestScore) {
    console.log("PREV SCORE FOUND")
    if (currentScoreObj.score > prevBestScore.score && currentScoreObj.actor !== prevBestScore.actor) {
      window.localStorage.setItem('score', JSON.stringify(currentScoreObj))
      result = currentScoreObj
    } else if (prevBestScore.score < currentScoreObj.score && currentScoreObj.actor === prevBestScore.actor) {
      window.localStorage.setItem('score', JSON.stringify(currentScoreObj))
      result = currentScoreObj
    } else {
      result = prevBestScore
    }
  } else if (currentScoreObj.score > 0 && prevBestScore === null) {
    window.localStorage.setItem('score', JSON.stringify(currentScoreObj))
    result = currentScoreObj
  }
  return result
}