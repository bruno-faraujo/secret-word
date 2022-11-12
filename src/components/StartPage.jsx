import styles from './StartPage.module.css'

function StartPage({startGame}) {
  return (
    <div className={styles.startPage}>
      <h1>Welcome to Secret Word!</h1>
      <h2>Clique no botão abaixo para iniciar</h2>
      <button onClick={startGame}>Começar!</button>
    </div>
  )
}

export default StartPage