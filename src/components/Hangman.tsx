import { useState } from "react";

interface HangmanProps {
  tecnologia: string;
  profesiones: string;
  paises: string;
  alimentos: string;
}

const Hangman: React.FC<HangmanProps> = ({ tecnologia, profesiones, paises, alimentos }) => {
    const [selectedWord, setSelectedWord] = useState(tecnologia);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [errorCount, setErrorCount] = useState(0);

    const displayWord = selectedWord.split('').map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return letter;
        } else {
            return '_';
        }
    });

    const handleGuess = (letter: string) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setErrorCount((prev) => prev + 1);
            }
        }
    };

    const restartGame = () => {
        const categories = [tecnologia, profesiones, paises, alimentos];
        const newWord = categories[Math.floor(Math.random() * categories.length)];
        setSelectedWord(newWord);
        setGuessedLetters([]);
        setErrorCount(0);
    }; 

    const showLostMessage = () => {
        const correctLetters = selectedWord.split('').filter(letter => guessedLetters.includes(letter));
        const incorrectLetters = selectedWord.split('').filter(letter => !correctLetters.includes(letter));
        return (
            <>
                <p>La palabra correcta era: {selectedWord}</p>
                <p>No pudiste adivinar las siguientes letras: {incorrectLetters.join(', ')}</p>
            </>
        );
    };

    console.log("selectedWord: ", selectedWord);
    console.log("guessedLetters: ", guessedLetters);
    console.log("errorCount: ", errorCount);

    return (
        <div>
            <p>{displayWord.join(' ')}</p>
            <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
            {(displayWord.join('') === selectedWord || errorCount > 5) && (
                <div>
                    <button onClick={restartGame}>Select New Word</button>
                    {errorCount > 5 && showLostMessage()}
                </div>
            )}
            <p>Cantidad de errores {errorCount}</p>
            {displayWord.join('') === selectedWord && (<p>¡Ganaste!</p>)}
        </div>
    );
};

export default Hangman;
