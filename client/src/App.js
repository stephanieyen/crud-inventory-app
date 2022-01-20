import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);

  const [inventoryList, setInventoryList] = useState([]);

  // Send info from front-end to back-end
  const addItem = () => {
    Axios.post("http://localhost:3001/create", {
      item: item,
      quantity: quantity, 
      category: category, 
      price: price
    }).then(() => {
      setInventoryList([
        ...inventoryList,
        {
          item: item,
          quantity: quantity, 
          category: category, 
          price: price
        },
      ]);
    });
  }

  // Get info from database (back-end)
  const getInventory = () => {
    Axios.get("http://localhost:3001/inventory").then((response) => {
      setInventoryList(response.data)
    });
  }

  return (
    <div className="App">
      <div className="inventory">
        <label>Item: </label>
        <input type="text" onChange={(event) => {
          setItem(event.target.value);
        }} />

        <label>Quantity: </label>
        <input type="number" onChange={(event) => {
          setQuantity(event.target.value);
        }} />

        <label>Category: </label>
        <input type="text" onChange={(event) => {
          setCategory(event.target.value);
        }} />

        <label>Unit price: </label>
        <input type="number" onChange={(event) => {
          setPrice(event.target.value);
        }} />

        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="inventory">
        <button onClick={getInventory}>Show Inventory</button>
        {inventoryList.map((val, key) => {
          return (
            <div className="item">
              <h3>Item: {val.item}</h3>
              <h3>Quantity: {val.quantity}</h3>
              <h3>Category: {val.category}</h3>
              <h3>Price: {val.price}</h3>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;