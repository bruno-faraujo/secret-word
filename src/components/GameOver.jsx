import styles from './GameOver.module.css'

function GameOver({startOver, score}) {
  return (
    <div>
    <h1>Você perdeu!</h1>
    <h2>Pontuação: <span>{score}</span></h2>
    <button onClick={startOver}>Iniciar novamente</button>
    </div>

  )
}

export default GameOver