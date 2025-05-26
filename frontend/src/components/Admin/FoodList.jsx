function FoodList() {
  const foods = [
    {
      img: "https://i.imgur.com/8Km9tLL.jpg",
      name: "Chicken Biriyani",
      category: "Indian",
      price: 1150,
      disabled: false,
    },
    {
      img: "https://i.imgur.com/1bX5QH6.jpg",
      name: "Mutton Biriyani",
      category: "Indian",
      price: 1350,
      disabled: false,
    },
    {
      img: "https://i.imgur.com/9j2B4.jpg",
      name: "Cheesy Pasta",
      category: "Pasta",
      price: 1050,
      disabled: false,
    },
    {
      img: "https://i.imgur.com/4YQ7v.jpg",
      name: "Bacon Egg Sandwich",
      category: "Sandwich",
      price: 850,
      disabled: true,
    },
    {
      img: "https://i.imgur.com/3VQb6.jpg",
      name: "Cheese Cake",
      category: "Cake",
      price: 650,
      disabled: true,
    },
  ];
  return (
    <div>
      <h2 className="content-title">All Foods List</h2>
      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, idx) => (
            <tr key={idx} className={food.disabled ? "disabled-row" : ""}>
              <td>
                <img src={food.img} alt={food.name} className="food-img" />
              </td>
              <td>{food.name}</td>
              <td>{food.category}</td>
              <td>
                <b>{food.price.toFixed(2)}</b>
              </td>
              <td>
                <span className="action-icon delete">🗑️</span>
                <span className="action-icon edit">✏️</span>
                <span className="action-icon view">👁️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;