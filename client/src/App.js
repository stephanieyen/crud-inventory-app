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
  const [searchItem, setSearchItem] = useState('');
  const [searchQuantity, setSearchQuantity] = useState(0);

  // Send info from front-end to back-end
  const addItem = () => {
    Axios.post("https://crud-express-mysql.herokuapp.com/create", {
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
    Axios.get("https://crud-express-mysql.herokuapp.com/inventory").then((response) => {
      setInventoryList(response.data)
    });
  }

  // Update info in database
  const updateItemQuantity = (id) => {
    Axios.put("https://crud-express-mysql.herokuapp.com/update", { quantity: newQuantity, id: id }).then(
      (response) => {
        setInventoryList(
          inventoryList.map((val) => {
            return val.id === id
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
    Axios.delete(`https://crud-express-mysql.herokuapp.com/delete/${id}`).then((response) => {
      setInventoryList(
        inventoryList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">

      <div className="inventoryAdd">
        <h1>Welcome to your inventory tracking app!</h1>
        <h2>Add new items here. They will show up at the bottom of your screen.</h2>

        <label>Item: </label>
        <input type="text" placeholder="Pencil"
               onChange={(event) => {
                  setItem(event.target.value);
        }} />

        <label>Quantity: </label>
        <input type="number" placeholder="5"
               onChange={(event) => {
                  setQuantity(event.target.value);
        }} />

        <label>Category: </label>
        <input type="text" placeholder="Supplies"
               onChange={(event) => {
                  setCategory(event.target.value);
        }} />

        <label>Unit price: </label>
        <input type="number" placeholder="0.50"
               onChange={(event) => {
                  setPrice(event.target.value);
        }} />

        <button onClick={addItem}>Add Item</button>
      </div>



      <div className="inventoryView">
        <h2>View your inventory here. Update or delete items if necessary. You can filter by item and/or minimum quantity.</h2>

        <button onClick={getInventory}>View Inventory</button>

        <input type="text" placeholder="Filter by item"
                onChange={event => {setSearchItem(event.target.value)}}/>
        <input type="number" placeholder="Filter by minimum quantity"
                onChange={event => {setSearchQuantity(event.target.value)}}/>
        
        {inventoryList.filter((val) => {
          if (searchItem === "" && searchQuantity === "") {
            return val;
          } else if (val.item.toLowerCase().includes(searchItem.toLowerCase()) && searchQuantity === "") {
            return val;
          } else if (searchItem === "" && val.quantity >= searchQuantity) {
            return val;
          } else if (val.item.toLowerCase().includes(searchItem.toLowerCase()) && val.quantity >= searchQuantity) {
            return val;
          }
        }).map((val, key) => {
          return (
            <div>
              <div className="item" key={key}>
                <div>
                  <h3>Item: {val.item}</h3>
                  <h3>Quantity: {val.quantity}</h3>
                  <h3>Category: {val.category}</h3>
                  <h3>Unit price: {val.price}</h3>
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
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default App;