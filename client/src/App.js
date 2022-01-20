import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);

  const [newQuantity, setNewQuantity] = useState(0);

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

  // Update info in database
  const updateItemQuantity = (id) => {
    Axios.put("http://localhost:3001/update", { quantity: newQuantity, id: id }).then(
      (response) => {
        setInventoryList(
          inventoryList.map((val) => {
            return val.id == id
              ? {
                  item: val.item,
                  quantity: newQuantity, 
                  category: val.category, 
                  price: val.price
                }
              : val;
          })
        );
      }
    );
  };

  // Delete info from database
  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setInventoryList(
        inventoryList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

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
              <div>
                <h3>Item: {val.item}</h3>
                <h3>Quantity: {val.quantity}</h3>
                <h3>Category: {val.category}</h3>
                <h3>Price: {val.price}</h3>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Update quantity"
                  onChange={(event) => {
                    setNewQuantity(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateItemQuantity(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteItem(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            
          );
        })}
      </div>

    </div>
  );
}

export default App;