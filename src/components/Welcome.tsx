import hangman from '../img/hangman.png';
import '../css/main.css';

interface WelcomeProps {
  category: string;
  startGame: (category: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ category, startGame }) => {
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

  return (
    <div className="welcome">
      <div className="welcome-content">
        <h1>Welcome to Hangman game</h1>
        <h2>Classical Game</h2>
        <p>{getCategoryHint(category)}</p>
        <img src={hangman} alt="hangman" />
        <button onClick={() => startGame(category)}>Play</button>
      </div>
    </div>
  );
};

export default Welcome;