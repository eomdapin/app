import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

// component
function Title(props) {
  return <h1>{props.children}</h1>;
}

// component
  const Form = ({ updateCounter }) => {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // 한글 검증
  const hangul = text => /[가-힣|ㄱ-ㅎ|ㅏ-ㅣ]/.test(text);

  function handleInputChange(data) {
    const userValue = data.target.value;

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력하실 수 없습니다.');
    } else {
      setErrorMessage('');
    }
    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setErrorMessage('');

    if (value === '') {
      setErrorMessage('값이 없으므로 추가할 수 없습니다.');
    } else {
      updateCounter();
    }
  }

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <input type="text" name="name" placeholder="상품명을 입력하세요."
        onChange={handleInputChange} value={value}
      />
      <button type="submit">추가</button>
      <p style={{ color: "#f00", fontWeight: "bold" }}>{errorMessage}</p>
    </form>
  );
};

// component
const MainCard = ({ src, alt, handleHeartClick, heartNumber, choiceFavorites }) => {
  const heartIcon = choiceFavorites ? '💝' : '❤';
  
  return (
    <div className="main-card">
      <img
        src={src}
        alt={alt}
        width="400"
        style={{ border: "1px solid #f0f" }}
      />
      <button onClick={handleHeartClick}>{heartIcon}{heartNumber}</button>
    </div>
  );
};

// component
const FoodItem = ({ src, alt }) => {
  return (
    <li>
      <img
        src={src}
        alt={alt}
        style={{
          width: "150px",
          height: "100px",
          backgroundSize: "contain",
        }}
      />
    </li>
  );
};

// component
const Favorites = ({ favorites }) => {
  let key = Date.now();
  return (
    <ul className="favorites">
      {favorites.map((item) => <FoodItem src={item} alt='음식' key={key++} />)}
    </ul>
  );
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
      if(pre == foodOne) {
        return foodTwo;
      } else if(pre == foodTwo) {
        return foodThree;
      } else if(pre == foodThree) {
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
      <Title>페이지 {counter}</Title>
      <Form updateCounter={updateCounter} />
      <MainCard src={mainFood} alt="음식" handleHeartClick={handleHeartClick} heartNumber={heartNumber} choiceFavorites={choiceFavorites} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
