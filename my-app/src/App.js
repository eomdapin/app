import './App.css';
import React from 'react';
import Title from './components/Title.js';
import Form from './components/Form.js';
import MainCard from './components/MainCard.js';
import Favorites from './components/Favorites.js';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

// App component
const App = () => {
  const foodOne = 'img/food-one.jpg';
  const foodTwo = 'img/food-two.jpg';
  const foodThree = 'img/food-three.jpg';
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const [heartNumber, setHeartNumber] = React.useState(() => {
    return jsonLocalStorage.getItem('heartNumber');
  });

  const choiceFavorites = favorites.includes(mainFood);

  // [handle] -----------------------------------------------------
  function updateCounter() {
    setCounter((pre) => {
      console.log('pre : ', pre);
      const nextCounter = pre + 1;
      console.log('nextCounter', nextCounter);
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });

    setMainFood((pre) => {
      if(pre === foodOne) {
        return foodTwo;
      } else if(pre === foodTwo) {
        return foodThree;
      } else if(pre === foodThree) {
        return foodOne;
      }
    });
  }
  
  function handleHeartClick() {
    setFavorites((pre) => {
      const nextFavorites = [...pre, mainFood];
      jsonLocalStorage.setItem('favorites', nextFavorites);
      return nextFavorites;
    });
    
    setHeartNumber((pre) => {
      const nextHeartNumber = Number(pre) + 1;
      jsonLocalStorage.setItem('heartNumber', nextHeartNumber);
      return nextHeartNumber;
    });
  }

  return (
    <div>
      <Title>[component 분리] 페이지 {counter}</Title>
      <Form updateCounter={updateCounter} />
      <MainCard src={mainFood} alt="음식" handleHeartClick={handleHeartClick} heartNumber={heartNumber} choiceFavorites={choiceFavorites} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
