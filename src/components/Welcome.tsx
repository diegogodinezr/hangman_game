// Welcome.tsx
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import hangman from '../img/hangman.png';
import '../css/main.css';
import { WordCategories } from '../App.tsx'; // Importar la interfaz de App

interface WelcomeProps {
  category: keyof WordCategories;
  startGame: (category: keyof WordCategories) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ category, startGame }) => {
  const [count, setCount] = useState(0); // Estado para el temporizador

  const getCategoryHint = (category: keyof WordCategories) => {
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
        <p>Elapsed time: {count} seconds</p> {/* Mostrar el tiempo */}
        <h2>Game Stats</h2> {/* Nuevo título en inglés */}
        <nav>
          <ul>
            <li>
              <Link to="stats">Stats</Link>
            </li>
          </ul>
        </nav>
        <br />
        <button onClick={() => startGame(category)}>Play</button>
      </div>
    </div>
  );
};

export default Welcome;
