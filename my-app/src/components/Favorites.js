import FoodItem from './FoodItem.js';

const Favorites = ({ favorites }) => {
  let key = Date.now();
  return (
    <ul className="favorites">
      {favorites.map((item) => <FoodItem src={item} alt='음식' key={key++} />)}
    </ul>
  );
};

export default Favorites;