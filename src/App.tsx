import React, { useState, useEffect } from 'react';
import Hangman from './components/Hangman';
import Welcome from './components/Welcome';

// Definición de la interfaz para wordCategories
interface WordCategories {
  tecnologia: string[];
  profesiones: string[];
  paises: string[];
  alimentos: string[];
}

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryWords, setSelectedCategoryWords] = useState<string[]>([]);


  
  

  const wordCategories: WordCategories = {
    tecnologia: ['javascript', 'react', 'nodejs', 'express', 'mongodb', 'python', 'django', 'flask', 'java', 'spring', 'hibernate', 'mysql', 'postgresql', 'sql', 'html', 'css', 'sass', 'less'],
    profesiones: ['doctor', 'ingeniero', 'arquitecto', 'programador', 'diseñador', 'maestro', 'enfermero', 'abogado', 'cientifico'],
    paises: ['estadosunidos', 'mexico', 'canada', 'brasil', 'argentina', 'españa', 'francia', 'italia', 'alemania', 'japon'],
    alimentos: ['manzana', 'banana', 'sandia', 'pan', 'queso', 'lechuga', 'zanahoria', 'pollo', 'pescado', 'arroz', 'pizza']
  };

  useEffect(() => {
    const categories = Object.keys(wordCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setSelectedCategory(randomCategory);
    setSelectedCategoryWords(wordCategories[randomCategory]);
  }, []);

  const startGame = (category: string) => {
    setSelectedCategory(category);
    setSelectedCategoryWords(wordCategories[category]);
    setGameStarted(true);
  };

  return (
    <div className="App">
      <div className="welcome">
        <Welcome category={selectedCategory} startGame={startGame} />
      </div>
      {gameStarted && (
        <Hangman
          tecnologia={selectedCategoryWords[0]}
          profesiones={selectedCategoryWords[1]}
          paises={selectedCategoryWords[2]}
          alimentos={selectedCategoryWords[3]}
        />
      )}
    </div>
  );
};

export default App;