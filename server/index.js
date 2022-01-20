const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Add headers
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// CLEARDB_DATABASE_URL
// mysql://b0bdc00de356d7:4a20a554@us-cdbr-east-05.cleardb.net/heroku_95231274ee4f8c7?reconnect=true
const inventoryDb = mysql.createConnection({
    user: "b0bdc00de356d7",
    password: "4a20a554",
    host: "us-cdbr-east-05.cleardb.net",
    database: "heroku_95231274ee4f8c7"
});

// const inventoryDb = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "Password",
//   database: "itemSystem",
// });

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

app.put("/update", (req, res) => {
    const id = req.body.id;
    const quantity = req.body.quantity;
    inventoryDb.query(
      "UPDATE items SET quantity = ? WHERE id = ?",
      [quantity, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    inventoryDb.query("DELETE FROM items WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

// Set up server
// app.listen(3001, () => {
//   console.log("Listening on port 3001...");
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});