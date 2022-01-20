const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const inventoryDb = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Password",
  database: "itemSystem",
});

app.post("/create", (req, res) => {
  const item = req.body.item;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const price = req.body.price;

  inventoryDb.query(
    "INSERT INTO items (item, quantity, category, price) VALUES (?,?,?,?)",
    [item, quantity, category, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/inventory", (req, res) => {
  inventoryDb.query("SELECT * FROM items", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Set up server
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});