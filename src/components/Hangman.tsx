import { useState, useContext } from "react";
import "../css/main.css";
import { StatsContext } from "./StatsContext"; // Importar el StatsContext

interface HangmanProps {
  tecnologia: string;
  profesiones: string;
  paises: string;
  alimentos: string;
}

const Hangman: React.FC<HangmanProps> = ({
  tecnologia,
  profesiones,
  paises,
  alimentos,
}) => {
  const [selectedWord, setSelectedWord] = useState(tecnologia);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { incrementWinCount, incrementLoseCount } = useContext(StatsContext); // Obtener las funciones del contexto

  const displayWord = selectedWord.split("").map((letter) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });

  const handleGuess = () => {
    const letter = inputValue.toLowerCase();
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
      }
    }
    setInputValue("");
  };

  const restartGame = () => {
    const categories = [tecnologia, profesiones, paises, alimentos];
    const newWord = categories[Math.floor(Math.random() * categories.length)];
    setSelectedWord(newWord);
    setGuessedLetters([]);
    setErrorCount(0);

    // Actualizar los stats
    if (displayWord.join("") === selectedWord) {
      incrementWinCount(); // Incrementar el contador de juegos ganados
    } else {
      incrementLoseCount(); // Incrementar el contador de juegos perdidos
    }
  };

  const showLostMessage = () => {
    const correctLetters = selectedWord
      .split("")
      .filter((letter) => guessedLetters.includes(letter));
    const incorrectLetters = selectedWord
      .split("")
      .filter((letter) => !correctLetters.includes(letter));
    return (
      <>
        <p>La palabra correcta era: {selectedWord}</p>
        <p>No pudiste adivinar las siguientes letras: {incorrectLetters.join(", ")}</p>
      </>
    );
  };

  return (
    <div className="hangman-container">
      <p className="hangman-word">{displayWord.join(" ")}</p>
      <div className="hangman-input-container">
        <input
          className="hangman-input"
          maxLength={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="hangman-button" onClick={handleGuess}>
          Adivinar
        </button>
      </div>
      {(displayWord.join("") === selectedWord || errorCount > 5) && (
        <div>
          <button className="hangman-button" onClick={restartGame}>
            Select New Word
          </button>
          {errorCount > 5 && showLostMessage()}
        </div>
      )}
      <p className="hangman-message">Cantidad de errores: {errorCount}</p>
      {displayWord.join("") === selectedWord && (
        <p className="hangman-message">¡Ganaste!</p>
      )}
    </div>
  );
};

export default Hangman;