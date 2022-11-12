import { useState, useRef } from 'react'
import styles from './Game.module.css'

function Game({
  checkLetter,
  category,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) {


  const [letter, setLetter] = useState('')


  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkLetter(letter);
    setLetter('');
    letterInputRef.current.focus();
  }

  return (
    <div className={styles.game}>
      <p className={styles.points}>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className={styles.tip}>
        Dica sobre a palavra: <span>{category}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className={styles.wordContainer}>
        {letters.map((char, key) => (
          guessedLetters.includes(char) ?
            <span key={key} className={styles.letter}>{char}</span> :
            <span key={key} className={styles.blankSquare}></span>
        ))}
      </div>
      <div className={styles.letterContainer}>
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            ref={letterInputRef}
            maxLength={1}
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
             />
          <button>Jogar!</button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras já usadas:</p>
        {wrongLetters.map((char, key) => (
          <span key={key}>{char}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game