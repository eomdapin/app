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

export default MainCard;