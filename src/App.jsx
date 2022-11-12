import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Game from './components/Game'
import GameOver from './components/GameOver'
import StartPage from './components/StartPage'
import { wordsList } from './data/words'

function App() {

  const stages = [
    { id: 1, name: 'start' },
    { id: 2, name: 'game' },
    { id: 3, name: 'end' }
  ]

  const [words] = useState(wordsList);
  const [gameStage, setGameStage] = useState(stages[0]);
  const [category, setCategory] = useState('');
  const [word, setWord] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const defineCategoryAndWord = useCallback(() => {
    const categoriesList = Object.keys(wordsList);
    const pickedCategory = categoriesList[Math.floor(Math.random() * Object.keys(categoriesList).length)];
    const pickedWord = words[pickedCategory][Math.floor(Math.random() * words[pickedCategory].length)];
    return { pickedCategory, pickedWord }
  }, [wordsList])



  const startGame = useCallback(() => {
    clearLetterStates();

    const { pickedCategory, pickedWord } = defineCategoryAndWord();

    let splitWord = pickedWord.split("");
    splitWord = splitWord.map((char) => char.toLowerCase())

    setCategory(pickedCategory);
    setWord(pickedWord);
    setLetters(splitWord);

    setGameStage(stages[1])
  }, [defineCategoryAndWord])

  const checkLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    //check if letter was used before
    if (guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)) {
      return;
    }

    //push letter guessed or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((currentGuesses) => currentGuesses - 1);

    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2]);
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length &&
      gameStage.name === stages[1].name) {
      setScore((currentScore) => (currentScore += 100));
      startGame();
    }
  }, [guessedLetters, letters, startGame])

  const startOver = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0])
  }

  return (
    <div className='App'>
      {gameStage.name === 'start' && <StartPage startGame={startGame} />}
      {gameStage.name === 'game' && <Game
        checkLetter={checkLetter}
        word={word}
        category={category}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score} />}
      {gameStage.name === 'end' && <GameOver startOver={startOver} score={score} />}
    </div>
  )
}

export default App
