import React, { useState, useEffect } from 'react';
import hangman from '../img/hangman.png';
import '../css/main.css';

interface WelcomeProps {
  category: string;
  startGame: (category: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ category, startGame }) => {
  const [count, setCount] = useState(0); // Estado para el temporizador

  const getCategoryHint = (category: string) => {
    switch (category) {
      case 'tecnologia':
        return 'Pista: Esta categoría incluye palabras relacionadas con la informática y la tecnología.';
      case 'profesiones':
        return 'Pista: Esta categoría incluye nombres de diferentes profesiones y ocupaciones.';
      case 'paises':
        return 'Pista: Esta categoría incluye nombres de países de todo el mundo.';
      case 'alimentos':
        return 'Pista: Esta categoría incluye nombres de diversos alimentos y comidas.';
      default:
        return '';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return () => clearInterval(interval); 
  }, []); // El efecto se ejecuta solo una vez al inicio

  return (
    <div className="welcome">
      <div className="welcome-content">
        <h1>Welcome to Hangman game</h1>
        <h2>Classical Game</h2>
        <p>{getCategoryHint(category)}</p>
        <img src={hangman} alt="hangman" />
        <p>Tiempo transcurrido: {count} segundos</p> {/* Mostrar el tiempo */}
        <button onClick={() => startGame(category)}>Play</button>
      </div>
    </div>
  );
};

export default Welcome;