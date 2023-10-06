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

export default FoodItem;